import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const RealDataBadge = ({ lastUpdated }) => {
  const { FiWifi, FiRefreshCw } = FiIcons;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm border border-green-200"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <SafeIcon icon={FiWifi} className="h-3 w-3" />
      </motion.div>
      <span className="font-medium">Live Data</span>
      {lastUpdated && (
        <>
          <span className="text-green-500">•</span>
          <span className="text-xs">Updated {lastUpdated}</span>
        </>
      )}
    </motion.div>
  );
};

export default RealDataBadge;