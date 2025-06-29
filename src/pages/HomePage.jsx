import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import FeatureCard from '../components/home/FeatureCard';
import StatsSection from '../components/home/StatsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';

const HomePage = () => {
  const { FiPlay, FiArrowRight, FiBarChart3, FiTrendingUp, FiTarget, FiZap, FiUsers, FiAward } = FiIcons;

  const features = [
    {
      icon: FiBarChart3,
      title: 'Comprehensive Analytics',
      description: 'Get detailed insights into your channel performance, subscriber growth, and video metrics.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiTrendingUp,
      title: 'Growth Tracking',
      description: 'Monitor your channel\'s growth trends and identify opportunities for improvement.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FiTarget,
      title: 'Content Optimization',
      description: 'AI-powered recommendations for titles, thumbnails, and content strategy.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FiZap,
      title: 'Competitor Analysis',
      description: 'Compare your performance against similar channels in your niche.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: FiUsers,
      title: 'Audience Insights',
      description: 'Understand your audience behavior and engagement patterns.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: FiAward,
      title: 'Performance Scoring',
      description: 'Get an overall channel health score with actionable improvement suggestions.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16 pb-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your{' '}
                <span className="gradient-text">YouTube Analytics</span>
                <br />
                Into Growth Strategies
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Get AI-powered insights, competitor analysis, and optimization recommendations 
                to accelerate your YouTube channel growth. Perfect for creators with 1K-100K subscribers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Link
                to="/analyze"
                className="bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <SafeIcon icon={FiPlay} className="h-5 w-5" />
                <span>Start Free Analysis</span>
                <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
              </Link>
              <button className="text-gray-600 px-8 py-4 rounded-xl text-lg font-semibold hover:text-red-600 transition-colors flex items-center space-x-2">
                <SafeIcon icon={FiPlay} className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Demo Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-2 border border-gray-200">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 text-center">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-500 text-lg font-medium">
                    Dashboard Preview Coming Soon
                  </div>
                  <div className="mt-4 text-sm text-gray-400">
                    Beautiful analytics visualization will be displayed here
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights designed specifically for growing YouTube creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Accelerate Your Growth?
            </h2>
            <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using CreatorInsights to optimize their content and grow their channels.
            </p>
            <Link
              to="/analyze"
              className="bg-white text-red-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <SafeIcon icon={FiPlay} className="h-5 w-5" />
              <span>Analyze Your Channel Now</span>
              <SafeIcon icon={FiArrowRight} className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;