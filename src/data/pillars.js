export const pillars = [
  {
    id: 'calm',
    name: 'Calm Down',
    emoji: '🧘‍♂️',
    color: 'blue',
    description: 'Find your center and release tension',
    exercises: [
      {
        id: 'breathing-478',
        name: '4-7-8 Breath',
        icon: '🌀',
        duration: 3,
        description: 'Reset your breath & mind',
        pillarColor: 'blue',
        instructions: [
          { text: 'Get comfortable and close your eyes', duration: 3, type: 'instruction' },
          { text: 'Breathe in through your nose...', duration: 4, type: 'action' },
          { text: 'Hold your breath...', duration: 7, type: 'action' },
          { text: 'Exhale slowly through your mouth...', duration: 8, type: 'action' },
          { text: 'Great! Let\'s repeat this cycle', duration: 2, type: 'instruction' },
        ]
      },
      {
        id: 'body-scan',
        name: 'Body Scan',
        icon: '🧘‍♀️',
        duration: 5,
        description: 'Notice and release tension',
        pillarColor: 'blue',
        instructions: [
          { text: 'Lie down or sit comfortably', duration: 3, type: 'instruction' },
          { text: 'Focus on your toes... relax them', duration: 8, type: 'action' },
          { text: 'Move to your feet... let them soften', duration: 8, type: 'action' },
          { text: 'Feel your legs... release any tension', duration: 10, type: 'action' },
          { text: 'Notice your whole body feeling relaxed', duration: 5, type: 'instruction' },
        ]
      }
    ]
  },
  {
    id: 'energize',
    name: 'Boost Energy',
    emoji: '⚡',
    color: 'yellow',
    description: 'Revitalize your body and mind',
    exercises: [
      {
        id: 'desk-stretch',
        name: 'Desk Stretches',
        icon: '🤸‍♂️',
        duration: 4,
        description: 'Quick energizing movements',
        pillarColor: 'yellow',
        instructions: [
          { text: 'Stand up and roll your shoulders back', duration: 5, type: 'action' },
          { text: 'Reach your arms up high and stretch', duration: 8, type: 'action' },
          { text: 'Gently twist your torso left and right', duration: 10, type: 'action' },
          { text: 'Take a few energizing deep breaths', duration: 8, type: 'action' },
        ]
      },
      {
        id: 'power-pose',
        name: 'Power Pose',
        icon: '💪',
        duration: 2,
        description: 'Boost confidence instantly',
        pillarColor: 'yellow',
        instructions: [
          { text: 'Stand tall with feet shoulder-width apart', duration: 3, type: 'instruction' },
          { text: 'Put your hands on your hips', duration: 2, type: 'action' },
          { text: 'Hold this confident pose', duration: 30, type: 'action' },
          { text: 'Feel your energy and confidence grow', duration: 3, type: 'instruction' },
        ]
      }
    ]
  },
  {
    id: 'focus',
    name: 'Refocus',
    emoji: '🧠',
    color: 'green',
    description: 'Sharpen your concentration',
    exercises: [
      {
        id: 'eye-rest',
        name: '20-20-20 Rule',
        icon: '👁️',
        duration: 3,
        description: 'Rest your eyes and mind',
        pillarColor: 'green',
        instructions: [
          { text: 'Look away from your screen', duration: 2, type: 'instruction' },
          { text: 'Find something 20 feet away', duration: 3, type: 'action' },
          { text: 'Stare at it for 20 seconds', duration: 20, type: 'action' },
          { text: 'Blink slowly a few times', duration: 3, type: 'action' },
          { text: 'Your eyes feel refreshed!', duration: 2, type: 'instruction' },
        ]
      },
      {
        id: 'mindful-moment',
        name: 'Mindful Moment',
        icon: '✨',
        duration: 4,
        description: 'Center your attention',
        pillarColor: 'green',
        instructions: [
          { text: 'Close your eyes and breathe naturally', duration: 3, type: 'instruction' },
          { text: 'Notice 3 things you can hear', duration: 10, type: 'action' },
          { text: 'Feel 2 things you can touch', duration: 8, type: 'action' },
          { text: 'Sense 1 thing you can smell', duration: 5, type: 'action' },
          { text: 'Open your eyes, feeling present', duration: 3, type: 'instruction' },
        ]
      }
    ]
  },
  {
    id: 'gratitude',
    name: 'Feel Grateful',
    emoji: '💛',
    color: 'pink',
    description: 'Cultivate appreciation and joy',
    exercises: [
      {
        id: 'three-goods',
        name: 'Three Good Things',
        icon: '🌟',
        duration: 3,
        description: 'Reflect on positive moments',
        pillarColor: 'pink',
        instructions: [
          { text: 'Think of one good thing from today', duration: 8, type: 'action' },
          { text: 'Remember another positive moment', duration: 8, type: 'action' },
          { text: 'Recall a third thing you\'re grateful for', duration: 8, type: 'action' },
          { text: 'Feel the warmth of appreciation', duration: 5, type: 'instruction' },
        ]
      },
      {
        id: 'loving-kindness',
        name: 'Loving Kindness',
        icon: '❤️',
        duration: 4,
        description: 'Send good wishes to yourself and others',
        pillarColor: 'pink',
        instructions: [
          { text: 'Place your hand on your heart', duration: 3, type: 'action' },
          { text: 'Wish yourself happiness and peace', duration: 8, type: 'action' },
          { text: 'Think of someone you care about', duration: 5, type: 'instruction' },
          { text: 'Send them the same loving wishes', duration: 8, type: 'action' },
          { text: 'Feel the connection and love', duration: 4, type: 'instruction' },
        ]
      }
    ]
  }
];
