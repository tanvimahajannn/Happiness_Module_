import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Calendar } from 'lucide-react';
import SparkyCharacter from './SparkyCharacter';

const HRMSIntegration = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4"
    >
      {/* Mock HRMS Dashboard */}
      <div className="max-w-6xl mx-auto">
        <header className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">WorkFlow HRMS</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome back, Sarah!</span>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">S</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-800">Team Status</h3>
            </div>
            <p className="text-2xl font-bold text-green-600 mb-2">12/15</p>
            <p className="text-gray-600 text-sm">Members available</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Today's Schedule</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mb-2">3</p>
            <p className="text-gray-600 text-sm">Meetings scheduled</p>
          </div>

          {/* Wellness Corner Integration */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-sm p-6 cursor-pointer border-2 border-pink-200"
            onClick={onNavigate}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 relative">
                <SparkyCharacter size="small" animation="wag" />
              </div>
              <h3 className="font-semibold text-gray-800">Wellness Corner 🐾</h3>
            </div>
            <p className="text-purple-600 font-medium mb-2">Need a break?</p>
            <p className="text-gray-600 text-sm">Sparky's here to help!</p>

            <motion.div
              animate={{ x: [0, 2, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="mt-4 inline-block"
            >
              <span className="text-lg">🐕</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">Project Alpha milestone completed</span>
              <span className="text-gray-500 text-sm ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Team meeting scheduled for 3 PM</span>
              <span className="text-gray-500 text-sm ml-auto">4 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-4 right-4 bg-white rounded-full p-4 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Loading Sparky...</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HRMSIntegration;
