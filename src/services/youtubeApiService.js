import axios from 'axios';
import { YOUTUBE_CONFIG, CHANNEL_PARTS, VIDEO_PARTS, getCurrentApiKey, validateApiKey } from '../config/youtube';

class YouTubeApiService {
  constructor() {
    this.baseURL = YOUTUBE_CONFIG.BASE_URL;
    this.quotaUsed = 0;
    
    // Create axios instance with default config
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
    });

    // Add request interceptor for quota tracking and API key injection
    this.api.interceptors.request.use((config) => {
      // Always use the current API key (from localStorage or env)
      const currentApiKey = getCurrentApiKey();
      config.params = {
        ...config.params,
        key: currentApiKey
      };
      
      console.log(`📡 YouTube API Request: ${config.url}`);
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('YouTube API Error:', error.response?.data || error.message);
        throw new Error(this.handleApiError(error));
      }
    );
  }

  handleApiError(error) {
    if (error.response?.status === 403) {
      const errorData = error.response.data.error;
      if (errorData.errors?.[0]?.reason === 'quotaExceeded') {
        return 'YouTube API quota exceeded. Please try again tomorrow or upgrade your quota.';
      }
      if (errorData.errors?.[0]?.reason === 'keyInvalid') {
        return 'Invalid YouTube API key. Please check your configuration.';
      }
      return 'YouTube API access forbidden. Please check your API key and permissions.';
    }
    
    if (error.response?.status === 404) {
      return 'Channel not found. Please check the URL and ensure the channel is public.';
    }
    
    if (error.response?.status === 400) {
      return 'Invalid request. Please check the channel URL format.';
    }
    
    return error.response?.data?.error?.message || 'Failed to fetch data from YouTube API';
  }

  // Extract channel ID from various YouTube URL formats
  extractChannelId(url) {
    const patterns = [
      // @username format
      /@([a-zA-Z0-9_.-]+)/,
      // Channel ID format
      /\/channel\/([a-zA-Z0-9_-]+)/,
      // Custom URL format
      /\/c\/([a-zA-Z0-9_-]+)/,
      // User format
      /\/user\/([a-zA-Z0-9_-]+)/,
      // Handle format
      /\/([a-zA-Z0-9_.-]+)$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          id: match[1],
          type: url.includes('@') ? 'handle' : 'id'
        };
      }
    }

    throw new Error('Invalid YouTube channel URL format');
  }

  // Get channel by handle (@username)
  async getChannelByHandle(handle) {
    try {
      const response = await this.api.get(YOUTUBE_CONFIG.ENDPOINTS.CHANNELS, {
        params: {
          part: CHANNEL_PARTS,
          forHandle: handle.startsWith('@') ? handle : `@${handle}`
        }
      });
      
      this.quotaUsed += YOUTUBE_CONFIG.QUOTA_COSTS.CHANNELS;
      return response.data;
    } catch (error) {
      console.error('Error fetching channel by handle:', error);
      throw error;
    }
  }

  // Get channel by ID
  async getChannelById(channelId) {
    try {
      const response = await this.api.get(YOUTUBE_CONFIG.ENDPOINTS.CHANNELS, {
        params: {
          part: CHANNEL_PARTS,
          id: channelId
        }
      });
      
      this.quotaUsed += YOUTUBE_CONFIG.QUOTA_COSTS.CHANNELS;
      return response.data;
    } catch (error) {
      console.error('Error fetching channel by ID:', error);
      throw error;
    }
  }

  // Get channel videos
  async getChannelVideos(channelId, maxResults = 50) {
    try {
      // First get the uploads playlist ID
      const channelResponse = await this.api.get(YOUTUBE_CONFIG.ENDPOINTS.CHANNELS, {
        params: {
          part: 'contentDetails',
          id: channelId
        }
      });

      if (!channelResponse.data.items?.length) {
        throw new Error('Channel not found');
      }

      const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

      // Get videos from uploads playlist
      const playlistResponse = await this.api.get(YOUTUBE_CONFIG.ENDPOINTS.PLAYLIST_ITEMS, {
        params: {
          part: 'snippet,contentDetails',
          playlistId: uploadsPlaylistId,
          maxResults
        }
      });

      const videoIds = playlistResponse.data.items
        .map(item => item.contentDetails.videoId)
        .join(',');

      // Get detailed video statistics
      const videosResponse = await this.api.get(YOUTUBE_CONFIG.ENDPOINTS.VIDEOS, {
        params: {
          part: VIDEO_PARTS,
          id: videoIds
        }
      });

      this.quotaUsed += YOUTUBE_CONFIG.QUOTA_COSTS.CHANNELS + 
                       YOUTUBE_CONFIG.QUOTA_COSTS.PLAYLIST_ITEMS + 
                       YOUTUBE_CONFIG.QUOTA_COSTS.VIDEOS;

      return videosResponse.data;
    } catch (error) {
      console.error('Error fetching channel videos:', error);
      throw error;
    }
  }

  // Search for channel by name/keyword
  async searchChannels(query, maxResults = 10) {
    try {
      const response = await this.api.get(YOUTUBE_CONFIG.ENDPOINTS.SEARCH, {
        params: {
          part: 'snippet',
          q: query,
          type: 'channel',
          maxResults
        }
      });
      
      this.quotaUsed += YOUTUBE_CONFIG.QUOTA_COSTS.SEARCH;
      return response.data;
    } catch (error) {
      console.error('Error searching channels:', error);
      throw error;
    }
  }

  // Get quota usage
  getQuotaUsage() {
    return {
      used: this.quotaUsed,
      limit: 10000, // Default daily quota
      percentage: (this.quotaUsed / 10000) * 100
    };
  }

  // Reset quota counter (for testing)
  resetQuota() {
    this.quotaUsed = 0;
  }
}

// Create singleton instance
const youtubeApiService = new YouTubeApiService();

export default youtubeApiService;

// Export individual methods for easier importing
export const {
  extractChannelId,
  getChannelByHandle,
  getChannelById,
  getChannelVideos,
  searchChannels,
  getQuotaUsage,
  resetQuota
} = youtubeApiService;