import React from 'react';
import { motion } from 'framer-motion';

const PillarCard = ({ pillar, onSelect }) => {
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700',
    yellow: 'from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700',
    green: 'from-green-400 to-green-600 hover:from-green-500 hover:to-green-700',
    pink: 'from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`w-full bg-gradient-to-r ${colorClasses[pillar.color]}
                 rounded-2xl p-6 text-left shadow-lg transition-all duration-200`}
    >
      <div className="flex items-center gap-4">
        <span className="text-4xl">{pillar.emoji}</span>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">
            {pillar.name}
          </h3>
          <p className="text-white/90 text-sm">
            {pillar.description}
          </p>
        </div>
        <div className="text-white/60">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
};

export default PillarCard;
