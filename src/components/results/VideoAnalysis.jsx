import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const VideoAnalysis = ({ data }) => {
  const { FiPlay, FiEye, FiThumbsUp, FiClock } = FiIcons;

  const topVideos = [
    {
      id: 1,
      title: "How to Optimize YouTube Thumbnails for More Clicks",
      views: 125000,
      likes: 8500,
      duration: "12:34",
      uploadDate: "2024-01-15",
      thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "YouTube Algorithm Secrets Revealed",
      views: 98000,
      likes: 7200,
      duration: "15:22",
      uploadDate: "2024-01-10",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Content Strategy That Actually Works",
      views: 87000,
      likes: 6800,
      duration: "18:45",
      uploadDate: "2024-01-05",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Top Performing Videos</h3>
      
      <div className="space-y-4">
        {topVideos.map((video, index) => (
          <div key={video.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="relative">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-24 h-16 object-cover rounded-lg"
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                {video.title}
              </h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiEye} className="h-4 w-4" />
                  <span>{video.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiThumbsUp} className="h-4 w-4" />
                  <span>{video.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} className="h-4 w-4" />
                  <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">#{index + 1}</div>
              <div className="text-sm text-gray-500">Top Video</div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Performance Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
          <h4 className="font-semibold text-blue-900 mb-2">Content Patterns</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• "How to" titles perform 40% better</li>
            <li>• Videos 12-18 minutes get most engagement</li>
            <li>• Tuesday uploads receive highest views</li>
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
          <h4 className="font-semibold text-green-900 mb-2">Optimization Tips</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Add timestamps for better retention</li>
            <li>• Use bright thumbnails with faces</li>
            <li>• Include trending keywords in titles</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoAnalysis;