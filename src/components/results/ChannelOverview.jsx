import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import RealDataBadge from './RealDataBadge';

const ChannelOverview = ({ data }) => {
  const { FiUsers, FiPlay, FiEye, FiCalendar, FiTrendingUp, FiTrendingDown, FiExternalLink, FiWifi } = FiIcons;

  const healthScore = data.analytics.healthScore;
  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-16 h-16 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{data.title}</h2>
              {data.customUrl && (
                <a
                  href={`https://youtube.com/${data.customUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:text-red-700"
                >
                  <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
                </a>
              )}
            </div>
            <p className="text-gray-600 line-clamp-2">{data.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <span>Created {data.createdAt}</span>
              <span>•</span>
              <span>{data.country}</span>
              {data.keywords?.length > 0 && (
                <>
                  <span>•</span>
                  <span>{data.keywords.slice(0, 3).join(', ')}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <RealDataBadge lastUpdated="now" />
      </div>

      {/* Health Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Channel Health Score</h3>
          <span className={`text-2xl font-bold ${getHealthColor(healthScore)}`}>
            {healthScore}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${healthScore}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-3 rounded-full ${
              healthScore >= 80 ? 'bg-green-500' : 
              healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {healthScore >= 80 ? 'Excellent performance! Your channel is thriving.' :
           healthScore >= 60 ? 'Good performance with room for improvement.' :
           'Needs attention. Focus on the recommendations below.'}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-4 bg-gray-50 rounded-xl"
        >
          <SafeIcon icon={FiUsers} className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {data.subscriberCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Subscribers</div>
          <div className="flex items-center justify-center mt-1">
            <SafeIcon 
              icon={data.analytics.subscriberGrowth >= 0 ? FiTrendingUp : FiTrendingDown} 
              className={`h-3 w-3 mr-1 ${data.analytics.subscriberGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} 
            />
            <span className={`text-xs ${data.analytics.subscriberGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.analytics.subscriberGrowth >= 0 ? '+' : ''}{data.analytics.subscriberGrowth}%
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-gray-50 rounded-xl"
        >
          <SafeIcon icon={FiPlay} className="h-6 w-6 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {data.videoCount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Videos</div>
          <div className="text-xs text-gray-500 mt-1">
            {data.analytics.uploadsPerMonth} per month
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-4 bg-gray-50 rounded-xl"
        >
          <SafeIcon icon={FiEye} className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {(data.totalViews / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-600">Total Views</div>
          <div className="flex items-center justify-center mt-1">
            <SafeIcon 
              icon={data.analytics.viewGrowth >= 0 ? FiTrendingUp : FiTrendingDown} 
              className={`h-3 w-3 mr-1 ${data.analytics.viewGrowth >= 0 ? 'text-green-500' : 'text-red-500'}`} 
            />
            <span className={`text-xs ${data.analytics.viewGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.analytics.viewGrowth >= 0 ? '+' : ''}{data.analytics.viewGrowth}%
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center p-4 bg-gray-50 rounded-xl"
        >
          <SafeIcon icon={FiCalendar} className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {data.analytics.avgViewsPerVideo.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Avg Views</div>
          <div className="text-xs text-gray-500 mt-1">
            {data.analytics.engagementRate}% engagement
          </div>
        </motion.div>
      </div>

      {/* Real Data Notice */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center space-x-2 text-blue-800">
            <SafeIcon icon={FiWifi} className="h-4 w-4" />
            <span className="text-sm font-medium">Live YouTube Data</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            All metrics are fetched in real-time from YouTube Data API v3. 
            Data accuracy depends on YouTube's public statistics availability.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChannelOverview;