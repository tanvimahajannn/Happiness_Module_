import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import PillarScreen from './components/PillarScreen';
import ExerciseScreen from './components/ExerciseScreen';
import SettingsScreen from './components/SettingsScreen';
import Confetti from './components/Confetti';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [userName, setUserName] = useState('Sarah');

  const navigateTo = (screen, pillar, exercise) => {
    setCurrentScreen(screen);
    if (pillar) setSelectedPillar(pillar);
    if (exercise) setSelectedExercise(exercise);
  };

  const handleExerciseComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setCurrentScreen('pillar');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-nunito overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            key="welcome"
            userName={userName}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === 'pillar' && selectedPillar && (
          <PillarScreen
            key="pillar"
            pillar={selectedPillar}
            onNavigate={navigateTo}
          />
        )}
        {currentScreen === 'exercise' && selectedExercise && (
          <ExerciseScreen
            key="exercise"
            exercise={selectedExercise}
            onComplete={handleExerciseComplete}
            onBack={() => navigateTo('pillar')}
          />
        )}
        {currentScreen === 'settings' && (
          <SettingsScreen
            key="settings"
            onBack={() => navigateTo('welcome')}
          />
        )}
      </AnimatePresence>

      {showConfetti && <Confetti />}
    </div>
  );
}

export default App;
