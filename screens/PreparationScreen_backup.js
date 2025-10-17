import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  Alert,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import NervousSystemEducationWidget from '../components/NervousSystemEducationWidget';
import IFSPartsEducationWidget from '../components/IFSPartsEducationWidget';
import GroundingExercisesWidget from '../components/GroundingExercisesWidget';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PreparationScreen = ({ navigation }) => {
  const [currentSection, setCurrentSection] = useState('overview');
  const [completedSections, setCompletedSections] = useState([]);
  const [selectedIntentionCategory, setSelectedIntentionCategory] = useState('');
  const [customIntention, setCustomIntention] = useState('');
  const [checkedItems, setCheckedItems] = useState({});

  // Preparation sections
  const preparationSections = [
    {
      id: 'overview',
      title: 'Preparation Overview',
      emoji: '🌟',
      description: 'Your path toward healing begins here',
      estimatedTime: '2 min'
    },
    {
      id: 'intention_setting',
      title: 'Setting Your Intention',
      emoji: '🎯',
      description: 'Create a compass for your healing journey',
      estimatedTime: '10-15 min'
    },
    {
      id: 'nervous_system',
      title: 'Nervous System Basics',
      emoji: '🧠',
      description: 'Understanding your three states',
      estimatedTime: '5 min'
    },
    {
      id: 'parts_work',
      title: 'Parts of You (IFS)',
      emoji: '👥',
      description: 'Meet your inner protectors and wounded parts',
      estimatedTime: '7 min'
    },
    {
      id: 'grounding_prep',
      title: 'Grounding & Somatic Prep',
      emoji: '🌱',
      description: 'Practice regulation techniques',
      estimatedTime: '8 min'
    },
    {
      id: 'session_prep',
      title: 'Session Day Preparation',
      emoji: '📋',
      description: 'Practical checklist and reminders',
      estimatedTime: '5 min'
    }
  ];

  // Items checklist from your document
  const sessionItems = [
    {
      id: 'eye_mask',
      title: 'Eye Mask',
      description: 'The doctor will provide one but you may prefer your own for comfort',
      essential: false
    },
    {
      id: 'music_device',
      title: 'iPhone/iPad/Smartphone',
      description: 'Your listening device for preselected music playlist',
      essential: true
    },
    {
      id: 'headphones',
      title: 'Noise-cancelling Headphones',
      description: 'Best listening experience to immerse in music and eliminate outside noise',
      essential: true
    },
    {
      id: 'journal',
      title: 'Journal & Pen',
      description: 'Write or draw anything to help reflect on your experience',
      essential: true
    },
    {
      id: 'grounding_object',
      title: 'Grounding Object',
      description: 'Fidget item, stuffed animal, crystal, etc. for comfort',
      essential: false
    },
    {
      id: 'sentimental_object',
      title: 'Sentimental Object',
      description: 'Photo, jewelry, or memento for connection to something meaningful',
      essential: false
    },
    {
      id: 'weighted_blanket',
      title: 'Weighted Blanket',
      description: 'Doctor may provide one, but bring your own if preferred',
      essential: false
    },
    {
      id: 'essential_oil',
      title: 'Essential Oil',
      description: 'Soothing scent that might evoke helpful emotions',
      essential: false
    }
  ];

  // Intention categories from your document
  const intentionCategories = [
    {
      id: 'past_experiences',
      title: 'Reflecting on Past Experiences',
      emoji: '🔍',
      description: 'Gently revisit moments from your past to uncover their significance and recognize valuable lessons',
      examples: [
        'Show me the deeper meaning behind my childhood experiences',
        'Help me understand how my past is influencing my present',
        'Teach me what I need to learn from my difficult experiences',
        'Show me the gifts hidden in my painful memories'
      ]
    },
    {
      id: 'unconscious_pain',
      title: 'Healing Unconscious Pain',
      emoji: '💚',
      description: 'Uncover and address hidden hurts you may carry within for healing and expression',
      examples: [
        'Show me the pain I\'ve been carrying that I don\'t recognize',
        'Help me heal the wounds I don\'t know I have',
        'Teach me how to love the parts of me that are hurting',
        'Show me what my body has been holding for me'
      ]
    },
    {
      id: 'self_perceptions',
      title: 'Changing Self-Perceptions',
      emoji: '🌅',
      description: 'Reshape how you view yourself and rewrite your life narrative with kindness',
      examples: [
        'Show me who I really am beneath my self-criticism',
        'Help me see myself with compassion and love',
        'Teach me to recognize my inherent worth and beauty',
        'Show me the story I want to tell about my life'
      ]
    },
    {
      id: 'connecting_deeply',
      title: 'Connecting Deeply',
      emoji: '✨',
      description: 'Dissolve barriers that prevent meaningful connections with yourself and others',
      examples: [
        'Show me how to open my heart safely',
        'Help me understand what blocks me from true connection',
        'Teach me how to be authentic in my relationships',
        'Show me how to connect with my deepest self'
      ]
    },
    {
      id: 'behavior_patterns',
      title: 'Exploring Behavior Patterns',
      emoji: '🔄',
      description: 'Understand the core reasons behind your behaviors and what influences your actions',
      examples: [
        'Show me why I keep repeating the same patterns',
        'Help me understand what drives my automatic reactions',
        'Teach me what my behaviors are trying to protect',
        'Show me how to respond instead of react'
      ]
    },
    {
      id: 'negative_habits',
      title: 'Breaking Negative Habits',
      emoji: '🌱',
      description: 'Overcome harmful habits with self-compassion and resilience in your journey toward change',
      examples: [
        'Show me what I\'m really seeking when I engage in this habit',
        'Help me find healthier ways to meet my needs',
        'Teach me to be gentle with myself as I change',
        'Show me the freedom that awaits on the other side'
      ]
    },
    {
      id: 'feeling_emotions',
      title: 'Feeling Emotions Fully',
      emoji: '🌊',
      description: 'Embrace your emotions authentically as a natural part of your human experience',
      examples: [
        'Show me how to feel my emotions without being overwhelmed',
        'Help me trust my emotional wisdom',
        'Teach me that all feelings are welcome and temporary',
        'Show me the gifts that my emotions bring'
      ]
    },
    {
      id: 'releasing_feelings',
      title: 'Releasing Held Feelings',
      emoji: '🕊️',
      description: 'Let go of emotions you\'ve carried too long to create space for healing and renewal',
      examples: [
        'Show me how to release what I\'ve been holding',
        'Help me let go with love and forgiveness',
        'Teach me that releasing doesn\'t mean forgetting',
        'Show me the lightness that comes with letting go'
      ]
    },
    {
      id: 'changing_beliefs',
      title: 'Changing Fixed Beliefs',
      emoji: '🔓',
      description: 'Transform limiting beliefs and rigid thought patterns that no longer serve you',
      examples: [
        'Show me the beliefs that are keeping me stuck',
        'Help me see beyond my limited perspective',
        'Teach me what\'s possible when I let go of old stories',
        'Show me the truth beneath my assumptions about myself and the world'
      ]
    }
  ];

  const markSectionComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const toggleItemCheck = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const renderOverview = () => (
    <ScrollView style={styles.sectionContainer}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <Text style={styles.heroTitle}>Session Preparation</Text>
        <Text style={styles.heroSubtitle}>
          Your path toward healing begins with creating a comfortable and safe environment to feel relaxed and ready to expand your mind
        </Text>
      </LinearGradient>

      <View style={styles.contentPadding}>
        <Text style={styles.sectionTitle}>🌟 Let the Journey Begin</Text>
        <Text style={styles.bodyText}>
          Proper preparation enhances your treatment outcome. This guide will help you create the right mindset, 
          understand your nervous system, and gather everything you need for a safe and transformative experience.
        </Text>

        <View style={styles.preparationFlow}>
          <Text style={styles.flowTitle}>📍 Your Preparation Journey</Text>
          {preparationSections.slice(1).map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.flowItem,
                completedSections.includes(section.id) && styles.completedFlowItem
              ]}
              onPress={() => setCurrentSection(section.id)}
            >
              <View style={styles.flowItemLeft}>
                <Text style={styles.flowEmoji}>{section.emoji}</Text>
                <View style={styles.flowItemText}>
                  <Text style={styles.flowItemTitle}>{section.title}</Text>
                  <Text style={styles.flowItemDescription}>{section.description}</Text>
                  <Text style={styles.flowItemTime}>{section.estimatedTime}</Text>
                </View>
              </View>
              <View style={styles.flowItemRight}>
                {completedSections.includes(section.id) ? (
                  <MaterialIcons name="check-circle" size={24} color="#10b981" />
                ) : (
                  <MaterialIcons name="arrow-forward-ios" size={16} color="#9ca3af" />
                )}
              </View>
            </TouchableOpacity>
          ))}}


        {selectedIntentionCategory && (
          <View style={styles.selectedIntentionBox}>
            <Text style={styles.selectedIntentionTitle}>🎯 Your Selected Focus</Text>
            <Text style={styles.selectedIntentionCategory}>
              {intentionCategories.find(cat => cat.id === selectedIntentionCategory)?.title}
            </Text>
            <Text style={styles.selectedIntentionDescription}>
              {intentionCategories.find(cat => cat.id === selectedIntentionCategory)?.description}
            </Text>
            
            <Text style={styles.customIntentionLabel}>Write your personal intention:</Text>
            <TextInput
              style={styles.customIntentionInput}
              multiline
              numberOfLines={4}
              placeholder="Example: Show me the beliefs that are keeping me stuck..."
              value={customIntention}
              onChangeText={setCustomIntention}
              placeholderTextColor="#9ca3af"
            />
            
            <View style={styles.intentionExamples}>
              <Text style={styles.examplesTitle}>Inspiration from this category:</Text>
              {intentionCategories.find(cat => cat.id === selectedIntentionCategory)?.examples.map((example, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.exampleOption}
                  onPress={() => setCustomIntention(example)}
                >
                  <Text style={styles.exampleOptionText}>• {example}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setCurrentSection('intention_setting')}
        >
          <Text style={styles.startButtonText}>Begin Preparation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderIntentionSetting = () => (
    <ScrollView style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentSection('overview')}
        >
          <MaterialIcons name="arrow-back" size={24} color="#6b7280" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>🎯 Setting Your Intention</Text>
      </View>

      <View style={styles.contentPadding}>
        <View style={styles.keyConceptBox}>
          <Text style={styles.keyConceptTitle}>What is an intention?</Text>
          <Text style={styles.keyConceptText}>
            Setting an intention is a crucial part of maximizing the benefits of your treatment. 
            By setting an intention, you become more open to receiving the wisdom of the unconscious mind 
            and allow yourself to receive insights, understand thought patterns, and process experiences.
          </Text>
        </View>

        <View style={styles.philosophyBox}>
          <Text style={styles.philosophyTitle}>🏢 The Mountain Metaphor</Text>
          <Text style={styles.philosophyText}>
            Your intention is like a mountain top—it's the goal, but the route to get there can be infinite. 
            If you cling too tightly to an intention, it can limit your experience and prevent you from 
            recognizing insights that allow you to change. The unconscious often has information 
            the conscious mind can't access.
          </Text>
        </View>

        <View style={styles.importantBox}>
          <Text style={styles.importantTitle}>🌟 Trust. Let go. Be Open.</Text>
          <Text style={styles.importantText}>
            Your anchoring statement to return to during your journey:
          </Text>
          <View style={styles.anchoringList}>
            <Text style={styles.anchoringItem}>✓ Trust that you are safe and supported</Text>
            <Text style={styles.anchoringItem}>✓ Let go of any need to control the journey</Text>
            <Text style={styles.anchoringItem}>✓ Be open to the possibilities it may show you</Text>
          </View>
        </View>

        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💡 Tips for Setting an Intention</Text>
          
          <View style={styles.tipSection}>
            <Text style={styles.tipSubtitle}>"Show me, teach me, help me"</Text>
            <Text style={styles.tipText}>
              Starting with "Show me...", "Teach me...", "Help me..." and then completing that sentence 
              helps create meaningful intentions. This allows the wisdom of your unconscious to provide 
              guidance and access information that drives motivations and behaviors.
            </Text>
          </View>

          <View style={styles.tipSection}>
            <Text style={styles.tipSubtitle}>Keep the intention positive</Text>
            <Text style={styles.tipText}>
              Use positive language that clearly states what you want, as opposed to what you don't want.
            </Text>
            <Text style={styles.tipExample}>
              <Text style={styles.tipBold}>Instead of:</Text> "I don't want to be depressed anymore"
            </Text>
            <Text style={styles.tipExample}>
              <Text style={styles.tipBold}>Try:</Text> "Teach me how to live a joyful life"
            </Text>
          </View>

          <View style={styles.tipSection}>
            <Text style={styles.tipSubtitle}>Intentions vs Expectations</Text>
            <Text style={styles.tipText}>
              Make sure your intention doesn't become an expectation. Hold your intention loosely 
              and stay open to the experience. Your rational mind creates stories, but other parts 
              of your nervous system can give you the answers you seek.
            </Text>
          </View>
        </View>

        <Text style={styles.categoriesTitle}>Intention Categories</Text>
        <Text style={styles.categoriesSubtitle}>
          Explore these areas or create your own personalized intention:
        </Text>

        {intentionCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => {
              // Show category details inline instead of navigating away
              Alert.alert(
                category.title,
                category.description + '\n\nExample intentions:\n\n' + 
                category.examples.map(ex => '• ' + ex).join('\n'),
                [
                  { text: 'Close', style: 'cancel' },
                  { 
                    text: 'Use This Type', 
                    onPress: () => {
                      console.log('Setting selected category to:', category.id);
                      setSelectedIntentionCategory(category.id);
                      console.log('Selected category state should be:', category.id);
                      Alert.alert(
                        'Intention Selected!',
                        `You've chosen "${category.title}" as your intention focus. Scroll down to see the text input box.`,
                        [{ text: 'Continue', style: 'default' }]
                      );
                    }
                  }
                ]
              );
            }}
          >
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <MaterialIcons name="info-outline" size={16} color="#9ca3af" />
            </View>
            <Text style={styles.categoryDescription}>{category.description}</Text>
            <Text style={styles.categoryPreview}>
              Example: {category.examples[0]}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            markSectionComplete('intention_setting');
            setCurrentSection('nervous_system');
          }}
        >
          <Text style={styles.continueButtonText}>Continue to Nervous System Basics</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderSessionPrep = () => (
    <ScrollView style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setCurrentSection('overview')}
        >
          <MaterialIcons name="arrow-back" size={24} color="#6b7280" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>📋 Session Day Preparation</Text>
      </View>

      <View style={styles.contentPadding}>
        {/* Items Checklist */}
        <View style={styles.checklistSection}>
          <Text style={styles.checklistTitle}>🎒 Items Checklist</Text>
          <Text style={styles.checklistSubtitle}>
            Gather comfort items to enhance your session experience:
          </Text>

          {sessionItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistItem}
              onPress={() => toggleItemCheck(item.id)}
            >
              <View style={styles.checklistItemLeft}>
                <View style={[
                  styles.checkbox,
                  checkedItems[item.id] && styles.checkedBox
                ]}>
                  {checkedItems[item.id] && (
                    <MaterialIcons name="check" size={16} color="#ffffff" />
                  )}
                </View>
                <View style={styles.checklistItemText}>
                  <View style={styles.checklistItemHeader}>
                    <Text style={styles.checklistItemTitle}>{item.title}</Text>
                    {item.essential && (
                      <Text style={styles.essentialTag}>Essential</Text>
                    )}
                  </View>
                  <Text style={styles.checklistItemDescription}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Day Before Preparation */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>📅 Day Before Session</Text>
          <View style={styles.timelineItems}>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>📋</Text>
              <Text style={styles.timelineText}>Review provider instructions</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🎒</Text>
              <Text style={styles.timelineText}>Gather comfort items from checklist</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🚗</Text>
              <Text style={styles.timelineText}>Confirm ride to/from clinic</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🎵</Text>
              <Text style={styles.timelineText}>Select music playlist and test headphones</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🎯</Text>
              <Text style={styles.timelineText}>Review your intention</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🧘</Text>
              <Text style={styles.timelineText}>Select meditation, song, or reading for focus</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🚫</Text>
              <Text style={styles.timelineText}>Avoid intense media and stressful experiences</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🍎</Text>
              <Text style={styles.timelineText}>Eat healthy, avoid alcohol/recreational drugs</Text>
            </View>
          </View>
        </View>

        {/* Session Day */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>🌅 Session Day</Text>
          <View style={styles.timelineItems}>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🎯</Text>
              <Text style={styles.timelineText}>Review your intention</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>📱</Text>
              <Text style={styles.timelineText}>Put phone on Do Not Disturb</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🧘</Text>
              <Text style={styles.timelineText}>Listen to your selected meditation/song</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🤗</Text>
              <Text style={styles.timelineText}>Engage with comfort items</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🎵</Text>
              <Text style={styles.timelineText}>Begin your music playlist</Text>
            </View>
            <View style={styles.timelineItem}>
              <Text style={styles.timelineEmoji}>🌟</Text>
              <Text style={styles.timelineText}>Remind yourself: "Trust. Let go. Be open."</Text>
            </View>
          </View>
        </View>

        {/* After Session */}
        <View style={styles.afterSessionBox}>
          <Text style={styles.afterSessionTitle}>📝 After Your Session</Text>
          <View style={styles.afterSessionItems}>
            <Text style={styles.afterSessionItem}>• Write insights in your journal while waiting</Text>
            <Text style={styles.afterSessionItem}>• Don't feel pressured to share immediately</Text>
            <Text style={styles.afterSessionItem}>• Follow provider's post-treatment instructions</Text>
            <Text style={styles.afterSessionItem}>• Use the app's integration tools when ready</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => {
            markSectionComplete('session_prep');
            Alert.alert(
              'Preparation Complete!',
              'You\'re ready for your healing journey. Remember: Trust. Let go. Be open.',
              [
                { 
                  text: 'Return to Home', 
                  onPress: () => navigation.navigate('Sessions')
                }
              ]
            );
          }}
        >
          <Text style={styles.completeButtonText}>Complete Preparation ✨</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderNervousSystemEducation = () => (
    <NervousSystemEducationWidget
      onComplete={() => {
        markSectionComplete('nervous_system');
        setCurrentSection('parts_work');
      }}
      onSkip={() => {
        markSectionComplete('nervous_system');
        setCurrentSection('parts_work');
      }}
    />
  );

  const renderPartsWorkEducation = () => (
    <IFSPartsEducationWidget
      onComplete={() => {
        markSectionComplete('parts_work');
        setCurrentSection('grounding_prep');
      }}
      onSkip={() => {
        markSectionComplete('parts_work');
        setCurrentSection('grounding_prep');
      }}
    />
  );

  const renderGroundingPrep = () => (
    <GroundingExercisesWidget
      onComplete={() => {
        markSectionComplete('grounding_prep');
        setCurrentSection('session_prep');
      }}
      onSkip={() => {
        markSectionComplete('grounding_prep');
        setCurrentSection('session_prep');
      }}
    />
  );

  // Render based on current section
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'overview':
        return renderOverview();
      case 'intention_setting':
        return renderIntentionSetting();
      case 'nervous_system':
        return renderNervousSystemEducation();
      case 'parts_work':
        return renderPartsWorkEducation();
      case 'grounding_prep':
        return renderGroundingPrep();
      case 'session_prep':
        return renderSessionPrep();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  sectionContainer: {
    flex: 1,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingVertical: 48,
    paddingTop: 60,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6b7280',
    marginLeft: 4,
  },
  contentPadding: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  bodyText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  preparationFlow: {
    marginBottom: 32,
  },
  flowTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  completedFlowItem: {
    backgroundColor: '#f0f9ff',
    borderColor: '#10b981',
  },
  flowItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flowEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  flowItemText: {
    flex: 1,
  },
  flowItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  flowItemDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  flowItemTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  flowItemRight: {
    marginLeft: 12,
  },
  startButton: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  keyConceptBox: {
    backgroundColor: '#f0f9ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  keyConceptTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  keyConceptText: {
    fontSize: 16,
    color: '#1e40af',
    lineHeight: 24,
  },
  philosophyBox: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#6b7280',
  },
  philosophyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  philosophyText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  importantBox: {
    backgroundColor: '#fef3c7',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  importantTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  importantText: {
    fontSize: 16,
    color: '#92400e',
    marginBottom: 12,
  },
  anchoringList: {
    marginLeft: 8,
  },
  anchoringItem: {
    fontSize: 14,
    color: '#92400e',
    marginBottom: 4,
  },
  tipsBox: {
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#065f46',
    marginBottom: 8,
    lineHeight: 20,
  },
  tipBold: {
    fontWeight: '600',
  },
  tipSection: {
    marginBottom: 16,
  },
  tipSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 8,
  },
  tipExample: {
    fontSize: 14,
    color: '#065f46',
    marginBottom: 4,
    lineHeight: 20,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  categoriesSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  categoryPreview: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  checklistSection: {
    marginBottom: 32,
  },
  checklistTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  checklistSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  checklistItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  checklistItemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkedBox: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checklistItemText: {
    flex: 1,
  },
  checklistItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  checklistItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  essentialTag: {
    fontSize: 10,
    fontWeight: '600',
    color: '#dc2626',
    backgroundColor: '#fee2e2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  checklistItemDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  timelineSection: {
    marginBottom: 32,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  timelineItems: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  timelineEmoji: {
    fontSize: 16,
    marginRight: 12,
    marginTop: 2,
  },
  timelineText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    flex: 1,
  },
  afterSessionBox: {
    backgroundColor: '#fef7ff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: '#a855f7',
  },
  afterSessionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7c2d12',
    marginBottom: 12,
  },
  afterSessionItems: {
    marginLeft: 8,
  },
  afterSessionItem: {
    fontSize: 14,
    color: '#7c2d12',
    marginBottom: 6,
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  selectedIntentionBox: {
    backgroundColor: '#dbeafe',
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  selectedIntentionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  selectedIntentionCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  selectedIntentionDescription: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
    marginBottom: 16,
  },
  customIntentionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  customIntentionInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  intentionExamples: {
    marginTop: 8,
  },
  examplesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  exampleOption: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  exampleOptionText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});

export default PreparationScreen;