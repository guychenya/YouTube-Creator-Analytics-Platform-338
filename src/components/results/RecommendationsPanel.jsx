import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const RecommendationsPanel = ({ data }) => {
  const { FiTarget, FiClock, FiTrendingUp, FiEdit, FiUsers, FiStar } = FiIcons;

  const recommendations = [
    {
      icon: FiClock,
      category: 'Upload Schedule',
      title: 'Optimize Upload Timing',
      description: 'Post on Tuesdays at 2 PM for 23% higher engagement',
      priority: 'high',
      impact: '+15% views'
    },
    {
      icon: FiEdit,
      category: 'Content',
      title: 'Improve Thumbnails',
      description: 'Add bright colors and facial expressions to increase CTR',
      priority: 'high',
      impact: '+25% CTR'
    },
    {
      icon: FiTrendingUp,
      category: 'SEO',
      title: 'Trending Keywords',
      description: 'Include "2024 guide" and "tutorial" in upcoming titles',
      priority: 'medium',
      impact: '+18% discovery'
    },
    {
      icon: FiUsers,
      category: 'Engagement',
      title: 'Community Posts',
      description: 'Share behind-the-scenes content 2x per week',
      priority: 'medium',
      impact: '+12% retention'
    },
    {
      icon: FiTarget,
      category: 'Strategy',
      title: 'Content Series',
      description: 'Create a weekly series format for consistent viewership',
      priority: 'low',
      impact: '+20% loyalty'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl shadow-lg p-6 sticky top-8"
    >
      <div className="flex items-center space-x-2 mb-6">
        <SafeIcon icon={FiStar} className="h-6 w-6 text-yellow-500" />
        <h3 className="text-xl font-semibold text-gray-900">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-gray-50`}>
                <SafeIcon icon={rec.icon} className={`h-4 w-4 ${getIconColor(rec.priority)}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {rec.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(rec.priority)}`}>
                    {rec.priority}
                  </span>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-1">
                  {rec.title}
                </h4>
                
                <p className="text-sm text-gray-600 mb-2">
                  {rec.description}
                </p>
                
                <div className="text-xs font-medium text-green-600">
                  Expected: {rec.impact}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button className="w-full bg-red-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-red-700 transition-colors">
          Download Full Report
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Get detailed PDF with all insights and recommendations
        </p>
      </div>
    </motion.div>
  );
};

export default RecommendationsPanel;