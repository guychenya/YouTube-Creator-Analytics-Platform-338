import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    { label: 'Channels Analyzed', value: '10,000+' },
    { label: 'Average Growth Increase', value: '35%' },
    { label: 'Time Saved Weekly', value: '5+ hours' },
    { label: 'Creator Satisfaction', value: '98%' }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Growing Creators
          </h2>
          <p className="text-xl text-gray-600">
            See the impact CreatorInsights has made for content creators worldwide
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;