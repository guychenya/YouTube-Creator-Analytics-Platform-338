import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PerformanceMetrics = ({ data }) => {
  const subscriberData = [
    { month: 'Jan', subscribers: 15000 },
    { month: 'Feb', subscribers: 18000 },
    { month: 'Mar', subscribers: 22000 },
    { month: 'Apr', subscribers: 28000 },
    { month: 'May', subscribers: 35000 },
    { month: 'Jun', subscribers: 42000 },
  ];

  const viewsData = [
    { month: 'Jan', views: 120000 },
    { month: 'Feb', views: 150000 },
    { month: 'Mar', views: 180000 },
    { month: 'Apr', views: 220000 },
    { month: 'May', views: 280000 },
    { month: 'Jun', views: 350000 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Trends</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriber Growth */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Subscriber Growth</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={subscriberData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Subscribers']} />
              <Line 
                type="monotone" 
                dataKey="subscribers" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Views Growth */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Monthly Views</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value.toLocaleString(), 'Views']} />
              <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-xl">
          <div className="text-green-800 font-semibold">Best Performing Month</div>
          <div className="text-green-600">June 2024</div>
          <div className="text-sm text-green-600">350K views, +7K subscribers</div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="text-blue-800 font-semibold">Upload Consistency</div>
          <div className="text-blue-600">85%</div>
          <div className="text-sm text-blue-600">3-4 videos per week</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-xl">
          <div className="text-purple-800 font-semibold">Engagement Rate</div>
          <div className="text-purple-600">4.2%</div>
          <div className="text-sm text-purple-600">Above average for niche</div>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMetrics;