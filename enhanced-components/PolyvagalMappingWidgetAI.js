import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PolyvagalAIService } from '../lib/polyvagalAIService';

/**
 * AI-Enhanced Polyvagal Mapping Widget
 * Interactive tool to help users identify and map their nervous system states
 * Uses Claude API with offline fallback
 */
const PolyvagalMappingWidgetAI = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({
    sympathetic: {},
    dorsal: {},
    ventral: {}
  });
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [isAIMode, setIsAIMode] = useState(true);

  const scrollViewRef = useRef(null);
  const polyvagalService = useRef(new PolyvagalAIService()).current;

  const mappingSteps = [
    // Introduction
    {
      id: 'intro',
      type: 'info',
      title: 'Map Your Nervous System States',
      message: `This exercise helps you identify your three nervous system states:

💚 **Ventral Vagal** - Safe & Social (Calm, connected, engaged)
⚡ **Sympathetic** - Fight/Flight (Activated, anxious, energized)
🛡️ **Dorsal Vagal** - Shutdown (Numb, disconnected, withdrawn)

We'll explore what each state looks and feels like for YOU specifically, with AI guidance to help you notice patterns.`,
      buttonText: 'Begin Mapping'
    },

    // Sympathetic State Mapping
    {
      id: 'sympathetic_intro',
      type: 'info',
      title: '⚡ Fight/Flight State',
      message: `Let's start with your **Sympathetic** state - when you feel activated, anxious, or energized.

This is when your body mobilizes for action. It's protective, not bad!

Think of a recent time when you felt:
• Anxious or worried
• Heart racing
• Tense or restless
• Difficulty focusing
• Overwhelmed`,
      buttonText: 'Continue'
    },
    {
      id: 'sympathetic_memory',
      type: 'aiInput',
      state: 'sympathetic',
      key: 'memory',
      title: 'When does this happen?',
      prompt: 'Describe a situation when you feel this activation:',
      placeholder: 'e.g., Before presentations, in crowds, when running late...'
    },
    {
      id: 'sympathetic_body',
      type: 'aiInput',
      state: 'sympathetic',
      key: 'body',
      title: 'Body Sensations',
      prompt: 'What do you notice in your body during these moments?',
      placeholder: 'e.g., Racing heart, tense shoulders, shallow breathing...'
    },
    {
      id: 'sympathetic_thoughts',
      type: 'aiInput',
      state: 'sympathetic',
      key: 'thoughts',
      title: 'Thought Patterns',
      prompt: 'What kinds of thoughts run through your mind?',
      placeholder: 'e.g., "Something bad will happen", "I need to fix this now"...'
    },

    // Dorsal State Mapping
    {
      id: 'dorsal_intro',
      type: 'info',
      title: '🛡️ Shutdown State',
      message: `Now let's explore your **Dorsal Vagal** state - when you feel shutdown or disconnected.

This is when your body conserves energy by immobilizing. Also protective!

Think of times when you felt:
• Numb or disconnected
• Low energy or exhausted
• Hard to care about things
• Wanting to withdraw
• Foggy thinking`,
      buttonText: 'Continue'
    },
    {
      id: 'dorsal_memory',
      type: 'aiInput',
      state: 'dorsal',
      key: 'memory',
      title: 'When does this happen?',
      prompt: 'Describe a situation when you feel this shutdown:',
      placeholder: 'e.g., After conflict, when overwhelmed, during depression...'
    },
    {
      id: 'dorsal_body',
      type: 'aiInput',
      state: 'dorsal',
      key: 'body',
      title: 'Body Sensations',
      prompt: 'What do you notice in your body during these moments?',
      placeholder: 'e.g., Heavy limbs, tired, hard to move, everything feels slow...'
    },
    {
      id: 'dorsal_thoughts',
      type: 'aiInput',
      state: 'dorsal',
      key: 'thoughts',
      title: 'Thought Patterns',
      prompt: 'What kinds of thoughts run through your mind?',
      placeholder: "e.g., \"What's the point?\", \"I can't handle this\"..."
    },

    // Ventral State Mapping
    {
      id: 'ventral_intro',
      type: 'info',
      title: '💚 Safe & Social State',
      message: `Finally, let's explore your **Ventral Vagal** state - when you feel safe and connected.

This is your optimal state for connection, learning, and integration.

Think of times when you felt:
• Calm and present
• Connected to others
• Able to think clearly
• Curious and engaged
• Safe in your body`,
      buttonText: 'Continue'
    },
    {
      id: 'ventral_memory',
      type: 'aiInput',
      state: 'ventral',
      key: 'memory',
      title: 'When does this happen?',
      prompt: 'Describe a situation when you feel this safety and connection:',
      placeholder: 'e.g., In nature, with close friends, after yoga...'
    },
    {
      id: 'ventral_body',
      type: 'aiInput',
      state: 'ventral',
      key: 'body',
      title: 'Body Sensations',
      prompt: 'What do you notice in your body during these moments?',
      placeholder: 'e.g., Relaxed shoulders, deep breathing, warm chest...'
    },
    {
      id: 'ventral_thoughts',
      type: 'aiInput',
      state: 'ventral',
      key: 'thoughts',
      title: 'Thought Patterns',
      prompt: 'What kinds of thoughts run through your mind?',
      placeholder: 'e.g., "I\'m okay as I am", "Life has beauty"...'
    },

    // Summary
    {
      id: 'summary',
      type: 'summary',
      title: 'Your Nervous System Map',
      message: "Here's what you've discovered about your three states:"
    }
  ];

  useEffect(() => {
    if (scrollViewRef.current && aiMessages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [aiMessages, isTyping]);

  const handleNext = async () => {
    const step = mappingSteps[currentStep];

    if (step.type === 'aiInput') {
      if (!currentInput.trim()) {
        Alert.alert('Please enter a response', 'Take a moment to reflect and share what comes to mind.');
        return;
      }

      // Save the response
      setResponses(prev => ({
        ...prev,
        [step.state]: {
          ...prev[step.state],
          [step.key]: currentInput
        }
      }));

      // Get AI response
      setIsTyping(true);
      try {
        const aiResponse = await polyvagalService.sendMessage(
          currentInput,
          step.state,
          step.key
        );

        setIsTyping(false);
        setIsAIMode(aiResponse.isAI);

        // Add AI message
        setAiMessages(prev => [...prev, {
          text: aiResponse.response,
          isAI: aiResponse.isAI,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        // Save to service
        polyvagalService.saveResponse(step.state, step.key, currentInput);

      } catch (error) {
        setIsTyping(false);
        console.error('AI response error:', error);
      }

      setCurrentInput('');
    }

    if (currentStep < mappingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      // Clear AI messages when moving to new state section
      const nextStep = mappingSteps[currentStep + 1];
      if (nextStep.type === 'info') {
        setAiMessages([]);
      }
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);

      // Restore previous input if going back to an input step
      const prevStep = mappingSteps[currentStep - 1];
      if (prevStep.type === 'aiInput') {
        const savedResponse = responses[prevStep.state]?.[prevStep.key] || '';
        setCurrentInput(savedResponse);
      }
    }
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete({
        timestamp: new Date().toISOString(),
        responses,
        wasAIPowered: polyvagalService.isUsingAI()
      });
    }
  };

  const renderStep = () => {
    const step = mappingSteps[currentStep];

    if (step.type === 'info') {
      return (
        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.infoMessage}>{step.message}</Text>
        </View>
      );
    }

    if (step.type === 'aiInput') {
      const stateColor = getStateColor(step.state);

      return (
        <View style={styles.stepContainer}>
          <Text style={[styles.stepTitle, { color: stateColor }]}>
            {step.title}
          </Text>
          <Text style={styles.inputPrompt}>{step.prompt}</Text>

          {/* Show AI messages */}
          {aiMessages.map((msg, index) => (
            <View key={index} style={styles.aiMessageContainer}>
              <Text style={styles.aiMessageText}>{msg.text}</Text>
              <View style={styles.aiMessageFooter}>
                <Text style={styles.aiMessageTime}>{msg.timestamp}</Text>
                {msg.isAI && <Text style={styles.aiIndicator}>AI</Text>}
              </View>
            </View>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <View style={styles.typingDot} />
              <View style={[styles.typingDot, styles.typingDot2]} />
              <View style={[styles.typingDot, styles.typingDot3]} />
              <Text style={styles.typingText}>AI is responding...</Text>
            </View>
          )}

          <TextInput
            style={[styles.textInput, { borderColor: stateColor }]}
            value={currentInput}
            onChangeText={setCurrentInput}
            placeholder={step.placeholder}
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!isTyping}
          />
        </View>
      );
    }

    if (step.type === 'summary') {
      return (
        <ScrollView style={styles.summaryContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.summaryMessage}>{step.message}</Text>

          {/* Sympathetic Summary */}
          {responses.sympathetic.memory && (
            <View style={[styles.stateSummary, { borderLeftColor: '#ef4444' }]}>
              <Text style={styles.stateSummaryTitle}>⚡ Fight/Flight State</Text>
              <Text style={styles.stateSummaryText}>
                <Text style={styles.summaryLabel}>When: </Text>
                {responses.sympathetic.memory}
              </Text>
              {responses.sympathetic.body && (
                <Text style={styles.stateSummaryText}>
                  <Text style={styles.summaryLabel}>Body: </Text>
                  {responses.sympathetic.body}
                </Text>
              )}
              {responses.sympathetic.thoughts && (
                <Text style={styles.stateSummaryText}>
                  <Text style={styles.summaryLabel}>Thoughts: </Text>
                  {responses.sympathetic.thoughts}
                </Text>
              )}
            </View>
          )}

          {/* Dorsal Summary */}
          {responses.dorsal.memory && (
            <View style={[styles.stateSummary, { borderLeftColor: '#6366f1' }]}>
              <Text style={styles.stateSummaryTitle}>🛡️ Shutdown State</Text>
              <Text style={styles.stateSummaryText}>
                <Text style={styles.summaryLabel}>When: </Text>
                {responses.dorsal.memory}
              </Text>
              {responses.dorsal.body && (
                <Text style={styles.stateSummaryText}>
                  <Text style={styles.summaryLabel}>Body: </Text>
                  {responses.dorsal.body}
                </Text>
              )}
              {responses.dorsal.thoughts && (
                <Text style={styles.stateSummaryText}>
                  <Text style={styles.summaryLabel}>Thoughts: </Text>
                  {responses.dorsal.thoughts}
                </Text>
              )}
            </View>
          )}

          {/* Ventral Summary */}
          {responses.ventral.memory && (
            <View style={[styles.stateSummary, { borderLeftColor: '#10b981' }]}>
              <Text style={styles.stateSummaryTitle}>💚 Safe & Social State</Text>
              <Text style={styles.stateSummaryText}>
                <Text style={styles.summaryLabel}>When: </Text>
                {responses.ventral.memory}
              </Text>
              {responses.ventral.body && (
                <Text style={styles.stateSummaryText}>
                  <Text style={styles.summaryLabel}>Body: </Text>
                  {responses.ventral.body}
                </Text>
              )}
              {responses.ventral.thoughts && (
                <Text style={styles.stateSummaryText}>
                  <Text style={styles.summaryLabel}>Thoughts: </Text>
                  {responses.ventral.thoughts}
                </Text>
              )}
            </View>
          )}

          <View style={styles.keyTakeaway}>
            <Text style={styles.keyTakeawayTitle}>🎯 Remember</Text>
            <Text style={styles.keyTakeawayText}>
              All three states are normal and protective. The key is recognizing which state you're in so you can respond with compassion and choose practices that help you shift when needed.
            </Text>
          </View>
        </ScrollView>
      );
    }
  };

  const getStateColor = (state) => {
    switch (state) {
      case 'sympathetic': return '#ef4444';
      case 'dorsal': return '#6366f1';
      case 'ventral': return '#10b981';
      default: return '#3b82f6';
    }
  };

  const step = mappingSteps[currentStep];
  const isLastStep = currentStep === mappingSteps.length - 1;
  const progress = ((currentStep + 1) / mappingSteps.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipButton}>← Back to Education</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Polyvagal Mapping</Text>
          {!polyvagalService.isUsingAI() && (
            <Text style={styles.offlineIndicator}>Offline Mode</Text>
          )}
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>
        Step {currentStep + 1} of {mappingSteps.length}
      </Text>

      {/* Content */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {renderStep()}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentStep === 0 || isTyping}
          style={[
            styles.navButton,
            styles.backButton,
            (currentStep === 0 || isTyping) && styles.navButtonDisabled
          ]}
        >
          <Text style={[
            styles.navButtonText,
            (currentStep === 0 || isTyping) && styles.navButtonTextDisabled
          ]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={isTyping}
          style={[styles.navButton, styles.nextButton, isTyping && styles.navButtonDisabled]}
        >
          {isTyping ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.nextButtonText}>
              {isLastStep ? 'Complete ✓' : step.type === 'info' ? step.buttonText || 'Next' : 'Next →'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  skipButton: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 8,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  offlineIndicator: {
    fontSize: 11,
    color: '#f59e0b',
    marginTop: 2,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 32,
  },
  stepContainer: {
    gap: 20,
  },
  summaryContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  infoMessage: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 26,
  },
  inputPrompt: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
  },
  aiMessageContainer: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  aiMessageText: {
    fontSize: 15,
    color: '#1e40af',
    lineHeight: 22,
  },
  aiMessageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  aiMessageTime: {
    fontSize: 11,
    color: '#60a5fa',
  },
  aiIndicator: {
    fontSize: 10,
    color: '#1e40af',
    fontWeight: '600',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3b82f6',
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 0.4,
  },
  typingText: {
    fontSize: 13,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 120,
    backgroundColor: '#f9fafb',
  },
  summaryMessage: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  stateSummary: {
    backgroundColor: '#f9fafb',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  stateSummaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  stateSummaryText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
  },
  summaryLabel: {
    fontWeight: '600',
    color: '#1f2937',
  },
  keyTakeaway: {
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  keyTakeawayTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 12,
  },
  keyTakeawayText: {
    fontSize: 15,
    color: '#1e40af',
    lineHeight: 22,
  },
  navigationContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#f3f4f6',
  },
  nextButton: {
    backgroundColor: '#3b82f6',
  },
  navButtonDisabled: {
    backgroundColor: '#e5e7eb',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  navButtonTextDisabled: {
    color: '#9ca3af',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default PolyvagalMappingWidgetAI;
