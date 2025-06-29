// YouTube Data API v3 Configuration
export const YOUTUBE_CONFIG = {
  // You can get your API key from: https://console.developers.google.com/
  API_KEY: import.meta.env.VITE_YOUTUBE_API_KEY || window.VITE_YOUTUBE_API_KEY || localStorage.getItem('youtube_api_key') || 'YOUR_YOUTUBE_API_KEY_HERE',
  BASE_URL: 'https://www.googleapis.com/youtube/v3',
  
  // API endpoints
  ENDPOINTS: {
    CHANNELS: '/channels',
    VIDEOS: '/videos',
    SEARCH: '/search',
    PLAYLISTS: '/playlists',
    PLAYLIST_ITEMS: '/playlistItems'
  },
  
  // Default parameters
  DEFAULT_PARAMS: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY || window.VITE_YOUTUBE_API_KEY || localStorage.getItem('youtube_api_key') || 'YOUR_YOUTUBE_API_KEY_HERE',
    maxResults: 50
  },
  
  // Quota costs (for monitoring usage)
  QUOTA_COSTS: {
    CHANNELS: 1,
    VIDEOS: 1,
    SEARCH: 100,
    PLAYLISTS: 1,
    PLAYLIST_ITEMS: 1
  }
};

// Channel parts to fetch (affects quota usage)
export const CHANNEL_PARTS = [
  'snippet',
  'statistics',
  'brandingSettings',
  'contentDetails',
  'status'
].join(',');

// Video parts to fetch
export const VIDEO_PARTS = [
  'snippet',
  'statistics',
  'contentDetails'
].join(',');

// Get current API key from multiple sources
export const getCurrentApiKey = () => {
  return import.meta.env.VITE_YOUTUBE_API_KEY || 
         window.VITE_YOUTUBE_API_KEY || 
         localStorage.getItem('youtube_api_key') || 
         null;
};

// Validate API key
export const validateApiKey = () => {
  const apiKey = getCurrentApiKey();
  
  if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY_HERE') {
    throw new Error('YouTube API key is not configured. Please set VITE_YOUTUBE_API_KEY in your environment variables.');
  }
  
  return apiKey;
};

// Check if API key is configured
export const hasValidApiKey = () => {
  try {
    const apiKey = getCurrentApiKey();
    return !!(apiKey && apiKey !== 'YOUR_YOUTUBE_API_KEY_HERE');
  } catch (error) {
    return false;
  }
};