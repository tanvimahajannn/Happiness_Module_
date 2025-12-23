import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Play } from 'lucide-react';

const ExerciseCard = ({ exercise, onSelect }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="w-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-200 text-left"
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{exercise.icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {exercise.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {exercise.description}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{exercise.duration} min</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
              <Play className="w-3 h-3" />
              <span className="text-xs font-medium">Let's go!</span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default ExerciseCard;
