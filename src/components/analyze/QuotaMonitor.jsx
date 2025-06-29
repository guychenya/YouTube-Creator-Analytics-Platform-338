import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import { getApiQuotaUsage } from '../../services/youtubeService';

const QuotaMonitor = () => {
  const { FiBarChart2, FiAlertTriangle } = FiIcons;
  const quotaInfo = getApiQuotaUsage();

  const getQuotaColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getQuotaBg = (percentage) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-4 border border-gray-200"
    >
      <div className="flex items-center space-x-3">
        <SafeIcon icon={FiBarChart2} className="h-5 w-5 text-gray-600" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-900">API Quota Usage</span>
            <span className={`text-sm font-semibold ${getQuotaColor(quotaInfo.percentage)}`}>
              {quotaInfo.used.toLocaleString()} / {quotaInfo.limit.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getQuotaBg(quotaInfo.percentage)}`}
              style={{ width: `${Math.min(quotaInfo.percentage, 100)}%` }}
            />
          </div>
        </div>
        {quotaInfo.percentage >= 90 && (
          <SafeIcon icon={FiAlertTriangle} className="h-5 w-5 text-red-500" />
        )}
      </div>
      
      {quotaInfo.percentage >= 90 && (
        <div className="mt-2 text-xs text-red-600">
          Warning: API quota nearly exhausted. Consider upgrading your quota limit.
        </div>
      )}
    </motion.div>
  );
};

export default QuotaMonitor;