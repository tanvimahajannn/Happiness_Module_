import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import SparkyCharacter from './SparkyCharacter';
import PillarCard from './PillarCard';
import { pillars } from '../data/pillars';

const WelcomeScreen = ({ userName, onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-4 pb-20"
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Hi {userName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">How are you feeling today?</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('settings')}
            className="p-3 bg-white rounded-full shadow-md"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>

        {/* Sparky Welcome */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-32 h-32 mb-4">
            <SparkyCharacter size="large" animation="wag" />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-lg font-medium text-gray-700 mb-2">
              Woof! I'm Sparky 🐕
            </p>
            <p className="text-gray-600">
              Your wellness companion is here to help!
            </p>
          </motion.div>
        </motion.div>

        {/* Pillar Cards */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-gray-600 mb-6"
          >
            What would feel good right now?
          </motion.p>

          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <PillarCard
                pillar={pillar}
                onSelect={() => onNavigate('pillar', pillar)}
              />
            </motion.div>
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12 mb-8"
        >
          <p className="text-sm text-gray-500">
            💝 Taking care of yourself is taking care of your work
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
