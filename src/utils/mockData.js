export const generateMockChannelData = (channelId, url = '') => {
  const channelNames = [
    "Tech Insights Pro",
    "Creative Studio Hub",
    "Gaming Masters",
    "Lifestyle Guru",
    "Educational Content",
    "DIY Workshop",
    "Fitness Journey",
    "Cooking Adventures"
  ];
  
  const descriptions = [
    "Latest technology reviews and tutorials",
    "Creative content and design inspiration",
    "Gaming content and live streams",
    "Lifestyle tips and daily vlogs",
    "Educational content for learners",
    "DIY projects and home improvement",
    "Fitness tips and workout routines",
    "Cooking recipes and food reviews"
  ];
  
  const thumbnails = [
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  ];
  
  // Generate deterministic but varied data based on channelId
  const hash = channelId.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const index = Math.abs(hash) % channelNames.length;
  
  return {
    id: channelId,
    title: channelNames[index],
    description: descriptions[index],
    thumbnail: thumbnails[index % thumbnails.length],
    subscriberCount: 25000 + (Math.abs(hash) % 75000),
    videoCount: 50 + (Math.abs(hash) % 200),
    totalViews: 1000000 + (Math.abs(hash) % 5000000),
    createdAt: "2020-06-15",
    country: "United States",
    analytics: {
      healthScore: 60 + (Math.abs(hash) % 40),
      subscriberGrowth: -5 + (Math.abs(hash) % 25),
      viewGrowth: -2 + (Math.abs(hash) % 20),
      avgViewsPerVideo: 5000 + (Math.abs(hash) % 25000),
      uploadConsistency: 70 + (Math.abs(hash) % 30),
      engagementRate: 2 + ((Math.abs(hash) % 40) / 10)
    }
  };
};

export const generateMockVideoData = (count = 10) => {
  const videoTitles = [
    "How to Optimize YouTube Thumbnails for More Clicks",
    "YouTube Algorithm Secrets Revealed",
    "Content Strategy That Actually Works",
    "Growing Your Channel from 0 to 100K Subscribers",
    "Best Video Editing Software for Beginners",
    "YouTube SEO Tips That Work in 2024",
    "Creating Viral Content: A Step-by-Step Guide",
    "Monetizing Your YouTube Channel Effectively",
    "Camera Setup for Professional YouTube Videos",
    "Building a Community Around Your Content"
  ];
  
  const thumbnails = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=200&fit=crop"
  ];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `video-${index + 1}`,
    title: videoTitles[index % videoTitles.length],
    thumbnail: thumbnails[index % thumbnails.length],
    views: 10000 + Math.random() * 200000,
    likes: 500 + Math.random() * 5000,
    duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    uploadDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    engagement: 2 + Math.random() * 6
  }));
};