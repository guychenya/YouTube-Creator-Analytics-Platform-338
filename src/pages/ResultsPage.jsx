import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChannelOverview from '../components/results/ChannelOverview';
import PerformanceMetrics from '../components/results/PerformanceMetrics';
import VideoAnalysis from '../components/results/VideoAnalysis';
import RecommendationsPanel from '../components/results/RecommendationsPanel';
import { generateMockChannelData } from '../utils/mockData';

const ResultsPage = () => {
  const { channelId } = useParams();
  const location = useLocation();
  
  // Get channel data from navigation state or generate mock data
  const channelData = location.state?.channelData || generateMockChannelData(channelId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Channel Analysis Results
          </h1>
          <p className="text-gray-600">
            Comprehensive insights and recommendations for channel growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <ChannelOverview data={channelData} />
            <PerformanceMetrics data={channelData} />
            <VideoAnalysis data={channelData} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RecommendationsPanel data={channelData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;