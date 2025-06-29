import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const LoadingAnimation = ({ step, steps }) => {
  const { FiLoader, FiCheckCircle } = FiIcons;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          {/* Animated Logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-r from-red-500 to-red-600 p-4 rounded-full inline-flex mb-6"
          >
            <SafeIcon icon={FiLoader} className="h-8 w-8 text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Analyzing Your Channel
          </h2>
          
          <p className="text-gray-600 mb-8">
            Please wait while we process your channel data...
          </p>

          {/* Progress Steps */}
          <div className="space-y-4">
            {steps.map((stepText, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: index <= step ? 1 : 0.5,
                  x: 0 
                }}
                className="flex items-center space-x-3"
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  index < step 
                    ? 'bg-green-100' 
                    : index === step 
                    ? 'bg-red-100' 
                    : 'bg-gray-100'
                }`}>
                  {index < step ? (
                    <SafeIcon icon={FiCheckCircle} className="h-4 w-4 text-green-600" />
                  ) : index === step ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <SafeIcon icon={FiLoader} className="h-4 w-4 text-red-600" />
                    </motion.div>
                  ) : (
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <span className={`text-sm ${
                  index <= step ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stepText}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Math.round(((step + 1) / steps.length) * 100)}% complete
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation;