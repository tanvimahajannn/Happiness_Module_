import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ExerciseCard from './ExerciseCard';
import SparkyCharacter from './SparkyCharacter';

const PillarScreen = ({ pillar, onNavigate }) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 text-blue-600',
    yellow: 'from-yellow-50 to-yellow-100 text-yellow-600',
    green: 'from-green-50 to-green-100 text-green-600',
    pink: 'from-pink-50 to-pink-100 text-pink-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen p-4 pb-20"
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('welcome')}
            className="p-3 bg-white rounded-full shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {pillar.emoji} {pillar.name}
            </h1>
            <p className="text-gray-600">{pillar.description}</p>
          </div>
        </div>

        {/* Sparky with Pillar Context */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`bg-gradient-to-br ${colorClasses[pillar.color]} rounded-2xl p-6 mb-8`}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <SparkyCharacter size="medium" animation="sit" />
            </div>
            <div>
              <p className="font-medium text-gray-800">
                Let's find your perfect activity!
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Choose what feels right for you
              </p>
            </div>
          </div>
        </motion.div>

        {/* Exercise Cards */}
        <div className="space-y-4">
          {pillar.exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <ExerciseCard
                exercise={exercise}
                onSelect={() => onNavigate('exercise', pillar, exercise)}
              />
            </motion.div>
          ))}
        </div>

        {/* Encouraging Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 mb-8"
        >
          <p className="text-sm text-gray-500">
            🌟 Every small step counts toward feeling better
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PillarScreen;
