/**
 * EXERCISE LIBRARY CONTENT
 *
 * This file contains all therapeutic exercises used in the app.
 * Edit this file to add, remove, or modify exercises.
 *
 * Each exercise has:
 * - title: Display name
 * - steps: Array of step-by-step instructions
 * - duration: Time in minutes
 * - instructions: Purpose/description of the exercise
 * - category: Which category it belongs to (breathing, grounding, somatic, polyvagal, partsWork, selfCompassion)
 */

export const exercises = {
  breathing: [
    {
      title: "Calming Breath for Integration",
      steps: [
        "Place one hand on your chest, one on your belly",
        "Breathe in slowly through your nose for 4 counts",
        "Hold gently for 4 counts",
        "Exhale slowly through your mouth for 6 counts",
        "Repeat 5-8 times",
        "Notice how your body feels now and what wants to be explored"
      ],
      duration: 3,
      instructions: "This helps activate your parasympathetic nervous system and create space for therapeutic exploration"
    },
    {
      title: "Box Breathing",
      steps: [
        "Sit comfortably with your spine straight",
        "Exhale completely through your mouth",
        "Breathe in through your nose for 4 counts",
        "Hold your breath for 4 counts",
        "Exhale through your mouth for 4 counts",
        "Hold empty for 4 counts",
        "Repeat for 5-10 cycles"
      ],
      duration: 5,
      instructions: "Used by Navy SEALs, this technique helps manage stress and maintain calm in challenging situations"
    }
  ],

  grounding: [
    {
      title: "5-4-3-2-1 Integration Grounding",
      steps: [
        "Look around and name 5 things you can see",
        "Notice and name 4 things you can touch or feel",
        "Listen for and name 3 things you can hear",
        "If possible, name 2 things you can smell",
        "Name 1 thing you can taste, or take a sip of water",
        "Take a deep, slow breath and feel your feet on the ground",
        "Say to yourself: 'I am here, I am safe, I am integrating'"
      ],
      duration: 3,
      instructions: "Sensory grounding to stay present while processing meaningful experiences"
    },
    {
      title: "Earth Connection",
      steps: [
        "Stand or sit with your feet flat on the ground",
        "Feel the weight of your body pressing down",
        "Imagine roots growing from your feet into the earth",
        "Notice the solid, stable support beneath you",
        "Take 5 deep breaths, feeling more grounded with each one",
        "Thank the earth for holding you"
      ],
      duration: 2,
      instructions: "Quick grounding technique to reconnect with physical stability and safety"
    }
  ],

  somatic: [
    {
      title: "Integration Body Scan",
      steps: [
        "Start at the top of your head and breathe gently",
        "Slowly scan down through your face and neck",
        "Notice your shoulders, arms, and chest without changing anything",
        "Continue to your belly, back, and hips",
        "Scan through your legs and feet",
        "Where in your body do you feel your psychedelic insights most strongly?",
        "Send breath and appreciation to those areas",
        "Thank your body for holding your experience with such wisdom"
      ],
      duration: 5,
      instructions: "Connecting with how your body holds and integrates your psychedelic experience"
    },
    {
      title: "Progressive Muscle Relaxation",
      steps: [
        "Lie down or sit comfortably",
        "Tense your feet and toes for 5 seconds, then release",
        "Tense your calves and thighs for 5 seconds, then release",
        "Tense your buttocks and abdomen for 5 seconds, then release",
        "Tense your chest and shoulders for 5 seconds, then release",
        "Tense your arms and hands for 5 seconds, then release",
        "Tense your neck and jaw for 5 seconds, then release",
        "Notice the difference between tension and relaxation"
      ],
      duration: 8,
      instructions: "Release physical tension held in the body from stress or difficult experiences"
    }
  ],

  polyvagal: [
    {
      title: "Nervous System State Mapping",
      steps: [
        "Notice your current breathing pattern",
        "Check in with your heart rate",
        "Feel the tension or relaxation in your body",
        "Notice your desire for connection or withdrawal",
        "Identify: Am I in fight/flight, shutdown, or social engagement?",
        "What does my nervous system need right now?",
        "How does this state relate to my psychedelic insights?"
      ],
      duration: 4,
      instructions: "Understanding your autonomic nervous system patterns in relation to your experiences"
    },
    {
      title: "Vagal Toning Exercise",
      steps: [
        "Sit comfortably and take a deep breath",
        "On the exhale, make a humming sound (like 'vvvv' or 'mmm')",
        "Feel the vibration in your chest and throat",
        "Continue for 5-10 breaths",
        "Notice if you feel more settled and present",
        "This stimulates the vagus nerve for calm and connection"
      ],
      duration: 3,
      instructions: "Directly activate your vagus nerve to shift from stress to safety"
    }
  ],

  partsWork: [
    {
      title: "Parts Check-in for Integration",
      steps: [
        "Take a moment to close your eyes and look inside",
        "What part of you feels most active or present right now?",
        "Notice where you feel this part in your body",
        "What does this part need from you right now?",
        "How does this part relate to your psychedelic insights?",
        "What would help this part feel heard and supported?",
        "Thank this part for its wisdom and protection"
      ],
      duration: 7,
      instructions: "Internal Family Systems practice to understand how different parts of you are responding to your insights"
    },
    {
      title: "Protector Appreciation",
      steps: [
        "Identify a protective part that feels active (inner critic, perfectionist, controller)",
        "Ask: How old were you when you took on this job?",
        "Ask: What are you trying to protect me from?",
        "Thank this part for working so hard to keep you safe",
        "Ask: What would you rather be doing if you didn't have to protect me?",
        "Tell this part: I see you, I appreciate you, and I'm learning to help you",
        "Notice how this part responds"
      ],
      duration: 10,
      instructions: "Build appreciation for the parts that protect you, often through difficult behaviors"
    }
  ],

  selfCompassion: [
    {
      title: "Self-Compassion for Integration",
      steps: [
        "Place your hands on your heart",
        "Acknowledge: 'This is a moment of learning and growth'",
        "Recognize: 'Integrating profound experiences is part of being human'",
        "Offer yourself: 'May I be kind to myself as I process this'",
        "Feel the warmth of your hands on your heart",
        "Say: 'May I give myself the compassion I need'",
        "Notice how this kindness affects your body and mind"
      ],
      duration: 5,
      instructions: "Cultivating self-compassion to support your integration journey"
    },
    {
      title: "Loving-Kindness for Difficult Parts",
      steps: [
        "Think of a part of yourself you struggle with or judge",
        "Place your hand on your heart",
        "Say to this part: 'May you be peaceful'",
        "Say: 'May you be free from suffering'",
        "Say: 'May you know you are loved'",
        "Say: 'May you trust that you belong'",
        "Notice any softening or resistance, without judgment"
      ],
      duration: 6,
      instructions: "Extend compassion to the parts of yourself that are hardest to love"
    }
  ]
};

/**
 * EXERCISE CATEGORIES
 * Define the categories and their metadata
 */
export const exerciseCategories = [
  {
    id: 'all',
    name: 'All Exercises',
    icon: 'apps',
    color: '#8b5cf6',
    description: 'Browse all available exercises'
  },
  {
    id: 'breathing',
    name: 'Breathing',
    icon: 'air',
    color: '#3b82f6',
    description: 'Regulate your nervous system through breath'
  },
  {
    id: 'grounding',
    name: 'Grounding',
    icon: 'landscape',
    color: '#10b981',
    description: 'Connect to the present moment and your body'
  },
  {
    id: 'somatic',
    name: 'Somatic',
    icon: 'accessibility',
    color: '#f59e0b',
    description: 'Body-based awareness and release practices'
  },
  {
    id: 'polyvagal',
    name: 'Nervous System',
    icon: 'favorite',
    color: '#ef4444',
    description: 'Understand and shift your autonomic state'
  },
  {
    id: 'partsWork',
    name: 'Parts Work (IFS)',
    icon: 'groups',
    color: '#ec4899',
    description: 'Internal Family Systems dialogue with your parts'
  },
  {
    id: 'selfCompassion',
    name: 'Self-Compassion',
    icon: 'self-improvement',
    color: '#14b8a6',
    description: 'Practices for kindness toward yourself'
  }
];

/**
 * Helper function to get all exercises as a flat array
 */
export const getAllExercises = () => {
  const allExercises = [];
  Object.entries(exercises).forEach(([category, exerciseList]) => {
    exerciseList.forEach(exercise => {
      allExercises.push({
        ...exercise,
        category: category
      });
    });
  });
  return allExercises;
};

/**
 * Helper function to get exercises by category
 */
export const getExercisesByCategory = (categoryId) => {
  if (categoryId === 'all') {
    return getAllExercises();
  }
  return (exercises[categoryId] || []).map(ex => ({
    ...ex,
    category: categoryId
  }));
};
