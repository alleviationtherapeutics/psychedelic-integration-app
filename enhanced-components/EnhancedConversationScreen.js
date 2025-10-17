import React, { useState, useEffect, useRef } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { 
  Heart, 
  Brain, 
  Send, 
  Pause, 
  Play, 
  CheckCircle, 
  AlertCircle,
  MessageCircle,
  Activity,
  Zap,
  Shield
} from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import IntegrationGuideService from '../lib/enhancedClaudeService';
import EmbeddedPracticeWidget from './EmbeddedPracticeWidget';
import NervousSystemIndicator from './NervousSystemIndicator';
import MessageBubble from './MessageBubble';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const EnhancedConversationScreen = ({ navigation, route }) => {
  const { session } = route.params;
  
  // Core conversation state
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [entities, setEntities] = useState([]);
  
  // Enhanced features state
  const [currentPractice, setCurrentPractice] = useState(null);
  const [nervousSystemState, setNervousSystemState] = useState('unknown');
  const [stateConfidence, setStateConfidence] = useState(0);
  const [sessionPhase, setSessionPhase] = useState('check_in'); // check_in, exploration, integration, closure
  
  // Session tracking
  const [sessionStartTime] = useState(Date.now());
  const [practicesCompleted, setPracticesCompleted] = useState([]);
  const [regulationInterventions, setRegulationInterventions] = useState(0);
  
  // Refs and animations
  const scrollViewRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  // Enhanced Claude service with practice integration
  const integrationGuide = useRef(new IntegrationGuideService()).current;

  // Initialize conversation
  useEffect(() => {
    initializeConversation();
    startHeartbeatAnimation();
  }, []);

  const startHeartbeatAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const initializeConversation = async () => {
    try {
      // Load existing messages
      await loadMessages();
      
      // Start with nervous system check-in if new session
      if (messages.length === 0) {
        setTimeout(() => {
          initiateNervousSystemCheckIn();
        }, 1000);
      }
    } catch (error) {
      console.error('Error initializing conversation:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('session_data')
        .eq('id', session.id)
        .single();

      if (error) throw error;

      const sessionData = data?.session_data || {};
      const loadedMessages = sessionData.messages || [];
      const loadedEntities = sessionData.entities || [];
      const loadedState = sessionData.nervousSystemState || 'unknown';
      
      setMessages(loadedMessages);
      setEntities(loadedEntities);
      setNervousSystemState(loadedState);
      
      // Initialize Claude with context
      integrationGuide.initializeSession({
        sessionId: session.id,
        messages: loadedMessages,
        entities: loadedEntities,
        nervousSystemState: loadedState,
        sessionPhase: sessionData.sessionPhase || 'check_in'
      });
      
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessages = async (newMessages, additionalData = {}) => {
    try {
      const sessionData = {
        messages: newMessages,
        entities: entities,
        nervousSystemState: nervousSystemState,
        sessionPhase: sessionPhase,
        practicesCompleted: practicesCompleted,
        regulationInterventions: regulationInterventions,
        lastUpdated: new Date().toISOString(),
        ...additionalData
      };

      const { error } = await supabase
        .from('sessions')
        .update({ 
          session_data: sessionData,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  };

  const initiateNervousSystemCheckIn = () => {
    const checkInMessage = {
      role: 'assistant',
      content: `Welcome! I'm so glad you're here. Before we dive into your experience, I'd love to check in with your nervous system. This helps me understand how to best support you right now.

How is your body feeling in this moment?`,
      timestamp: new Date(),
      requiresPractice: {
        type: 'polyvagal_assessment',
        priority: 'high',
        reason: 'session_initialization'
      }
    };

    setMessages([checkInMessage]);
    
    // Automatically show practice widget
    setCurrentPractice({
      type: 'polyvagal_assessment',
      title: "Let's check in with your nervous system",
      description: "This helps me understand how to best support you",
      onComplete: handleNervousSystemAssessment
    });
  };

  const handleNervousSystemAssessment = async (assessmentResult) => {
    const { state, intensity, notes } = assessmentResult;
    
    setNervousSystemState(state);
    setStateConfidence(intensity / 10);
    setCurrentPractice(null);
    
    // Update regulation interventions if needed
    if (state === 'sympathetic' && intensity > 6) {
      setRegulationInterventions(prev => prev + 1);
    }
    
    // Generate Claude response based on assessment
    const contextualResponse = await integrationGuide.respondToNervousSystemCheck({
      state,
      intensity,
      notes,
      sessionPhase: 'check_in'
    });
    
    const responseMessage = {
      role: 'assistant',
      content: contextualResponse.message,
      timestamp: new Date(),
      nervousSystemContext: { state, intensity, notes },
      requiresPractice: contextualResponse.suggestedPractice
    };
    
    const updatedMessages = [...messages, responseMessage];
    setMessages(updatedMessages);
    
    // Auto-suggest regulation if needed
    if (contextualResponse.suggestedPractice) {
      setTimeout(() => {
        setCurrentPractice(contextualResponse.suggestedPractice);
      }, 2000);
    }
    
    await saveMessages(updatedMessages, { 
      nervousSystemState: state,
      stateConfidence: intensity / 10 
    });
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: userInput.trim(),
      timestamp: new Date(),
      nervousSystemState: nervousSystemState
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      // Get enhanced Claude response with practice recommendations
      const response = await integrationGuide.continueConversation(
        userInput.trim(),
        {
          messages: newMessages,
          entities: entities,
          nervousSystemState: nervousSystemState,
          stateConfidence: stateConfidence,
          sessionPhase: sessionPhase,
          practicesCompleted: practicesCompleted
        }
      );

      const assistantMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        entities: response.extractedEntities || [],
        requiresPractice: response.suggestedPractice,
        nervousSystemUpdate: response.nervousSystemUpdate
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

      // Update entities if new ones were extracted
      if (response.extractedEntities && response.extractedEntities.length > 0) {
        const updatedEntities = [...entities, ...response.extractedEntities];
        setEntities(updatedEntities);
      }

      // Update nervous system state if changed
      if (response.nervousSystemUpdate) {
        setNervousSystemState(response.nervousSystemUpdate.state);
        setStateConfidence(response.nervousSystemUpdate.confidence);
      }

      // Show practice if recommended
      if (response.suggestedPractice) {
        setTimeout(() => {
          setCurrentPractice({
            ...response.suggestedPractice,
            onComplete: handlePracticeComplete
          });
        }, 1500);
      }

      await saveMessages(updatedMessages);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback message
      const errorMessage = {
        role: 'assistant',
        content: "I'm here with you. Take a moment to breathe. Would you like to try sharing that again?",
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePracticeComplete = async (practiceResult) => {
    const { practiceType, outcome, duration, effectiveness } = practiceResult;
    
    // Record completed practice
    const completedPractice = {
      type: practiceType,
      completedAt: new Date().toISOString(),
      duration: duration,
      effectiveness: effectiveness,
      outcome: outcome
    };
    
    setPracticesCompleted(prev => [...prev, completedPractice]);
    setCurrentPractice(null);

    // Generate follow-up response from Claude
    const followUpResponse = await integrationGuide.respondToPracticeCompletion({
      practice: completedPractice,
      currentState: nervousSystemState,
      sessionContext: { messages, entities, sessionPhase }
    });

    const followUpMessage = {
      role: 'assistant',
      content: followUpResponse.message,
      timestamp: new Date(),
      practiceFollowUp: true,
      requiresPractice: followUpResponse.suggestedPractice
    };

    const updatedMessages = [...messages, followUpMessage];
    setMessages(updatedMessages);
    
    await saveMessages(updatedMessages, { 
      practicesCompleted: [...practicesCompleted, completedPractice] 
    });
  };

  const handlePracticeSkip = () => {
    setCurrentPractice(null);
    
    const skipMessage = {
      role: 'assistant',
      content: "That's completely okay. You know what feels right for you. Let's continue our conversation.",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, skipMessage]);
  };

  const renderNervousSystemHeader = () => {
    const getStateColor = () => {
      switch (nervousSystemState) {
        case 'ventral': return '#10b981';
        case 'sympathetic': return '#ef4444';
        case 'dorsal': return '#6366f1';
        default: return '#6b7280';
      }
    };

    const getStateIcon = () => {
      switch (nervousSystemState) {
        case 'ventral': return <Heart size={16} color="#10b981" />;
        case 'sympathetic': return <Zap size={16} color="#ef4444" />;
        case 'dorsal': return <Shield size={16} color="#6366f1" />;
        default: return <Brain size={16} color="#6b7280" />;
      }
    };

    const getStateLabel = () => {
      switch (nervousSystemState) {
        case 'ventral': return 'Safe & Social';
        case 'sympathetic': return 'Activated';
        case 'dorsal': return 'Protected';
        default: return 'Checking in...';
      }
    };

    return (
      <View style={styles.nervousSystemHeader}>
        <View style={styles.nervousSystemIndicator}>
          <Animated.View 
            style={[
              styles.stateIcon,
              { transform: [{ scale: pulseAnim }] }
            ]}
          >
            {getStateIcon()}
          </Animated.View>
          <Text style={[styles.stateLabel, { color: getStateColor() }]}>
            {getStateLabel()}
          </Text>
        </View>
        
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionPhaseText}>
            {sessionPhase === 'check_in' && 'Getting oriented'}
            {sessionPhase === 'exploration' && 'Exploring experience'}
            {sessionPhase === 'integration' && 'Finding meaning'}
            {sessionPhase === 'closure' && 'Wrapping up'}
          </Text>
          <Text style={styles.practiceCount}>
            {practicesCompleted.length} practices completed
          </Text>
        </View>
      </View>
    );
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <MessageBubble
        key={index}
        message={message}
        entities={message.entities || []}
        nervousSystemState={nervousSystemState}
        onEntityPress={(entity) => {
          // Show entity detail modal
          console.log('Entity pressed:', entity);
        }}
      />
    ));
  };

  const renderInput = () => {
    if (currentPractice) {
      return (
        <View style={styles.practiceIndicator}>
          <Activity size={16} color="#3b82f6" />
          <Text style={styles.practiceIndicatorText}>
            Practice in progress: {currentPractice.title}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={userInput}
          onChangeText={setUserInput}
          placeholder={
            nervousSystemState === 'sympathetic' 
              ? "Take your time... what's present for you?"
              : nervousSystemState === 'dorsal'
              ? "No pressure... share whatever feels safe"
              : "What would you like to explore?"
          }
          multiline
          maxLength={1000}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (!userInput.trim() || isLoading) && styles.sendButtonDisabled
          ]}
          onPress={handleSendMessage}
          disabled={!userInput.trim() || isLoading}
        >
          {isLoading ? (
            <Activity size={20} color="#ffffff" />
          ) : (
            <Send size={20} color="#ffffff" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderNervousSystemHeader()}
      
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => 
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {renderMessages()}
        
        {isLoading && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Claude is thinking...</Text>
            <Activity size={16} color="#3b82f6" />
          </View>
        )}
      </ScrollView>

      {renderInput()}

      {/* Embedded Practice Widget */}
      {currentPractice && (
        <EmbeddedPracticeWidget
          practice={currentPractice}
          nervousSystemState={nervousSystemState}
          onComplete={handlePracticeComplete}
          onSkip={handlePracticeSkip}
        />
      )}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  nervousSystemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  nervousSystemIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stateIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stateLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  sessionInfo: {
    alignItems: 'flex-end',
  },
  sessionPhaseText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  practiceCount: {
    fontSize: 11,
    color: '#9ca3af',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 24,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  typingText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 120,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  practiceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderTopWidth: 1,
    borderTopColor: '#dbeafe',
  },
  practiceIndicatorText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
};

export default EnhancedConversationScreen;