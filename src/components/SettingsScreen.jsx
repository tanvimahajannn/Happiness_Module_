import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Shield, BarChart3, Heart } from 'lucide-react';

const SettingsScreen = ({ onBack }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);

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
            onClick={onBack}
            className="p-3 bg-white rounded-full shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Pawsitive Notifications</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Enable Wellness Reminders</p>
                  <p className="text-sm text-gray-500">Let Sparky remind you to take breaks</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: notificationsEnabled ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-sm"
                  />
                </motion.button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Daily Check-ins</p>
                  <p className="text-sm text-gray-500">Get gentle daily wellness prompts</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDailyReminders(!dailyReminders)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    dailyReminders ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: dailyReminders ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-sm"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-800">Privacy & Data</h3>
            </div>

            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-700">View Data Usage Policy</p>
                <p className="text-sm text-gray-500">How we protect your wellness data</p>
              </button>

              <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <p className="font-medium text-gray-700">Export My Data</p>
                <p className="text-sm text-gray-500">Download your wellness activity log</p>
              </button>
            </div>
          </motion.div>

          {/* Wellness Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Activity Overview</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">This week</span>
                <span className="font-semibold text-blue-600">12 activities</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Favorite pillar</span>
                <span className="font-semibold text-green-600">🧘‍♂️ Calm Down</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Wellness streak</span>
                <span className="font-semibold text-yellow-600">5 days 🔥</span>
              </div>
            </div>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-pink-600" />
              <h3 className="font-semibold text-gray-800">About Sparky</h3>
            </div>

            <p className="text-gray-600 mb-4">
              Your AI therapy dog companion, designed to make wellness accessible,
              stigma-free, and genuinely helpful for busy professionals.
            </p>

            <div className="text-center">
              <p className="text-sm text-gray-500">Version 1.0.0</p>
              <p className="text-sm text-pink-600 font-medium">Made with 💜 for your wellbeing</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsScreen;
