import youtubeApiService from './youtubeApiService';
import { validateApiKey, getCurrentApiKey } from '../config/youtube';

// Real YouTube API integration
export const analyzeChannel = async (channelUrl) => {
  try {
    // Validate API key first
    validateApiKey();

    // Extract channel identifier
    const { id, type } = youtubeApiService.extractChannelId(channelUrl);

    // Fetch channel data based on type
    let channelData;
    if (type === 'handle') {
      channelData = await youtubeApiService.getChannelByHandle(id);
    } else {
      channelData = await youtubeApiService.getChannelById(id);
    }

    if (!channelData.items?.length) {
      throw new Error('Channel not found. Please check the URL and ensure the channel is public.');
    }

    const channel = channelData.items[0];

    // Fetch recent videos for analysis
    const videosData = await youtubeApiService.getChannelVideos(channel.id, 50);

    // Process and transform the data
    const processedData = processChannelData(channel, videosData.items || []);

    // Calculate analytics
    const analytics = calculateChannelAnalytics(channel, videosData.items || []);

    return {
      ...processedData,
      analytics,
      rawData: {
        channel,
        videos: videosData.items
      }
    };
  } catch (error) {
    console.error('Channel analysis error:', error);
    throw new Error(error.message || 'Failed to analyze channel');
  }
};

export const compareChannels = async (channel1Url, channel2Url) => {
  try {
    const [channel1Data, channel2Data] = await Promise.all([
      analyzeChannel(channel1Url),
      analyzeChannel(channel2Url)
    ]);

    return {
      channel1: channel1Data,
      channel2: channel2Data,
      comparison: generateComparison(channel1Data, channel2Data)
    };
  } catch (error) {
    console.error('Channel comparison error:', error);
    throw new Error(error.message || 'Failed to compare channels');
  }
};

// Process raw YouTube API data into our format
function processChannelData(channel, videos) {
  const snippet = channel.snippet;
  const statistics = channel.statistics;

  return {
    id: channel.id,
    title: snippet.title,
    description: snippet.description,
    thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
    customUrl: snippet.customUrl,
    subscriberCount: parseInt(statistics.subscriberCount || 0),
    videoCount: parseInt(statistics.videoCount || 0),
    totalViews: parseInt(statistics.viewCount || 0),
    createdAt: new Date(snippet.publishedAt).toLocaleDateString(),
    country: snippet.country || 'Unknown',
    keywords: channel.brandingSettings?.channel?.keywords?.split(' ') || [],
    videos: videos.map(processVideoData)
  };
}

// Process individual video data
function processVideoData(video) {
  const snippet = video.snippet;
  const statistics = video.statistics;
  const contentDetails = video.contentDetails;

  return {
    id: video.id,
    title: snippet.title,
    description: snippet.description,
    thumbnail: snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url,
    publishedAt: snippet.publishedAt,
    views: parseInt(statistics.viewCount || 0),
    likes: parseInt(statistics.likeCount || 0),
    comments: parseInt(statistics.commentCount || 0),
    duration: contentDetails.duration,
    tags: snippet.tags || []
  };
}

// Calculate comprehensive channel analytics
function calculateChannelAnalytics(channel, videos) {
  const statistics = channel.statistics;
  const subscriberCount = parseInt(statistics.subscriberCount || 0);
  const totalViews = parseInt(statistics.viewCount || 0);
  const videoCount = parseInt(statistics.videoCount || 0);

  // Calculate average views per video
  const avgViewsPerVideo = videoCount > 0 ? Math.round(totalViews / videoCount) : 0;

  // Calculate recent performance (last 10 videos)
  const recentVideos = videos.slice(0, 10);
  const recentViews = recentVideos.reduce((sum, video) => sum + parseInt(video.statistics.viewCount || 0), 0);
  const recentAvgViews = recentVideos.length > 0 ? recentViews / recentVideos.length : 0;

  // Calculate engagement rate (likes + comments / views)
  const totalEngagement = recentVideos.reduce((sum, video) => {
    const views = parseInt(video.statistics.viewCount || 0);
    const likes = parseInt(video.statistics.likeCount || 0);
    const comments = parseInt(video.statistics.commentCount || 0);
    return sum + (views > 0 ? ((likes + comments) / views) * 100 : 0);
  }, 0);

  const engagementRate = recentVideos.length > 0 ? totalEngagement / recentVideos.length : 0;

  // Calculate upload consistency (videos per month in last 6 months)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const recentUploads = videos.filter(video => 
    new Date(video.snippet.publishedAt) > sixMonthsAgo
  ).length;
  
  const uploadsPerMonth = recentUploads / 6;
  const uploadConsistency = Math.min(uploadsPerMonth * 25, 100); // Scale to 100

  // Calculate growth metrics (estimated)
  const accountAge = (Date.now() - new Date(channel.snippet.publishedAt).getTime()) / (1000 * 60 * 60 * 24 * 365);
  const subscriberGrowth = accountAge > 0 ? ((subscriberCount / accountAge) / subscriberCount) * 100 : 0;
  const viewGrowth = recentAvgViews > avgViewsPerVideo ? 
    ((recentAvgViews - avgViewsPerVideo) / avgViewsPerVideo) * 100 : 0;

  // Calculate health score
  const healthScore = calculateHealthScore({
    subscriberCount,
    engagementRate,
    uploadConsistency,
    viewGrowth: Math.max(viewGrowth, 0),
    videoCount
  });

  return {
    healthScore: Math.round(healthScore),
    subscriberGrowth: Math.round(subscriberGrowth * 100) / 100,
    viewGrowth: Math.round(viewGrowth * 100) / 100,
    avgViewsPerVideo,
    recentAvgViews: Math.round(recentAvgViews),
    uploadConsistency: Math.round(uploadConsistency),
    engagementRate: Math.round(engagementRate * 100) / 100,
    uploadsPerMonth: Math.round(uploadsPerMonth * 10) / 10,
    topPerformingVideo: recentVideos.reduce((top, video) => 
      (parseInt(video.statistics.viewCount || 0) > parseInt(top?.statistics?.viewCount || 0)) ? video : top, 
      null
    )
  };
}

// Calculate channel health score
function calculateHealthScore(metrics) {
  const { subscriberCount, engagementRate, uploadConsistency, viewGrowth, videoCount } = metrics;
  let score = 0;

  // Subscriber count (0-20 points)
  if (subscriberCount >= 100000) score += 20;
  else if (subscriberCount >= 50000) score += 18;
  else if (subscriberCount >= 10000) score += 15;
  else if (subscriberCount >= 1000) score += 10;
  else score += 5;

  // Engagement rate (0-25 points)
  if (engagementRate >= 5) score += 25;
  else if (engagementRate >= 3) score += 20;
  else if (engagementRate >= 2) score += 15;
  else if (engagementRate >= 1) score += 10;
  else score += 5;

  // Upload consistency (0-20 points)
  score += Math.min(uploadConsistency * 0.2, 20);

  // View growth (0-20 points)
  if (viewGrowth >= 20) score += 20;
  else if (viewGrowth >= 10) score += 15;
  else if (viewGrowth >= 5) score += 10;
  else if (viewGrowth >= 0) score += 5;

  // Video count (0-15 points)
  if (videoCount >= 100) score += 15;
  else if (videoCount >= 50) score += 12;
  else if (videoCount >= 20) score += 8;
  else if (videoCount >= 10) score += 5;
  else score += 2;

  return Math.min(score, 100);
}

// Generate comparison insights
function generateComparison(channel1, channel2) {
  const insights = [];
  const recommendations = [];

  // Compare subscriber counts
  if (channel1.subscriberCount > channel2.subscriberCount) {
    insights.push(`${channel1.title} has ${((channel1.subscriberCount - channel2.subscriberCount) / channel2.subscriberCount * 100).toFixed(1)}% more subscribers`);
  } else if (channel2.subscriberCount > channel1.subscriberCount) {
    insights.push(`${channel2.title} has ${((channel2.subscriberCount - channel1.subscriberCount) / channel1.subscriberCount * 100).toFixed(1)}% more subscribers`);
  }

  // Compare engagement rates
  if (channel1.analytics.engagementRate > channel2.analytics.engagementRate) {
    insights.push(`${channel1.title} has higher audience engagement (${channel1.analytics.engagementRate}% vs ${channel2.analytics.engagementRate}%)`);
  } else if (channel2.analytics.engagementRate > channel1.analytics.engagementRate) {
    insights.push(`${channel2.title} has higher audience engagement (${channel2.analytics.engagementRate}% vs ${channel1.analytics.engagementRate}%)`);
  }

  // Compare upload consistency
  if (channel1.analytics.uploadConsistency > channel2.analytics.uploadConsistency) {
    recommendations.push(`${channel2.title} should improve upload consistency to match ${channel1.title}'s schedule`);
  } else if (channel2.analytics.uploadConsistency > channel1.analytics.uploadConsistency) {
    recommendations.push(`${channel1.title} should improve upload consistency to match ${channel2.title}'s schedule`);
  }

  return {
    winner: channel1.analytics.healthScore > channel2.analytics.healthScore ? 'channel1' : 'channel2',
    insights,
    recommendations
  };
}

// Get detailed channel insights
export const getChannelInsights = async (channelData) => {
  const insights = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    recommendations: []
  };

  const { analytics } = channelData;

  // Analyze strengths
  if (analytics.healthScore >= 80) {
    insights.strengths.push("Excellent overall channel performance");
  }
  if (analytics.engagementRate > 3) {
    insights.strengths.push("High audience engagement rate");
  }
  if (analytics.uploadConsistency > 80) {
    insights.strengths.push("Consistent upload schedule");
  }

  // Analyze weaknesses
  if (analytics.healthScore < 60) {
    insights.weaknesses.push("Channel needs optimization improvements");
  }
  if (analytics.engagementRate < 1) {
    insights.weaknesses.push("Low audience engagement");
  }
  if (analytics.uploadConsistency < 50) {
    insights.weaknesses.push("Inconsistent upload schedule");
  }

  // Generate recommendations
  if (analytics.engagementRate < 2) {
    insights.recommendations.push("Focus on creating more interactive content to boost engagement");
  }
  if (analytics.uploadConsistency < 70) {
    insights.recommendations.push("Establish a regular upload schedule to maintain audience interest");
  }
  if (analytics.viewGrowth < 5) {
    insights.recommendations.push("Optimize video titles and thumbnails for better discoverability");
  }

  return insights;
};

// Get quota usage information
export const getApiQuotaUsage = () => {
  return youtubeApiService.getQuotaUsage();
};