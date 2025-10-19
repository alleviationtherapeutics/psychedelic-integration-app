import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

const SessionPreparationScreen = ({ navigation, route }) => {
  const { sessionId, sessionData } = route.params || {};
  const [currentSection, setCurrentSection] = useState('overview');
  const [completedSections, setCompletedSections] = useState([]);
  
  // Session Info
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [setting, setSetting] = useState('');
  const [facilitator, setFacilitator] = useState('');
  const [participants, setParticipants] = useState('');
  const [sessionContext, setSessionContext] = useState('');

  // Intention Setting
  const [selectedIntentionCategory, setSelectedIntentionCategory] = useState('');
  const [customIntention, setCustomIntention] = useState('');
  const [showIntentionModal, setShowIntentionModal] = useState(false);

  // Check-ins
  const [nervousSystemState, setNervousSystemState] = useState('');
  const [nervousSystemNotes, setNervousSystemNotes] = useState('');
  const [activeParts, setActiveParts] = useState([]);
  const [partsNotes, setPartsNotes] = useState('');

  // Session day items checklist
  const [checkedItems, setCheckedItems] = useState({});

  // Load existing session data if available
  useEffect(() => {
    if (sessionData) {
      const prep = sessionData.preparation || {};
      // Session info
      setMedicine(prep.medicine || '');
      setDosage(prep.dosage || '');
      setSetting(prep.setting || '');
      setFacilitator(prep.facilitator || '');
      setParticipants(prep.participants || '');
      setSessionContext(prep.sessionContext || '');
      // Intention
      setCustomIntention(prep.intention || '');
      setSelectedIntentionCategory(prep.intentionCategory || '');
      // Check-ins
      setNervousSystemState(prep.nervousSystemState || '');
      setNervousSystemNotes(prep.nervousSystemNotes || '');
      setActiveParts(prep.activeParts || []);
      setPartsNotes(prep.partsNotes || '');
      setCheckedItems(prep.checkedItems || {});
      setCompletedSections(prep.completedSections || []);
    }
  }, [sessionData]);

  // Save preparation data to session
  const savePreparationData = async () => {
    if (!sessionId) return;

    try {
      const preparationData = {
        // Session info
        medicine,
        dosage,
        setting,
        facilitator,
        participants,
        sessionContext,
        // Intention
        intention: customIntention,
        intentionCategory: selectedIntentionCategory,
        // Check-ins
        nervousSystemState,
        nervousSystemNotes,
        activeParts,
        partsNotes,
        checkedItems,
        completedSections,
        completedAt: new Date().toISOString()
      };

      const currentSessionData = sessionData?.session_data || {};
      const updatedSessionData = {
        ...currentSessionData,
        preparation: preparationData
      };

      const { error } = await supabase
        .from('sessions')
        .update({ session_data: updatedSessionData })
        .eq('id', sessionId);

      if (error) throw error;

      console.log('Preparation data saved successfully');
    } catch (error) {
      console.error('Error saving preparation data:', error);
    }
  };

  // Session preparation sections
  const preparationSections = [
    {
      id: 'overview',
      title: 'Session Overview',
      emoji: '🌟',
      description: 'Prepare for this specific session',
      estimatedTime: '2 min'
    },
    {
      id: 'intention_setting',
      title: 'Set Your Intention',
      emoji: '🎯',
      description: 'Create your compass for this journey',
      estimatedTime: '10-15 min'
    },
    {
      id: 'nervous_system_checkin',
      title: 'Nervous System Check-in',
      emoji: '🧠',
      description: 'Assess your current state',
      estimatedTime: '5 min'
    },
    {
      id: 'parts_checkin',
      title: 'Parts Check-in',
      emoji: '👥',
      description: 'Notice what parts are active today',
      estimatedTime: '7 min'
    },
    {
      id: 'session_day_prep',
      title: 'Session Day Checklist',
      emoji: '📋',
      description: 'Items and final preparations',
      estimatedTime: '5 min'
    }
  ];

  // Intention categories
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
    }
  ];

  // Session day items
  const sessionItems = [
    {
      id: 'eye_mask',
      title: 'Eye Mask',
      description: 'Provider may have one, but bring your own for comfort',
      essential: false
    },
    {
      id: 'music_device',
      title: 'Phone/Music Device',
      description: 'For your preselected music playlist',
      essential: true
    },
    {
      id: 'headphones',
      title: 'Noise-cancelling Headphones',
      description: 'Best listening experience and noise elimination',
      essential: true
    },
    {
      id: 'journal',
      title: 'Journal & Pen',
      description: 'Write or draw to reflect on your experience',
      essential: true
    },
    {
      id: 'grounding_object',
      title: 'Grounding Object',
      description: 'Fidget item, stuffed animal, crystal for comfort',
      essential: false
    },
    {
      id: 'sentimental_object',
      title: 'Sentimental Object',
      description: 'Photo, jewelry, or memento for meaningful connection',
      essential: false
    },
    {
      id: 'weighted_blanket',
      title: 'Weighted Blanket',
      description: 'Provider may have one, but bring your preferred one',
      essential: false
    },
    {
      id: 'essential_oil',
      title: 'Essential Oil',
      description: 'Soothing scent for emotional support',
      essential: false
    }
  ];

  const markSectionComplete = (sectionId) => {
    if (!completedSections.includes(sectionId)) {
      const updated = [...completedSections, sectionId];
      setCompletedSections(updated);
      savePreparationData();
    }
  };

  const toggleItemCheck = (itemId) => {
    const updated = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId]
    };
    setCheckedItems(updated);
    savePreparationData();
  };

  const renderOverview = () => (
    <ScrollView style={styles.sectionContainer}>
      <LinearGradient
        colors={['#10b981', '#059669']}
        style={styles.headerGradient}
      >
        <Text style={styles.heroTitle}>Session Preparation</Text>
        <Text style={styles.heroSubtitle}>
          Prepare your mind, body, and spirit for this healing journey
        </Text>
      </LinearGradient>

      <View style={styles.contentPadding}>
        <Text style={styles.sectionTitle}>🎯 Today's Session</Text>
        <Text style={styles.bodyText}>
          Each session is a unique opportunity for healing and growth. This preparation 
          helps you create the right mindset and gather what you need for a safe and meaningful experience.
        </Text>

        <View style={styles.sessionInfoBox}>
          <Text style={styles.sessionInfoTitle}>Session Information</Text>
          <Text style={styles.sessionInfoText}>Date: {sessionData?.journey_date || 'Today'}</Text>
          <Text style={styles.sessionInfoText}>Type: {sessionData?.sessionType || 'Treatment Session'}</Text>
          <Text style={styles.sessionInfoText}>Title: {sessionData?.title || 'Healing Session'}</Text>
        </View>

        <View style={styles.preparationFlow}>
          <Text style={styles.flowTitle}>📋 Preparation Steps</Text>
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
          ))}
        </View>

        <View style={styles.progressBox}>
          <Text style={styles.progressTitle}>
            Progress: {completedSections.length}/{preparationSections.length - 1} Complete
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(completedSections.length / (preparationSections.length - 1)) * 100}%` }
              ]} 
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setCurrentSection('intention_setting')}
        >
          <Text style={styles.startButtonText}>Begin Session Preparation</Text>
        </TouchableOpacity>

        {completedSections.length === preparationSections.length - 1 && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => {
              savePreparationData();
              Alert.alert(
                'Preparation Complete!',
                'You\'re ready for your session. Remember: Trust. Let go. Be open.',
                [
                  { 
                    text: 'Start Session Tools', 
                    onPress: () => navigation.navigate('SessionTools', { sessionId })
                  },
                  { 
                    text: 'Return to Session', 
                    onPress: () => navigation.goBack()
                  }
                ]
              );
            }}
          >
            <Text style={styles.completeButtonText}>Ready for Session ✨</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );

  const renderLearningModules = () => (
    <ScrollView style={styles.sectionContainer}>
      <LinearGradient colors={['#667eea', '#764ba2']} style={styles.headerGradient}>
        <Text style={styles.heroTitle}>📚 Quick Learning Refresher</Text>
        <Text style={styles.heroSubtitle}>
          Review foundational concepts before your session
        </Text>
      </LinearGradient>

      <View style={styles.contentPadding}>
        <Text style={styles.sectionTitle}>Foundation Review</Text>
        <Text style={styles.bodyText}>
          These quick modules refresh your understanding of nervous system states,
          internal parts work, and grounding techniques. Take what you need!
        </Text>

        {[
          {
            title: 'Nervous System Basics',
            emoji: '🧠',
            description: 'Understanding your three states: Ventral (safe), Sympathetic (fight/flight), Dorsal (freeze/shutdown)',
            topics: ['Window of Tolerance', 'Polyvagal Theory', 'Regulation vs Dysregulation'],
            time: '5 min'
          },
          {
            title: 'Parts Work (IFS)',
            emoji: '👥',
            description: 'Your inner family: Exiles (wounded), Managers (controllers), Firefighters (emergency response)',
            topics: ['Self-Leadership', 'Unburdening', 'Internal Compassion'],
            time: '7 min'
          },
          {
            title: 'Grounding & Somatic Practices',
            emoji: '🌱',
            description: 'Body-based regulation techniques you can use during your session',
            topics: ['5-4-3-2-1 Technique', 'Breath Work', 'Body Scanning', 'Safe Touch'],
            time: '8 min'
          }
        ].map((module, index) => (
          <View key={index} style={styles.moduleCard}>
            <Text style={styles.moduleEmoji}>{module.emoji}</Text>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription}>{module.description}</Text>

            <View style={styles.topicsContainer}>
              {module.topics.map((topic, i) => (
                <View key={i} style={styles.topicTag}>
                  <Text style={styles.topicText}>{topic}</Text>
                </View>
              ))}
            </View>

            <View style={styles.moduleMeta}>
              <Text style={styles.moduleTime}>⏱️ {module.time}</Text>
            </View>

            <TouchableOpacity
              style={styles.moduleButton}
              onPress={() => {
                navigation.navigate('GeneralPreparation');
              }}
            >
              <Text style={styles.moduleButtonText}>Review Module</Text>
              <MaterialIcons name="arrow-forward" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.optionalBox}>
          <Text style={styles.optionalTitle}>✨ Optional Step</Text>
          <Text style={styles.optionalText}>
            These modules are optional if you've already completed foundation learning.
            Feel free to skip to belief assessments!
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            markSectionComplete('learning_modules');
            setCurrentSection('belief_assessments');
          }}
        >
          <Text style={styles.continueButtonText}>Continue to Belief Assessments →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentSection('overview')}
        >
          <Text style={styles.backButtonText}>← Back to Overview</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderBeliefAssessments = () => (
    <ScrollView style={styles.sectionContainer}>
      <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.headerGradient}>
        <Text style={styles.heroTitle}>🔍 Belief Assessments</Text>
        <Text style={styles.heroSubtitle}>
          Understand your beliefs before your journey
        </Text>
      </LinearGradient>

      <View style={styles.contentPadding}>
        <Text style={styles.sectionTitle}>Pre-Journey Assessment</Text>
        <Text style={styles.bodyText}>
          These assessments help establish a baseline understanding of your beliefs,
          attachment patterns, and self-perception. You'll retake them after your
          journey to track transformation.
        </Text>

        {[
          {
            title: 'Core Beliefs Inventory',
            description: 'McKay & Fanning\'s 100-item assessment of 10 core belief domains',
            domains: 'Value • Security • Performance • Control • Love • Autonomy • Justice • Belonging • Trust • Standards',
            time: '10 min',
            items: 100
          },
          {
            title: 'Young Schema Questionnaire (Brief)',
            description: 'Early maladaptive schemas from childhood experiences',
            domains: 'Abandonment • Mistrust • Defectiveness • Failure • Dependence • Entitlement',
            time: '5 min',
            items: 24
          },
          {
            title: 'Self-Compassion Scale (Short)',
            description: 'How you treat yourself in times of difficulty',
            domains: 'Self-Kindness • Common Humanity • Mindfulness',
            time: '3 min',
            items: 12
          },
          {
            title: 'Attachment Style (ECR-S)',
            description: 'Your patterns in close relationships',
            domains: 'Anxiety • Avoidance',
            time: '3 min',
            items: 12
          },
          {
            title: 'Unconditional Self-Acceptance',
            description: 'Ability to accept yourself regardless of performance',
            domains: 'Self-Worth • Flexibility • Compassion',
            time: '4 min',
            items: 20
          }
        ].map((assessment, index) => (
          <View key={index} style={styles.assessmentCard}>
            <Text style={styles.assessmentTitle}>{assessment.title}</Text>
            <Text style={styles.assessmentDescription}>{assessment.description}</Text>
            <Text style={styles.assessmentDomains}>{assessment.domains}</Text>
            <View style={styles.assessmentMeta}>
              <Text style={styles.assessmentMetaText}>📊 {assessment.items} items</Text>
              <Text style={styles.assessmentMetaText}>⏱️ ~{assessment.time}</Text>
            </View>
            <TouchableOpacity
              style={styles.assessmentButton}
              onPress={() => {
                Alert.alert(
                  'Assessment Coming Soon',
                  `The ${assessment.title} will be available in the next update.`
                );
              }}
            >
              <Text style={styles.assessmentButtonText}>Start Assessment</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            markSectionComplete('belief_assessments');
            setCurrentSection('philosophical_explorations');
          }}
        >
          <Text style={styles.continueButtonText}>Continue to Philosophical Explorations →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentSection('overview')}
        >
          <Text style={styles.backButtonText}>← Back to Overview</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderPhilosophicalExplorations = () => (
    <ScrollView style={styles.sectionContainer}>
      <LinearGradient colors={['#10b981', '#059669']} style={styles.headerGradient}>
        <Text style={styles.heroTitle}>🤔 Philosophical Explorations</Text>
        <Text style={styles.heroSubtitle}>
          Contemplate the nature of self and identity
        </Text>
      </LinearGradient>

      <View style={styles.contentPadding}>
        <Text style={styles.sectionTitle}>Preparing for Ego Dissolution</Text>
        <Text style={styles.bodyText}>
          Psychedelic experiences often challenge our fundamental sense of self. These
          thought experiments help prepare your mind for these profound shifts in identity
          and continuity.
        </Text>

        {/* Ship of Theseus */}
        <View style={styles.philosophyCard}>
          <Text style={styles.philosophyEmoji}>⛵</Text>
          <Text style={styles.philosophyTitle}>The Ship of Theseus</Text>
          <Text style={styles.philosophyText}>
            Imagine a ship where, over time, every single plank and part is replaced.
            Is it still the same ship?
          </Text>
          <Text style={styles.philosophyText}>
            Now consider: your body replaces nearly all its cells every 7-10 years.
            Your thoughts, beliefs, and memories constantly change. Are you still the
            same person you were 10 years ago? What makes you "you"?
          </Text>
          <View style={styles.reflectionBox}>
            <Text style={styles.reflectionTitle}>💭 Reflect:</Text>
            <Text style={styles.reflectionText}>
              • What aspects of you have remained constant?{'\n'}
              • What has changed completely?{'\n'}
              • Is there a "true you" beneath the changes?{'\n'}
              • Or are you more like a river—constantly flowing, never the same twice?
            </Text>
          </View>
        </View>

        {/* Buddhist Anatman */}
        <View style={styles.philosophyCard}>
          <Text style={styles.philosophyEmoji}>☸️</Text>
          <Text style={styles.philosophyTitle}>Anatman (No-Self)</Text>
          <Text style={styles.philosophyText}>
            Buddhist philosophy teaches "anatman"—the concept that there is no permanent,
            unchanging self. Instead, what we call "I" is a collection of constantly
            changing processes: thoughts, feelings, sensations, perceptions.
          </Text>
          <Text style={styles.philosophyText}>
            Like a flame that appears continuous but is actually a constant process of
            fuel being consumed, we too are a process, not a fixed thing.
          </Text>
          <View style={styles.reflectionBox}>
            <Text style={styles.reflectionTitle}>💭 Contemplate:</Text>
            <Text style={styles.reflectionText}>
              • Can you find a permanent "self" when you look inside?{'\n'}
              • Or do you find thoughts, feelings, sensations—all changing?{'\n'}
              • What happens if you don't cling to any particular identity?{'\n'}
              • How does it feel to see yourself as a verb, not a noun—as "ing" not "is"?
            </Text>
          </View>
        </View>

        {/* The Mask and the Mirror */}
        <View style={styles.philosophyCard}>
          <Text style={styles.philosophyEmoji}>🎭</Text>
          <Text style={styles.philosophyTitle}>The Mask and the Mirror</Text>
          <Text style={styles.philosophyText}>
            You wear different "masks" in different contexts: parent, child, professional,
            friend, lover. Each feels genuinely "you" when you're wearing it.
          </Text>
          <Text style={styles.philosophyText}>
            During your journey, these masks may fall away. You might experience yourself
            as pure awareness—the mirror that reflects all roles but is not any of them.
          </Text>
          <View style={styles.reflectionBox}>
            <Text style={styles.reflectionTitle}>💭 Explore:</Text>
            <Text style={styles.reflectionText}>
              • Which "you" is the real you?{'\n'}
              • What remains when all roles are removed?{'\n'}
              • Is the "you" that observes your thoughts the same as the thoughts themselves?{'\n'}
              • Can you experience the awareness that contains all your identities?
            </Text>
          </View>
        </View>

        <View style={styles.integrationBox}>
          <Text style={styles.integrationTitle}>🌟 Integration Insight</Text>
          <Text style={styles.integrationText}>
            These thought experiments aren't meant to confuse you—they're meant to create
            mental flexibility. During your journey, if you experience ego dissolution or
            identity shifts, you'll have a framework for understanding what's happening.
            You're not losing yourself; you're discovering what you are beyond the stories
            you tell about yourself.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => {
            markSectionComplete('philosophical_explorations');
            setCurrentSection('intention_setting');
          }}
        >
          <Text style={styles.continueButtonText}>Continue to Intention Setting →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentSection('belief_assessments')}
        >
          <Text style={styles.backButtonText}>← Back to Assessments</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Render based on current section
  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'overview':
        return renderOverview();
      case 'intention_setting':
        return null; // Will implement in next part
      case 'nervous_system_checkin':
        return null; // Will implement in next part
      case 'parts_checkin':
        return null; // Will implement in next part
      case 'session_day_prep':
        return null; // Will implement in next part
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentSection()}
      
      {/* Modal will be added in next part */}
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
  sessionInfoBox: {
    backgroundColor: '#f0fdf4',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  sessionInfoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 12,
  },
  sessionInfoText: {
    fontSize: 15,
    color: '#065f46',
    marginBottom: 4,
  },
  preparationFlow: {
    marginBottom: 24,
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
  progressBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  startButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
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
  assessmentCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  assessmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  assessmentDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  assessmentDomains: {
    fontSize: 13,
    color: '#8b5cf6',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  assessmentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  assessmentMetaText: {
    fontSize: 13,
    color: '#9ca3af',
  },
  assessmentButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  assessmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  philosophyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  philosophyEmoji: {
    fontSize: 32,
    marginBottom: 12,
  },
  philosophyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  philosophyText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 12,
  },
  reflectionBox: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  reflectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#065f46',
    marginBottom: 8,
  },
  reflectionText: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 22,
  },
  integrationBox: {
    backgroundColor: '#fef3c7',
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  integrationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 12,
  },
  integrationText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 8,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1e3a8a',
    lineHeight: 20,
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  moduleEmoji: {
    fontSize: 28,
    marginBottom: 12,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  moduleDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  topicTag: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  topicText: {
    fontSize: 12,
    color: '#7c3aed',
    fontWeight: '500',
  },
  moduleMeta: {
    marginBottom: 12,
  },
  moduleTime: {
    fontSize: 13,
    color: '#9ca3af',
  },
  moduleButton: {
    backgroundColor: '#667eea',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 8,
  },
  optionalBox: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  optionalTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 8,
  },
  optionalText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 20,
  },
});

export default SessionPreparationScreen;