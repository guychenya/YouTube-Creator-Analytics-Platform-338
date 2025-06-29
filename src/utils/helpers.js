export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const getHealthScoreColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-600';
  return 'text-red-600';
};

export const getHealthScoreBg = (score) => {
  if (score >= 80) return 'bg-green-100';
  if (score >= 60) return 'bg-yellow-100';
  return 'bg-red-100';
};

export const calculateGrowthRate = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const getGrowthTrend = (rate) => {
  if (rate > 10) return 'excellent';
  if (rate > 5) return 'good';
  if (rate > 0) return 'moderate';
  return 'declining';
};

export const generateRecommendations = (channelData) => {
  const recommendations = [];
  
  if (channelData.analytics.healthScore < 70) {
    recommendations.push({
      type: 'urgent',
      title: 'Improve Content Quality',
      description: 'Focus on creating more engaging and valuable content for your audience.'
    });
  }
  
  if (channelData.analytics.subscriberGrowth < 5) {
    recommendations.push({
      type: 'important',
      title: 'Optimize for Discovery',
      description: 'Improve your SEO, thumbnails, and titles to increase discoverability.'
    });
  }
  
  if (channelData.analytics.uploadConsistency < 80) {
    recommendations.push({
      type: 'moderate',
      title: 'Maintain Upload Schedule',
      description: 'Consistent uploads help maintain audience engagement and algorithm favor.'
    });
  }
  
  return recommendations;
};

export const extractChannelIdFromUrl = (url) => {
  // Handle different YouTube URL formats
  const patterns = [
    /youtube\.com\/channel\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/@([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

export const validateYouTubeUrl = (url) => {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
  return youtubeRegex.test(url);
};