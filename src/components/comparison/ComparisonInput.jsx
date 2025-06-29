import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const ComparisonInput = ({ onCompare, isLoading }) => {
  const { FiPlay, FiVs, FiSearch } = FiIcons;
  const [channel1Url, setChannel1Url] = useState('');
  const [channel2Url, setChannel2Url] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (channel1Url.trim() && channel2Url.trim()) {
      onCompare(channel1Url, channel2Url);
    }
  };

  const isValidUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const canSubmit = channel1Url.trim() && channel2Url.trim() && 
                   isValidUrl(channel1Url) && isValidUrl(channel2Url) && 
                   !isLoading;

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full inline-flex mb-6"
          >
            <SafeIcon icon={FiSearch} className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Channels
          </h2>
          <p className="text-gray-600">
            Comparing channel metrics and generating insights...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-red-100 p-3 rounded-full inline-flex mb-4">
            <SafeIcon icon={FiVs} className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Enter Two Channels to Compare
          </h2>
          <p className="text-gray-600">
            Compare subscriber growth, video performance, and engagement metrics
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Channel 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel 1
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SafeIcon icon={FiPlay} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={channel1Url}
                  onChange={(e) => setChannel1Url(e.target.value)}
                  placeholder="https://youtube.com/@channel1"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Channel 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Channel 2
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SafeIcon icon={FiPlay} className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  value={channel2Url}
                  onChange={(e) => setChannel2Url(e.target.value)}
                  placeholder="https://youtube.com/@channel2"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={{ scale: canSubmit ? 1.02 : 1 }}
            whileTap={{ scale: canSubmit ? 0.98 : 1 }}
            className="w-full bg-red-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <SafeIcon icon={FiVs} className="h-5 w-5" />
            <span>Compare Channels</span>
          </motion.button>
        </form>

        {/* Example Comparisons */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
            Popular Comparisons:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              ['@mkbhd', '@unboxtherapy'],
              ['@veritasium', '@3blue1brown'],
              ['@kurzgesagt', '@crashcourse']
            ].map(([ch1, ch2], index) => (
              <button
                key={index}
                onClick={() => {
                  setChannel1Url(`https://youtube.com/${ch1}`);
                  setChannel2Url(`https://youtube.com/${ch2}`);
                }}
                className="text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
              >
                {ch1} vs {ch2}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonInput;