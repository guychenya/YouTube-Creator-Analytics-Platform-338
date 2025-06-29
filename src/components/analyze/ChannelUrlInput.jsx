import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const ChannelUrlInput = ({ onAnalyze }) => {
  const { FiSearch, FiPlay } = FiIcons;
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(url);
  };

  const isValidUrl = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SafeIcon icon={FiPlay} className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/@channelname or https://youtube.com/c/channelname"
          className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          required
        />
      </div>
      
      <motion.button
        type="submit"
        disabled={!url.trim() || !isValidUrl(url)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-red-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
      >
        <SafeIcon icon={FiSearch} className="h-5 w-5" />
        <span>Analyze Channel</span>
      </motion.button>

      <div className="text-center text-sm text-gray-500">
        <p>We support all public YouTube channels</p>
        <p className="mt-1">Analysis typically takes 30-60 seconds</p>
      </div>
    </form>
  );
};

export default ChannelUrlInput;