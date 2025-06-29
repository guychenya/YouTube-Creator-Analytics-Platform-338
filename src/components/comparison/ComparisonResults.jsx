import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ComparisonResults = ({ data, onNewComparison }) => {
  const { FiRefreshCw, FiTrendingUp, FiTrendingDown, FiUsers, FiPlay, FiEye } = FiIcons;
  const { channel1, channel2 } = data;

  const comparisonMetrics = [
    {
      name: 'Subscribers',
      channel1: channel1.subscriberCount,
      channel2: channel2.subscriberCount,
      format: (val) => (val / 1000).toFixed(0) + 'K'
    },
    {
      name: 'Videos',
      channel1: channel1.videoCount,
      channel2: channel2.videoCount,
      format: (val) => val.toLocaleString()
    },
    {
      name: 'Total Views',
      channel1: channel1.totalViews,
      channel2: channel2.totalViews,
      format: (val) => (val / 1000000).toFixed(1) + 'M'
    },
    {
      name: 'Avg Views',
      channel1: channel1.analytics.avgViewsPerVideo,
      channel2: channel2.analytics.avgViewsPerVideo,
      format: (val) => (val / 1000).toFixed(0) + 'K'
    }
  ];

  const getWinner = (val1, val2) => {
    if (val1 > val2) return 'channel1';
    if (val2 > val1) return 'channel2';
    return 'tie';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Channel Comparison Results</h2>
        <button
          onClick={onNewComparison}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors"
        >
          <SafeIcon icon={FiRefreshCw} className="h-4 w-4" />
          <span>New Comparison</span>
        </button>
      </div>

      {/* Channel Headers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-4">
            <img
              src={channel1.thumbnail}
              alt={channel1.title}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{channel1.title}</h3>
              <p className="text-gray-600">{channel1.subscriberCount.toLocaleString()} subscribers</p>
              <div className="flex items-center mt-1">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  channel1.analytics.healthScore >= 80 ? 'bg-green-500' :
                  channel1.analytics.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">Health Score: {channel1.analytics.healthScore}/100</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-4">
            <img
              src={channel2.thumbnail}
              alt={channel2.title}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{channel2.title}</h3>
              <p className="text-gray-600">{channel2.subscriberCount.toLocaleString()} subscribers</p>
              <div className="flex items-center mt-1">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  channel2.analytics.healthScore >= 80 ? 'bg-green-500' :
                  channel2.analytics.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-sm text-gray-600">Health Score: {channel2.analytics.healthScore}/100</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Metrics Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Metrics Comparison</h3>
        
        <div className="space-y-6">
          {comparisonMetrics.map((metric, index) => {
            const winner = getWinner(metric.channel1, metric.channel2);
            
            return (
              <div key={metric.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{metric.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className={`font-semibold ${winner === 'channel1' ? 'text-green-600' : 'text-gray-600'}`}>
                      {metric.format(metric.channel1)}
                    </span>
                    <span className="text-gray-400">vs</span>
                    <span className={`font-semibold ${winner === 'channel2' ? 'text-green-600' : 'text-gray-600'}`}>
                      {metric.format(metric.channel2)}
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2 h-6">
                    <div className={`rounded-l-full ${winner === 'channel1' ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-end pr-2`}>
                      <span className="text-xs text-white font-medium">
                        {winner === 'channel1' && <SafeIcon icon={FiTrendingUp} className="h-3 w-3" />}
                      </span>
                    </div>
                    <div className={`rounded-r-full ${winner === 'channel2' ? 'bg-red-500' : 'bg-gray-300'} flex items-center justify-start pl-2`}>
                      <span className="text-xs text-white font-medium">
                        {winner === 'channel2' && <SafeIcon icon={FiTrendingUp} className="h-3 w-3" />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Comparison</h3>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={comparisonMetrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value, name) => [
              name === 'channel1' ? channel1.title : channel2.title,
              value.toLocaleString()
            ]} />
            <Bar dataKey="channel1" fill="#3b82f6" name="channel1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="channel2" fill="#ef4444" name="channel2" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights and Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <SafeIcon icon={FiTrendingUp} className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Growth Leader</p>
                <p className="text-sm text-gray-600">
                  {channel1.analytics.subscriberGrowth > channel2.analytics.subscriberGrowth 
                    ? channel1.title : channel2.title} shows stronger growth momentum
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <SafeIcon icon={FiEye} className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Engagement Champion</p>
                <p className="text-sm text-gray-600">
                  Higher average views per video indicates better content engagement
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <div className="space-y-3">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Content Strategy</p>
              <p className="text-sm text-yellow-700">
                Analyze the leading channel's top-performing content formats
              </p>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Upload Schedule</p>
              <p className="text-sm text-purple-700">
                Consider adopting similar posting frequency and timing
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComparisonResults;