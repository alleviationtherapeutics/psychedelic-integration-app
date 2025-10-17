# Quick Start: Adding Content

## 🏃 Add a New Exercise (30 seconds)

1. Open `content/exercises.js`
2. Find the right category (breathing, grounding, somatic, etc.)
3. Copy an existing exercise
4. Change the title, steps, and duration
5. Save!

**Example:**
```javascript
breathing: [
  // ... existing exercises ...
  {
    title: "4-7-8 Relaxation Breath",
    steps: [
      "Empty your lungs completely",
      "Breathe in through nose for 4 counts",
      "Hold breath for 7 counts",
      "Exhale through mouth for 8 counts",
      "Repeat 4 times"
    ],
    duration: 3,
    instructions: "Dr. Weil's technique for quick relaxation and better sleep"
  }
]
```

---

## 📖 Add a New Education Topic (2 minutes)

1. Open `content/education.js`
2. Copy an existing topic
3. Change the id, title, emoji, and content
4. Save!

**Example:**
```javascript
{
  id: 'set_and_setting',
  title: 'Set and Setting',
  description: 'How mindset and environment shape your journey',
  emoji: '🌄',
  estimatedTime: '6 minutes',
  content: [
    {
      title: 'What is Set and Setting?',
      text: `"Set" is your mindset going in - your intentions, expectations, and mental state.

"Setting" is your physical environment - the space, sounds, people, and atmosphere.

Together they profoundly influence your experience.`
    },
    {
      title: 'Optimizing Your Set',
      text: `Before a journey:
• Set clear intentions
• Address fears and anxieties
• Get adequate sleep
• Avoid heavy meals
• Create mental spaciousness`
    },
    {
      title: 'Creating the Right Setting',
      text: `Consider:
• Safe, comfortable space
• Minimal interruptions
• Trusted guides or sitters
• Meaningful objects or music
• Natural light or soft lighting`
    }
  ],
  keyTakeaways: [
    'Set = mindset, Setting = environment',
    'Both profoundly shape the experience',
    'Preparation and intention matter',
    'Safety and comfort are foundational'
  ]
}
```

---

## 🎯 That's It!

All content lives in two files:
- **exercises.js** - All therapeutic practices
- **education.js** - All learning content

Edit these files, save, and your changes appear in the app.

No component code to touch. No complex setup. Just edit and go! ✨
