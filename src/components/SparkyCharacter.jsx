import React from 'react';
import { motion } from 'framer-motion';

const SparkyCharacter = ({ size, animation }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-32 h-32'
  };

  const animations = {
    wag: {
      rotate: [0, -5, 5, -5, 5, 0],
      transition: { duration: 1, repeat: Infinity, repeatDelay: 2 }
    },
    sit: {
      y: [0, -2, 0],
      transition: { duration: 2, repeat: Infinity }
    },
    guide: {
      scale: [1, 1.05, 1],
      rotate: [0, 3, -3, 0],
      transition: { duration: 3, repeat: Infinity }
    },
    encourage: {
      y: [0, -5, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 2, repeat: Infinity }
    },
    celebrate: {
      y: [0, -10, 0],
      rotate: [0, 10, -10, 10, 0],
      scale: [1, 1.1, 1],
      transition: { duration: 1, repeat: Infinity }
    }
  };

  return (
    <motion.div
      animate={animations[animation]}
      className={`${sizeClasses[size]} flex items-center justify-center`}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Dog Body */}
        <ellipse cx="50" cy="65" rx="20" ry="15" fill="#8B4513" />

        {/* Dog Head */}
        <circle cx="50" cy="35" r="18" fill="#D2691E" />

        {/* Ears */}
        <ellipse cx="38" cy="25" rx="6" ry="12" fill="#8B4513" transform="rotate(-30 38 25)" />
        <ellipse cx="62" cy="25" rx="6" ry="12" fill="#8B4513" transform="rotate(30 62 25)" />

        {/* Eyes */}
        <circle cx="44" cy="32" r="3" fill="#000" />
        <circle cx="56" cy="32" r="3" fill="#000" />
        <circle cx="45" cy="31" r="1" fill="#FFF" />
        <circle cx="57" cy="31" r="1" fill="#FFF" />

        {/* Nose */}
        <ellipse cx="50" cy="40" rx="2" ry="3" fill="#000" />

        {/* Mouth */}
        <path d="M 45 45 Q 50 50 55 45" stroke="#000" strokeWidth="1.5" fill="none" />

        {/* Tail */}
        <motion.path
          d="M 70 60 Q 80 55 85 65"
          stroke="#8B4513"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          animate={animation === 'wag' ? {
            d: ["M 70 60 Q 80 55 85 65", "M 70 60 Q 75 50 80 55", "M 70 60 Q 80 55 85 65"]
          } : {}}
          transition={animation === 'wag' ? { duration: 0.3, repeat: Infinity } : {}}
        />

        {/* Legs */}
        <rect x="38" y="75" width="4" height="12" fill="#8B4513" rx="2" />
        <rect x="48" y="75" width="4" height="12" fill="#8B4513" rx="2" />
        <rect x="58" y="75" width="4" height="12" fill="#8B4513" rx="2" />

        {/* Paws */}
        <circle cx="40" cy="89" r="3" fill="#654321" />
        <circle cx="50" cy="89" r="3" fill="#654321" />
        <circle cx="60" cy="89" r="3" fill="#654321" />

        {/* Collar */}
        <rect x="35" y="48" width="30" height="4" fill="#FF6B6B" rx="2" />
        <circle cx="50" cy="50" r="2" fill="#FFD700" />

        {/* Heart (for celebrate animation) */}
        {animation === 'celebrate' && (
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <path d="M 50 20 C 50 15, 40 15, 40 25 C 40 15, 30 15, 30 25 C 30 35, 50 45, 50 45 C 50 45, 70 35, 70 25 C 70 15, 60 15, 60 25 C 60 15, 50 15, 50 20 Z" fill="#FF69B4" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
};

export default SparkyCharacter;
