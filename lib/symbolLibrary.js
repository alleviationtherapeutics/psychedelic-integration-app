// symbolLibrary.js - Archetypal and spiritual symbol meanings
export const symbolLibrary = {
  // Archetypal symbols
  serpent: [
    {
      tradition: 'Jungian',
      meaning: 'Transformation, healing, kundalini energy, medical wisdom. The serpent represents the capacity for renewal and the power of the unconscious.',
      category: 'archetypal'
    },
    {
      tradition: 'Shamanic',
      meaning: 'Medicine power, earth connection, shedding old patterns. Associated with healing and the ability to shed what no longer serves.',
      category: 'archetypal'
    },
    {
      tradition: 'Ketamine Context',
      meaning: 'Often appears during healing experiences, representing the body\'s wisdom and capacity for transformation.',
      category: 'integration'
    }
  ],
  
  water: [
    {
      tradition: 'Jungian',
      meaning: 'The unconscious, emotions, purification, the flow of life. Water represents the emotional depths and cleansing processes.',
      category: 'archetypal'
    },
    {
      tradition: 'Buddhist',
      meaning: 'Impermanence, flow, adaptability. Water teaches us about non-attachment and the natural flow of experience.',
      category: 'spiritual'
    }
  ],

  tree: [
    {
      tradition: 'Universal',
      meaning: 'Connection between earth and sky, growth, life force, family lineage. Trees represent grounding and reaching toward transcendence.',
      category: 'archetypal'
    },
    {
      tradition: 'Shamanic',
      meaning: 'World tree, axis mundi, connection to ancestral wisdom and cosmic knowledge.',
      category: 'spiritual'
    }
  ],

  light: [
    {
      tradition: 'Universal',
      meaning: 'Consciousness, divine presence, illumination, hope, understanding. Light represents awareness and spiritual awakening.',
      category: 'spiritual'
    },
    {
      tradition: 'Ketamine Context',
      meaning: 'Frequently experienced as divine love, healing presence, or expanded consciousness. Often felt as unconditional acceptance.',
      category: 'integration'
    }
  ],

  mountain: [
    {
      tradition: 'Buddhist',
      meaning: 'Stability, permanence, spiritual ascent, the challenge of growth. Mountains represent the journey toward enlightenment.',
      category: 'spiritual'
    },
    {
      tradition: 'Jungian',
      meaning: 'The Self, spiritual aspiration, the peak of consciousness. Mountains represent the highest aspects of personality.',
      category: 'archetypal'
    }
  ],

  void: [
    {
      tradition: 'Buddhist',
      meaning: 'Śūnyatā (emptiness), the space from which all phenomena arise. Not nothingness, but pregnant potential.',
      category: 'spiritual'
    },
    {
      tradition: 'Ketamine Context',
      meaning: 'Often experienced as profound peace, the source of all being, or dissolution of ego boundaries.',
      category: 'integration'
    }
  ],

  // Emotional states
  fear: [
    {
      tradition: 'Polyvagal',
      meaning: 'Sympathetic nervous system activation. Fear may indicate areas needing safety and healing.',
      category: 'somatic'
    },
    {
      tradition: 'Buddhist',
      meaning: 'One of the fundamental sources of suffering. Fear often points to attachments we need to examine.',
      category: 'spiritual'
    }
  ],

  love: [
    {
      tradition: 'Universal',
      meaning: 'The fundamental connecting force, unconditional acceptance, heart opening, unity consciousness.',
      category: 'spiritual'
    },
    {
      tradition: 'Ketamine Context',
      meaning: 'Often experienced as overwhelming divine love, self-acceptance, or connection to all beings.',
      category: 'integration'
    }
  ],

  // IFS Parts
  'inner critic': [
    {
      tradition: 'IFS',
      meaning: 'A protective part that tries to prevent shame or failure by criticizing. Usually developed early to help navigate difficult situations.',
      category: 'parts'
    },
    {
      tradition: 'Integration',
      meaning: 'During psychedelic experiences, the inner critic may soften, revealing the wounded parts it\'s trying to protect.',
      category: 'integration'
    }
  ],

  'wounded child': [
    {
      tradition: 'IFS',
      meaning: 'An exiled part carrying old pain, often seeking attention, love, or safety that was missing in childhood.',
      category: 'parts'
    },
    {
      tradition: 'Healing',
      meaning: 'Integration involves learning to provide this part with the love and safety it needs.',
      category: 'integration'
    }
  ],

  // Body sensations
  warmth: [
    {
      tradition: 'Somatic',
      meaning: 'Often indicates safety, love, healing energy, or activation of the ventral vagal system (social engagement).',
      category: 'somatic'
    }
  ],

  pressure: [
    {
      tradition: 'Somatic',
      meaning: 'May indicate stored trauma, tension, or energy needing to move. Can also be healing energy concentrating.',
      category: 'somatic'
    }
  ],

  // Colors
  golden: [
    {
      tradition: 'Alchemical',
      meaning: 'The goal of transformation, divine consciousness, illumination, the philosopher\'s stone of self-realization.',
      category: 'spiritual'
    }
  ],

  violet: [
    {
      tradition: 'Chakra',
      meaning: 'Crown chakra energy, spiritual connection, higher consciousness, divine wisdom.',
      category: 'spiritual'
    }
  ]
};

// Helper function to get meanings for a symbol
export const getSymbolMeanings = (symbolName) => {
  const normalizedName = symbolName.toLowerCase().trim();
  return symbolLibrary[normalizedName] || [];
};

// Helper function to search symbols by tradition
export const getSymbolsByTradition = (tradition) => {
  const results = [];
  Object.entries(symbolLibrary).forEach(([symbol, meanings]) => {
    const traditionMeanings = meanings.filter(m => 
      m.tradition.toLowerCase().includes(tradition.toLowerCase())
    );
    if (traditionMeanings.length > 0) {
      results.push({ symbol, meanings: traditionMeanings });
    }
  });
  return results;
};

// Integration-specific helper
export const getIntegrationSuggestions = (symbolName) => {
  const meanings = getSymbolMeanings(symbolName);
  const integrationMeaning = meanings.find(m => m.category === 'integration');
  
  if (integrationMeaning) {
    return integrationMeaning.meaning;
  }
  
  // Generate basic integration suggestions based on category
  const primaryMeaning = meanings[0];
  if (!primaryMeaning) return 'Reflect on what this symbol means in your personal experience.';
  
  const suggestions = {
    archetypal: `Consider how the archetype of ${symbolName} might be active in your life. What qualities does it represent that you're being called to embody?`,
    spiritual: `Reflect on the spiritual significance of ${symbolName} in your journey. How might this guide your practice and understanding?`,
    somatic: `Notice how ${symbolName} feels in your body. What is this sensation teaching you about your current state?`,
    parts: `Dialogue with this part of yourself. What does ${symbolName} need from you? How can you provide care and understanding?`
  };
  
  return suggestions[primaryMeaning.category] || 'Explore what this symbol means to you personally.';
};