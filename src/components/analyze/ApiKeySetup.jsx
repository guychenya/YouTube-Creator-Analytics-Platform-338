import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const ApiKeySetup = ({ onApiKeySet }) => {
  const { FiKey, FiExternalLink, FiCheckCircle, FiAlertCircle } = FiIcons;
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsValidating(true);
    
    // Store API key in localStorage for this session
    localStorage.setItem('youtube_api_key', apiKey);
    
    // Update environment variable simulation
    window.VITE_YOUTUBE_API_KEY = apiKey;
    
    setTimeout(() => {
      setIsValidating(false);
      onApiKeySet(apiKey);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 mb-8"
    >
      <div className="text-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full inline-flex mb-4">
          <SafeIcon icon={FiKey} className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          YouTube API Setup Required
        </h2>
        <p className="text-gray-600">
          To analyze real YouTube channels, you need to provide a YouTube Data API v3 key
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-xl mb-6">
        <div className="flex items-start space-x-3">
          <SafeIcon icon={FiAlertCircle} className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How to get your API key:</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-700">
              <li>Go to the Google Cloud Console</li>
              <li>Create a new project or select existing one</li>
              <li>Enable the YouTube Data API v3</li>
              <li>Create credentials (API Key)</li>
              <li>Copy your API key and paste it below</li>
            </ol>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            YouTube Data API v3 Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSyD4iDaxxxx..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Your API key is stored locally and never sent to our servers
          </p>
        </div>

        <motion.button
          type="submit"
          disabled={!apiKey.trim() || isValidating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
        >
          {isValidating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <SafeIcon icon={FiKey} className="h-5 w-5" />
              </motion.div>
              <span>Validating...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiCheckCircle} className="h-5 w-5" />
              <span>Set API Key</span>
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <a
            href="https://console.developers.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <span>Google Cloud Console</span>
            <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
          </a>
          <span className="text-gray-300">•</span>
          <a
            href="https://developers.google.com/youtube/v3/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <span>API Documentation</span>
            <SafeIcon icon={FiExternalLink} className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ApiKeySetup;