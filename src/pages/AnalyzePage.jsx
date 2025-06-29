import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ChannelUrlInput from '../components/analyze/ChannelUrlInput';
import LoadingAnimation from '../components/analyze/LoadingAnimation';
import ApiKeySetup from '../components/analyze/ApiKeySetup';
import QuotaMonitor from '../components/analyze/QuotaMonitor';
import { analyzeChannel } from '../services/youtubeService';
import { hasValidApiKey } from '../config/youtube';

const AnalyzePage = () => {
  const navigate = useNavigate();
  const { FiSearch, FiPlay, FiCheckCircle } = FiIcons;
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    // Check if API key is available from any source
    setHasApiKey(hasValidApiKey());
  }, []);

  const analysisSteps = [
    'Fetching channel data from YouTube...',
    'Analyzing video performance...',
    'Processing subscriber metrics...',
    'Calculating engagement rates...',
    'Generating AI insights...',
    'Preparing recommendations...'
  ];

  const handleAnalyze = async (channelUrl) => {
    if (!channelUrl.trim()) {
      toast.error('Please enter a valid YouTube channel URL');
      return;
    }

    if (!hasValidApiKey()) {
      toast.error('YouTube API key is required');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(0);

    try {
      // Simulate analysis steps with real API calls
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(i);
        await new Promise(resolve => setTimeout(resolve, i === 0 ? 2000 : 1000));
      }

      // Perform real API analysis
      const channelData = await analyzeChannel(channelUrl);
      
      toast.success('Analysis completed successfully! Real data fetched from YouTube.');
      
      // Navigate to results page with channel data
      navigate(`/results/${channelData.id}`, { state: { channelData } });
      
    } catch (error) {
      toast.error(error.message || 'Failed to analyze channel. Please check the URL and try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }
  };

  const handleApiKeySet = (apiKey) => {
    setHasApiKey(true);
    toast.success('API key configured successfully! You can now analyze real YouTube channels.');
  };

  const exampleChannels = [
    'https://youtube.com/@mkbhd',
    'https://youtube.com/@veritasium',
    'https://youtube.com/@kurzgesagt',
    'https://youtube.com/@mrwhosetheboss',
    'https://youtube.com/@unboxtherapy'
  ];

  if (isAnalyzing) {
    return <LoadingAnimation step={analysisStep} steps={analysisSteps} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Analyze Your <span className="gradient-text">YouTube Channel</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get comprehensive insights, growth recommendations, and competitor analysis 
            for your YouTube channel using real-time data from YouTube API v3.
          </p>
        </motion.div>

        {/* API Key Setup */}
        {!hasApiKey && (
          <ApiKeySetup onApiKeySet={handleApiKeySet} />
        )}

        {/* Quota Monitor */}
        {hasApiKey && (
          <div className="mb-6">
            <QuotaMonitor />
          </div>
        )}

        {/* Analysis Form */}
        {hasApiKey && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <SafeIcon icon={FiSearch} className="h-8 w-8 text-red-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
              Enter YouTube Channel URL
            </h2>
            
            <ChannelUrlInput onAnalyze={handleAnalyze} />

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                Try with popular channels:
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {exampleChannels.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnalyze(url)}
                    className="text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                  >
                    {url.split('@')[1] || url.split('/').pop()}
                  </button>
                ))}
              </div>
            </div>

            {/* API Features Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">
                Real-Time Data Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-800 mb-1">✓ Live Statistics</div>
                  <div className="text-green-700">Real subscriber count, views, and video data</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-800 mb-1">✓ Recent Videos</div>
                  <div className="text-blue-700">Analysis of latest 50 videos for trends</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-purple-800 mb-1">✓ Engagement Metrics</div>
                  <div className="text-purple-700">Likes, comments, and interaction rates</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="font-medium text-orange-800 mb-1">✓ Growth Analysis</div>
                  <div className="text-orange-700">Upload frequency and performance trends</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* What You'll Get Section */}
        {hasApiKey && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: FiPlay,
                title: 'Real Channel Data',
                description: 'Live statistics from YouTube API including subscriber count, total views, and video metrics'
              },
              {
                icon: FiCheckCircle,
                title: 'Video Performance',
                description: 'Analysis of recent videos with engagement rates, view patterns, and content optimization tips'
              },
              {
                icon: FiSearch,
                title: 'Growth Insights',
                description: 'AI-powered recommendations based on real performance data and industry best practices'
              }
            ].map((feature, index) => (
              <div key={feature.title} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg inline-flex mb-4">
                  <SafeIcon icon={feature.icon} className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;