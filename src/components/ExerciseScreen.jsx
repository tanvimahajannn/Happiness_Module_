import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import SparkyCharacter from './SparkyCharacter';

const ExerciseScreen = ({ exercise, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(exercise.instructions[0]?.duration || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    yellow: 'from-yellow-400 to-yellow-600',
    green: 'from-green-400 to-green-600',
    pink: 'from-pink-400 to-pink-600'
  };

  const currentInstruction = exercise.instructions[currentStep];
  const progress = ((currentStep + 1) / exercise.instructions.length) * 100;

  useEffect(() => {
    let interval;

    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Move to next step
            if (currentStep < exercise.instructions.length - 1) {
              setCurrentStep(prev => prev + 1);
              return exercise.instructions[currentStep + 1].duration;
            } else {
              // Exercise completed
              setIsCompleted(true);
              setIsPlaying(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining, currentStep, exercise.instructions]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setTimeRemaining(exercise.instructions[0].duration);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  const handleComplete = () => {
    onComplete();
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
      >
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-32 h-32 mx-auto mb-6"
          >
            <SparkyCharacter size="large" animation="celebrate" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              You did it! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Feeling better already? Sparky is proud of you!
            </p>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRestart}
                className="w-full bg-white text-gray-700 py-3 px-6 rounded-2xl font-medium shadow-md border border-gray-200"
              >
                Do Another Round
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className={`w-full bg-gradient-to-r ${colorClasses[exercise.pillarColor]} text-white py-3 px-6 rounded-2xl font-medium shadow-lg`}
              >
                Back to Activities
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen bg-gradient-to-br ${colorClasses[exercise.pillarColor]} p-4`}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>

          <div className="text-center">
            <h1 className="text-xl font-bold text-white">
              {exercise.name}
            </h1>
            <p className="text-white/80 text-sm">
              Step {currentStep + 1} of {exercise.instructions.length}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
          >
            <RotateCcw className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-2 mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="bg-white rounded-full h-2"
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Sparky Animation */}
        <motion.div
          key={currentStep}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-12"
        >
          <div className="w-40 h-40">
            <SparkyCharacter
              size="large"
              animation={currentInstruction?.type === 'action' ? 'guide' : 'encourage'}
            />
          </div>
        </motion.div>

        {/* Exercise Instruction */}
        <div className="text-center mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8"
            >
              <p className="text-2xl font-bold text-white mb-4">
                {currentInstruction?.text}
              </p>

              {/* Timer */}
              <div className="text-6xl font-bold text-white mb-2">
                {timeRemaining}
              </div>
              <p className="text-white/80">seconds</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayPause}
            className="bg-white/20 backdrop-blur-sm p-4 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white" />
            )}
          </motion.button>
        </div>

        {/* Encouraging Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-white/80 text-sm">
            🌟 You're doing great! Just focus on this moment
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExerciseScreen;
