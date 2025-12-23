import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import SparkyCharacter from './SparkyCharacter';

// Estimated milliseconds per character for speech rate 0.9
const MS_PER_CHAR = 75;

const ExerciseScreen = ({ exercise, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState('instruction'); // 'instruction', 'countdown', 'complete'

  // Visual State
  const [timeLeft, setTimeLeft] = useState(exercise.instructions[0]?.duration || 0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Refs for logic
  const stepStartTimeRef = useRef(null); // When the current step started (or resumed) logic time
  const pauseSnapshotRef = useRef(0); // How much time passed before pause
  const lastTickRef = useRef(0); // For countdown throttling
  const utteranceRef = useRef(null);

  const currentInstruction = exercise.instructions[currentStep];
  const instructionDuration = currentInstruction.text.length * MS_PER_CHAR;

  // Cleanup
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // --- Audio Helpers ---
  const speakText = useCallback((text, rate = 0.9, startOffsetChar = 0) => {
    window.speechSynthesis.cancel();
    // Safety check
    if (startOffsetChar >= text.length) return;

    const textToSpeak = startOffsetChar > 0 ? text.substring(startOffsetChar) : text;
    const u = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = u;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google US English')));
    if (femaleVoice) u.voice = femaleVoice;

    u.rate = rate;
    window.speechSynthesis.speak(u);
  }, []);

  const stopAudio = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
  }, []);

  // --- Main Time Loop ---
  useEffect(() => {
    let animationFrame;

    const loop = () => {
      if (!isPlaying) return;

      const now = Date.now();
      // Calculate total time elapsed in this step (accounting for pauses)
      // We need a stable reference. 
      // Strategy: When playing, stepStartTimeRef is the "anchor" (Date.now() minus previously elapsed).

      const elapsed = now - stepStartTimeRef.current;

      if (phase === 'instruction') {
        if (elapsed >= instructionDuration) {
          // Switch to Countdown
          setPhase('countdown');
          stepStartTimeRef.current = Date.now(); // Reset anchor for countdown
          setTimeLeft(exercise.instructions[currentStep].duration); // Reset visual timer
          stopAudio();

          // Initial Countdown Speak
          if (!isMuted) {
            speakText(exercise.instructions[currentStep].duration.toString(), 1.2);
          }
        }
      } else if (phase === 'countdown') {
        // Calculate countdown progress based on elapsed
        // Total duration needed: instruction duration (seconds) * 1000
        const stepDurationSeconds = exercise.instructions[currentStep].duration;
        const secondsPassed = Math.floor(elapsed / 1000);
        const newTimeLeft = stepDurationSeconds - secondsPassed;

        if (newTimeLeft !== lastTickRef.current) {
          lastTickRef.current = newTimeLeft;
          setTimeLeft(Math.max(0, newTimeLeft));

          if (newTimeLeft > 0) {
            if (!isMuted) speakText(newTimeLeft.toString(), 1.2);
          }
        }

        if (newTimeLeft <= 0) {
          // Step Complete
          if (currentStep < exercise.instructions.length - 1) {
            // Next Step
            setCurrentStep(prev => prev + 1);
            setPhase('instruction');
            // stepStartTimeRef will be reset by effect below
          } else {
            // All Complete
            setPhase('complete');
            setIsPlaying(false);
          }
        }
      }

      animationFrame = requestAnimationFrame(loop);
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, phase, currentStep, instructionDuration, exercise.instructions, isMuted, speakText, stopAudio]);


  // --- Step Reset & Initialization ---
  useEffect(() => {
    // When step changes, reset anchors
    pauseSnapshotRef.current = 0;
    stepStartTimeRef.current = Date.now();
    lastTickRef.current = exercise.instructions[currentStep].duration;
    setTimeLeft(exercise.instructions[currentStep].duration);

    // Speak Instruction
    if (isPlaying && !isMuted) {
      speakText(currentInstruction.text, 0.9);
    }
  }, [currentStep, exercise.instructions]); // Don't depend on isPlaying/isMuted here to avoid re-triggering logic


  // --- Resume/Mute Logic ---
  // Handle Toggle Play/Pause
  const handlePlayPause = () => {
    if (isPlaying) {
      // Pausing
      setIsPlaying(false);
      stopAudio();
      // Snapshot how much time elapsed so we can resume
      pauseSnapshotRef.current = Date.now() - stepStartTimeRef.current;
    } else {
      // Resuming
      setIsPlaying(true);
      // Restore anchor: now - previously_elapsed
      stepStartTimeRef.current = Date.now() - pauseSnapshotRef.current;

      // Resume Audio
      if (!isMuted) {
        if (phase === 'instruction') {
          const elapsed = pauseSnapshotRef.current;
          const charOffset = Math.floor(elapsed / MS_PER_CHAR);
          speakText(currentInstruction.text, 0.9, charOffset);
        } else {
          // Countdown: just wait for next tick or speak current?
          // Let's speak current for feedback
          if (timeLeft > 0) speakText(timeLeft.toString(), 1.2);
        }
      }
    }
  };

  const handleToggleMute = () => {
    const pendingMute = !isMuted;
    setIsMuted(pendingMute);

    if (pendingMute) {
      // Muting: just stop audio
      stopAudio();
    } else {
      // Unmuting: Speak from current point
      if (isPlaying) {
        const now = Date.now();
        const elapsed = now - stepStartTimeRef.current;

        if (phase === 'instruction') {
          const charOffset = Math.floor(elapsed / MS_PER_CHAR);
          speakText(currentInstruction.text, 0.9, charOffset);
        } else {
          if (timeLeft > 0) speakText(timeLeft.toString(), 1.2);
        }
      }
    }
  };


  const handleRestart = () => {
    stopAudio();
    setCurrentStep(0);
    setPhase('instruction'); // explicit
    pauseSnapshotRef.current = 0;
    setIsPlaying(false);
    setTimeLeft(exercise.instructions[0].duration);
  };

  const handleComplete = () => onComplete();

  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    yellow: 'from-yellow-400 to-yellow-600',
    green: 'from-green-400 to-green-600',
    pink: 'from-pink-400 to-pink-600'
  };
  const progress = ((currentStep + 1) / exercise.instructions.length) * 100;

  if (phase === 'complete') {
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">You did it! 🎉</h2>
            <p className="text-lg text-gray-600 mb-8">Feeling better already? Sparky is proud of you!</p>
            <div className="space-y-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRestart} className="w-full bg-white text-gray-700 py-3 px-6 rounded-2xl font-medium shadow-md border border-gray-200">Do Another Round</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleComplete} className={`w-full bg-gradient-to-r ${colorClasses[exercise.pillarColor]?.split(' ')[0] || 'from-blue-400'} to-blue-600 text-white py-3 px-6 rounded-2xl font-medium shadow-lg`}>Back to Activities</motion.button>
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
            onClick={() => { stopAudio(); onBack(); }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>

          <div className="text-center">
            <h1 className="text-xl font-bold text-white">{exercise.name}</h1>
            <p className="text-white/80 text-sm">Step {currentStep + 1} of {exercise.instructions.length}</p>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleMute}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </motion.button>
          </div>
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

              <div className="text-6xl font-bold text-white mb-2">
                {phase === 'instruction' ? Math.ceil(timeLeft) : timeLeft}
              </div>
              <p className="text-white/80">
                {phase === 'instruction' ? 'Get Ready...' : 'seconds'}
              </p>
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
            {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
          </motion.button>
        </div>

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
