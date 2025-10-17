/**
 * EDUCATION CONTENT
 *
 * This file contains all educational topics and their content.
 * Edit this file to add, remove, or modify educational materials.
 *
 * Each topic has:
 * - id: Unique identifier
 * - title: Display name
 * - description: Brief overview
 * - emoji: Icon to display
 * - estimatedTime: How long to read/complete
 * - content: Array of sections with titles and text
 * - keyTakeaways: Main points to remember (optional)
 * - furtherReading: Links or resources (optional)
 */

export const educationTopics = [
  {
    id: 'nervous_system',
    title: 'Understanding Your Nervous System',
    description: 'Learn about the three states and how they affect your experience',
    emoji: '🧠',
    estimatedTime: '5 minutes',
    content: [
      {
        title: 'Introduction to Polyvagal Theory',
        text: `Your nervous system is constantly scanning for safety and danger, operating in three main states. Understanding these states helps you work with your body's natural responses rather than against them.`
      },
      {
        title: '💚 Ventral Vagal: Safe & Social',
        text: `This is your optimal state for connection, learning, and integration. You feel:
• Calm and present
• Open to connection
• Able to think clearly
• Curious and engaged
• Safe in your body

In this state, you can process difficult emotions and integrate insights from psychedelic experiences.`
      },
      {
        title: '⚡ Sympathetic: Fight or Flight',
        text: `This is your mobilization state, activated when you perceive threat. You might feel:
• Anxious or agitated
• Racing thoughts or heart
• Tense muscles
• Restless energy
• Difficulty focusing

This isn't "bad" - it's protective! But chronic activation can be exhausting. Grounding and breathing exercises help shift back to ventral.`
      },
      {
        title: '🛡️ Dorsal Vagal: Shutdown & Freeze',
        text: `This is your immobilization state, when threat feels overwhelming. You might feel:
• Numb or disconnected
• Foggy thinking
• Low energy or fatigue
• Emotionally flat
• Wanting to withdraw

This is also protective - your body's way of conserving energy. Gentle movement and connection practices help shift out of shutdown.`
      },
      {
        title: 'Working With Your States',
        text: `Integration happens best in ventral vagal. If you notice you're in sympathetic or dorsal:
1. Name it: "I'm in fight/flight" or "I'm in shutdown"
2. Be compassionate: These states are protective, not failures
3. Use practices: Breathing for sympathetic, gentle movement for dorsal
4. Return when ready: Come back to integration work when you feel safer`
      }
    ],
    keyTakeaways: [
      'Your nervous system has three states: safe/social, fight/flight, and shutdown',
      'Each state is protective and adaptive, not good or bad',
      'Integration works best when you feel safe (ventral vagal)',
      'You can shift states using breath, movement, and connection'
    ]
  },

  {
    id: 'integration_basics',
    title: 'Integration Basics',
    description: 'What is integration and why it matters for psychedelic experiences',
    emoji: '🌱',
    estimatedTime: '7 minutes',
    content: [
      {
        title: 'What Is Integration?',
        text: `Integration is the process of weaving insights and experiences from psychedelic journeys into your everyday life. It's not just about remembering what happened - it's about letting those experiences change you in meaningful, sustainable ways.`
      },
      {
        title: 'Why Integration Matters',
        text: `Without integration, psychedelic experiences can be:
• Overwhelming and confusing
• Quickly forgotten or dismissed
• Disconnected from daily life
• Missed opportunities for growth

With integration, experiences become:
• Sources of lasting wisdom
• Catalysts for real change
• Connections to deeper self-knowledge
• Foundations for healing`
      },
      {
        title: 'The Integration Window',
        text: `Research suggests the most powerful integration happens in the first 6-8 weeks after an experience. Your brain is more plastic, patterns are more changeable, and insights are still fresh.

But integration is also a lifelong process - you may return to the same experience years later and find new meaning.`
      },
      {
        title: 'Key Integration Practices',
        text: `Effective integration includes:

1. **Documentation**: Write, draw, or record your experience
2. **Reflection**: Make time to process and explore meanings
3. **Embodiment**: Bring insights into your body through movement and ritual
4. **Application**: Take concrete actions based on what you learned
5. **Community**: Share with trusted friends, therapists, or integration circles
6. **Patience**: Allow integration to unfold at its own pace`
      },
      {
        title: 'Common Integration Challenges',
        text: `You might experience:
• Difficulty putting experiences into words
• Feeling misunderstood by others
• Insights fading over time
• Resistance to change
• Old patterns re-emerging

All of this is normal! Integration is a practice, not a one-time event.`
      }
    ],
    keyTakeaways: [
      'Integration turns experiences into lasting wisdom and change',
      'The first 6-8 weeks are especially important for integration work',
      'Multiple practices support integration: documentation, reflection, embodiment, application',
      'Integration challenges are normal and part of the process'
    ]
  },

  {
    id: 'johnson_framework',
    title: "Johnson's 4-Step Process",
    description: 'A proven framework for processing and integrating experiences',
    emoji: '🗺️',
    estimatedTime: '10 minutes',
    content: [
      {
        title: 'Overview',
        text: `Robert Johnson's framework, originally developed for dreamwork, provides a systematic way to extract meaning from symbolic experiences. The four steps are:

1. Gathering Elements
2. Connecting to Inner Dynamics
3. Interpretation
4. Rituals`
      },
      {
        title: 'Phase 1: Gathering Elements',
        text: `The goal is comprehensive data collection - capture EVERYTHING from your experience:

• Visuals (colors, shapes, beings, environments)
• Sounds (music, voices, silence)
• Emotions (what you felt)
• Sensations (body feelings, energy)
• Insights (realizations, knowings)
• Symbols (anything that stood out)

Write these down physically - the act of writing makes connections real and prevents forgetting.`
      },
      {
        title: 'Phase 2: Connecting to Inner Dynamics',
        text: `For each element, ask: "What part of me is that?"

Connect symbols to specific inner realities:
• Emotions and feelings
• Inner conflicts
• Parts of your personality
• Belief systems
• Behavior patterns

Example: A "golden light" might represent hope, your wise self, or divine connection. Find where YOU experience that quality in your life with specific examples.`
      },
      {
        title: 'Phase 3: Interpretation',
        text: `Synthesize everything into one unified meaning:

• What is the central message?
• What is the experience advising you to do?
• What's the single most important insight?

Validation principles:
1. Choose interpretations that teach something NEW
2. Avoid ego inflation or self-congratulation
3. Keep responsibility with yourself (not blaming others)
4. Be willing to live with ambiguity if needed

CRITICAL: Write your interpretation out. This moves it from fantasy to concrete reality.`
      },
      {
        title: 'Phase 4: Rituals',
        text: `Do something PHYSICAL to honor the experience:

Rituals can be:
• Practical acts (change a behavior, start a practice)
• Symbolic ceremonies (bury something, offer flowers to water)

Ritual principles:
• Keep them SMALL and subtle (not grand)
• Make them PHYSICAL (use your body)
• Keep them SOLITARY (private, just you)
• Keep them SILENT (don't talk about it)

Example: If your experience revealed a need for simplicity, spend one evening organizing one drawer with full presence and ceremony.`
      }
    ],
    keyTakeaways: [
      'Gather ALL elements comprehensively before moving to interpretation',
      'Connect each element to specific inner dynamics with real-life examples',
      'Write out your interpretation - this makes it concrete',
      'Small, physical rituals have the most power for integration'
    ]
  },

  {
    id: 'ifs_chat',
    title: 'IFS Parts Work Session',
    description: 'Interactive guided session to get to know one of your parts',
    emoji: '💬',
    estimatedTime: '15-20 minutes',
    isInteractive: true,
    content: [
      {
        title: 'What is an IFS Session?',
        text: `This is an interactive guided session using the Six F's framework from Internal Family Systems therapy.

You'll work with an AI guide to:
• **Find** a part that wants your attention
• **Focus** on where and how it shows up
• **Flesh Out** its role and story
• **Feel Toward** it from your Self
• **BeFriend** it with curiosity
• **Understand its Fears** and concerns

This builds relationship with your parts, which is the foundation for healing and integration.`
      },
      {
        title: 'Who is this for?',
        text: `This session is helpful if you:
• Notice inner conflicts or self-criticism
• Want to understand reactive patterns
• Feel "stuck" in certain behaviors
• Are working with psychedelic integration
• Want to develop self-compassion
• Are curious about your inner system

No prior IFS experience needed - the guide will walk you through each step.`
      }
    ],
    keyTakeaways: [
      'IFS work is about relationship, not fixing or changing parts',
      'All parts have positive intentions, even when methods are problematic',
      'Your Self has the wisdom and compassion to heal',
      'This is a beginning - parts work is an ongoing practice'
    ]
  },

  {
    id: 'parts_work',
    title: 'Internal Family Systems (IFS)',
    description: 'Understanding different parts of yourself and how they protect you',
    emoji: '👥',
    estimatedTime: '8 minutes',
    content: [
      {
        title: 'Introduction to IFS',
        text: `Internal Family Systems (IFS) views the mind as made up of multiple sub-personalities or "parts." All parts have positive intentions, even when their methods are problematic.

Developed by Richard Schwartz, IFS helps you understand and heal inner conflicts by working compassionately with all parts of yourself.`
      },
      {
        title: 'The Core Self',
        text: `At your center is the Self - your core consciousness, characterized by the "8 C's":

• Calmness
• Clarity
• Compassion
• Confidence
• Courage
• Creativity
• Curiosity
• Connectedness

The Self can't be damaged, only obscured by protective parts. Integration work helps parts trust the Self to lead.`
      },
      {
        title: 'Exiles: The Wounded Parts',
        text: `Exiles are young parts that carry pain, trauma, shame, or fear. They're usually from childhood. Other parts work hard to keep exiles hidden because their pain feels overwhelming.

Common exiles:
• The abandoned child
• The shamed one
• The terrified part
• The one who feels unlovable

Psychedelic experiences often bring exiles to awareness for healing.`
      },
      {
        title: 'Managers: The Controllers',
        text: `Managers are parts that try to prevent exile pain from surfacing. They run your daily life to keep you safe.

Common managers:
• The perfectionist
• The inner critic
• The planner/controller
• The intellectual/analyzer
• The caretaker (focusing on others)

Managers are exhausted from their constant vigilance. They need appreciation and permission to rest.`
      },
      {
        title: 'Firefighters: Emergency Responders',
        text: `Firefighters activate when exiles break through despite managers' efforts. They use intense, often impulsive methods to distract from pain.

Common firefighters:
• Substance use
• Binge eating or restricting
• Self-harm
• Rage
• Dissociation

Firefighters deserve appreciation too - they step in when pain feels unbearable.`
      },
      {
        title: 'Working With Parts',
        text: `The IFS process:

1. **Notice** a part (sensation, emotion, thought pattern)
2. **Get curious** about it (not critical)
3. **Ask permission** from protective parts to connect
4. **Listen** to what this part needs
5. **Appreciate** its positive intention
6. **Unburden** exiles when they're ready
7. **Update** protectors on how you can help

The goal isn't eliminating parts, but creating harmony where the Self leads compassionately.`
      }
    ],
    keyTakeaways: [
      'Your psyche is made up of multiple parts, all with positive intentions',
      'Exiles carry pain, managers prevent it, firefighters distract from it',
      'All parts deserve curiosity and appreciation, not criticism',
      'The Self can heal and lead when parts trust it'
    ]
  },

  {
    id: 'regulation_practices',
    title: 'Nervous System Regulation',
    description: 'Practical tools for calming activation and reconnecting when shutdown',
    emoji: '🌊',
    estimatedTime: '6 minutes',
    content: [
      {
        title: 'Why Regulation Matters',
        text: `You can't integrate insights when your nervous system is dysregulated. Fight/flight makes it hard to think clearly. Shutdown makes it hard to feel anything.

Learning to regulate helps you:
• Return to a window of tolerance
• Process difficult emotions safely
• Stay present during integration work
• Build resilience over time`
      },
      {
        title: 'For Sympathetic Activation (Fight/Flight)',
        text: `When you're anxious, agitated, or overwhelmed:

**Breathing practices:**
• 4-7-8 breath (inhale 4, hold 7, exhale 8)
• Box breathing (4-4-4-4)
• Extended exhale (breathe out longer than in)

**Grounding practices:**
• 5-4-3-2-1 sensory awareness
• Feel your feet on the floor
• Cold water on face or wrists
• Progressive muscle relaxation

**Movement:**
• Shake or dance
• Go for a walk
• Stretch or yoga`
      },
      {
        title: 'For Dorsal Shutdown (Freeze/Collapse)',
        text: `When you're numb, disconnected, or low energy:

**Gentle activation:**
• Stand up and stretch
• Splash face with cool water
• Hum or sing
• Notice 3 things you can see

**Connection practices:**
• Text a friend
• Pet an animal
• Look at photos of loved ones
• Listen to uplifting music

**Small movements:**
• Wiggle fingers and toes
• Rock gently side to side
• Take a short walk
• Do simple tasks (fold laundry, wash dishes mindfully)`
      },
      {
        title: 'Building Window of Tolerance',
        text: `Your "window of tolerance" is the zone where you can process emotions without getting overwhelmed or shutting down.

You can gradually expand this window through:
• Regular regulation practices
• Therapy (especially somatic therapy)
• Mindfulness meditation
• Building safe relationships
• Healing trauma

Notice what makes your window smaller (stress, triggers) and larger (sleep, connection, practices).`
      },
      {
        title: 'When to Seek Additional Support',
        text: `Consider professional help if:
• You're frequently dysregulated for days at a time
• Self-regulation practices aren't helping
• You're experiencing trauma symptoms
• Integration is bringing up overwhelming material
• You're struggling with daily functioning

A trauma-informed therapist can provide additional tools and support for regulation.`
      }
    ],
    keyTakeaways: [
      'Regulation creates safety for integration work',
      'Different states need different approaches: breathe for activation, move for shutdown',
      'Building your window of tolerance takes time and practice',
      'Professional support is valuable when self-regulation isn\'t enough'
    ]
  },

  {
    id: 'polyvagal_mapping',
    title: 'Map Your Nervous System',
    description: 'Interactive exercise to identify your three nervous system states',
    emoji: '🗺️',
    estimatedTime: '10-15 minutes',
    isInteractive: true,
    content: [
      {
        title: 'What is Polyvagal Mapping?',
        text: `This interactive exercise helps you create a personal map of your three nervous system states. By identifying what each state looks and feels like FOR YOU, you gain powerful self-awareness for integration work.

Understanding your states helps you:
• Recognize when you're dysregulated
• Choose appropriate regulation practices
• Have more compassion for your responses
• Work more effectively with your nervous system`
      },
      {
        title: 'The Three States',
        text: `💚 **Ventral Vagal (Safe & Social)**
Your optimal state for connection and integration. You feel calm, present, and engaged.

⚡ **Sympathetic (Fight/Flight)**
Your mobilization state when perceiving threat. You feel activated, anxious, or energized.

🛡️ **Dorsal Vagal (Shutdown)**
Your immobilization state when threat feels overwhelming. You feel numb, disconnected, or withdrawn.`
      }
    ],
    keyTakeaways: [
      'Each person\'s nervous system states have unique triggers and expressions',
      'Mapping your states builds self-awareness and compassion',
      'Knowing your state helps you choose the right regulation practices',
      'This is a foundational tool for integration work'
    ]
  },

  {
    id: 'triggers_glimmers',
    title: 'Triggers & Glimmers',
    description: 'Map what dysregulates you and what brings you back to safety',
    emoji: '⚡✨',
    estimatedTime: '10-12 minutes',
    isInteractive: true,
    content: [
      {
        title: 'What are Triggers and Glimmers?',
        text: `**Triggers** are cues that move your nervous system into dysregulation - either into fight/flight activation or shutdown collapse. They can be external (sounds, situations) or internal (thoughts, sensations).

**Glimmers** are the opposite - micro-moments that signal safety to your nervous system. A warm cup of tea, sunlight on your face, your pet's greeting, a friend's smile.

This mapping helps you understand what moves you out of regulation AND what brings you back.`
      },
      {
        title: 'The Power of Glimmers',
        text: `While we often focus on avoiding triggers, cultivating glimmers is equally important. The more you notice and intentionally create glimmers, the more your nervous system learns to find safety.

Glimmers build resilience and expand your window of tolerance over time.`
      }
    ],
    keyTakeaways: [
      'Triggers are not your fault - they\'re learned nervous system responses',
      'Glimmers are micro-moments that signal safety',
      'You can intentionally cultivate more glimmers in your daily life',
      'Both awareness of triggers and cultivation of glimmers support regulation'
    ]
  },

  {
    id: 'regulating_resources',
    title: 'Regulating Resources',
    description: 'Identify what helps you regulate - alone and with others',
    emoji: '🛠️',
    estimatedTime: '8-10 minutes',
    isInteractive: true,
    content: [
      {
        title: 'What are Regulating Resources?',
        text: `Regulating resources are practices and connections that help your nervous system return to safety. This exercise helps you identify two types:

🧘 **Individual Resources** - Things you do alone (breathing, movement, nature, creative expression)

🤝 **Interactive Resources** - Ways you co-regulate with others (connection, support, community)

Both are essential for resilience!`
      },
      {
        title: 'The Importance of Balance',
        text: `While individual resources give you autonomy and self-sufficiency, we're fundamentally wired for co-regulation. Healthy nervous system regulation includes both.

Too much reliance on individual resources can lead to isolation. Too much reliance on others can lead to burnout or lack of self-trust. The goal is flexible access to both.`
      }
    ],
    keyTakeaways: [
      'You need both individual and interactive regulating resources',
      'Co-regulation (connection with others) is a biological need',
      'Building a diverse resource toolkit increases resilience',
      'Different states may need different types of resources'
    ]
  },

  {
    id: 'symbol_meaning',
    title: 'Symbols & Archetypes',
    description: 'Common symbols and their meanings in psychedelic experiences',
    emoji: '🔮',
    estimatedTime: '12 minutes',
    content: [
      {
        title: 'Understanding Symbolic Language',
        text: `Psychedelic experiences often speak in symbols - the language of the unconscious. Symbols are multilayered and personal, but certain patterns appear across cultures and individuals.

Important: YOUR associations matter most. These interpretations are starting points, not definitive meanings.`
      },
      {
        title: 'Light & Darkness',
        text: `**Light (golden, white, radiant):**
• Consciousness, awareness
• Divine presence
• Healing energy
• Wisdom, enlightenment
• The Self (in Jungian terms)

**Darkness:**
• The unconscious
• The unknown
• Mystery and potential
• The shadow (hidden aspects)
• Void or emptiness (not negative - the source of creation)`
      },
      {
        title: 'Water',
        text: `**Ocean/Deep Water:**
• The unconscious mind
• Emotions and feelings
• The mother, the feminine
• Vast potential

**Rivers/Flowing Water:**
• Life force, vitality
• The flow of time
• Emotions in motion
• Cleansing, purification

**Storms:**
• Emotional turmoil
• Transformation
• Cleansing change`
      },
      {
        title: 'Animals',
        text: `Animals often represent instinctual energies or qualities:

**Snake:**
• Transformation, healing
• Wisdom, life force (kundalini)
• Death and rebirth

**Bird:**
• Spirit, transcendence
• Freedom, perspective
• Messages from beyond

**Wolf:**
• Instinct, wildness
• Social connection
• Teacher, guide

**Bear:**
• Strength, protection
• Introspection (hibernation)
• The mother archetype

YOUR association is most important - if you fear snakes, that changes the meaning!`
      },
      {
        title: 'Archetypal Figures',
        text: `**Mother/Grandmother:**
• Nurturing, care
• Wisdom
• The feminine divine
• Home, belonging

**Father/Grandfather:**
• Authority, structure
• Protection
• The masculine divine
• Discipline, order

**Child:**
• Innocence, wonder
• Your inner child
• New beginnings
• Vulnerability

**Wise Old Person:**
• Inner wisdom
• The Self
• Guidance
• Integration of experience

**Trickster:**
• Chaos, disruption
• Humor, play
• Breaking rigid patterns
• Shadow integration`
      },
      {
        title: 'Sacred Geometry & Patterns',
        text: `**Spirals:**
• Growth, evolution
• The journey inward
• Cycles of return

**Mandalas/Circles:**
• Wholeness, completion
• The Self
• Sacred space
• Integration

**Fractals:**
• Infinite complexity
• Connection of all things
• Patterns repeating at every scale

**Triangle:**
• Trinity, balance
• Ascending toward higher consciousness
• Stability`
      },
      {
        title: 'Working With Symbols',
        text: `To understand YOUR symbols:

1. **Notice your immediate feeling** about the symbol
2. **Free associate** - what comes to mind?
3. **Find it in your life** - where do you encounter this quality?
4. **Ask what it wants** - if it could speak, what would it say?
5. **Honor it** - through art, writing, or ritual

Remember: Symbols are bridges between unconscious wisdom and conscious understanding. Be curious, not certain.`
      }
    ],
    keyTakeaways: [
      'Symbols are the language of the unconscious mind',
      'Universal patterns exist, but YOUR associations matter most',
      'Same symbol can mean different things in different contexts',
      'Work with symbols through feeling, association, and creative expression'
    ]
  }
];

/**
 * Helper function to get topic by ID
 */
export const getTopicById = (topicId) => {
  return educationTopics.find(topic => topic.id === topicId);
};

/**
 * Helper function to get all topic titles for navigation
 */
export const getAllTopicTitles = () => {
  return educationTopics.map(topic => ({
    id: topic.id,
    title: topic.title,
    emoji: topic.emoji
  }));
};
