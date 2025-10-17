import { ANTHROPIC_API_KEY } from '@env';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

/**
 * IFS AI Service
 * Uses Claude API for IFS-guided parts work with offline fallback
 */
export class IFSAIService {
  constructor() {
    this.conversationHistory = [];
    this.currentPhase = 'intro';
    this.sessionData = {
      targetPart: '',
      location: '',
      description: '',
      partRole: '',
      selfEnergy: '',
      partFears: '',
      partResponse: ''
    };
    this.isOnline = true;
  }

  getSystemPrompt() {
    return `You are an expert IFS (Internal Family Systems) therapist guiding someone through the Six F's framework to get to know one of their parts.

YOUR ROLE:
- Guide the user gently and compassionately through the Six F's
- Use the 8 C's of Self (Calm, Clarity, Compassion, Confidence, Courage, Creativity, Curiosity, Connectedness)
- Recognize when protective parts are blended
- Help the user access Self energy
- Build trust with the target part

THE SIX F'S FRAMEWORK:
1. **FIND** - Help identify which part to work with
2. **FOCUS** - Guide attention to where/how the part shows up
3. **FLESH OUT** - Learn the part's story, role, and function
4. **FEEL TOWARD** - Check for Self energy (critical checkpoint!)
5. **BEFRIEND** - Build connection and trust
6. **FEARS** - Understand and address the part's concerns

IFS PRINCIPLES:
- All parts have positive intentions
- No part is "bad" - they're all trying to protect
- Self-led healing (the user's Self does the work)
- Permission-based (respect protective parts)
- Non-pathologizing language
- The goal is relationship, not fixing

DETECTING SELF ENERGY vs BLENDING:
- **Self Energy**: curious, compassionate, calm, open, interested, caring, patient, accepting
- **Blended/Protective**: annoyed, frustrated, critical, angry, scared, worried, overwhelmed, judgmental, wanting to fix/change

If the user is blended, gently help them unblend:
- Acknowledge the protective part
- Ask if it would be willing to step back a little
- Invite curiosity about why the target part does what it does
- Wait for Self energy before proceeding

RESPONSE STYLE:
- Keep responses warm, brief, and conversational (2-4 sentences typically)
- Ask one question at a time
- Reflect back what you hear
- Use IFS language: "part", "Self", "protector", "exile"
- Be trauma-informed and gentle
- Match the user's pace - don't rush

CURRENT PHASE GUIDANCE:
When in FIND phase: Help identify a part that's active or wants attention
When in FOCUS phase: Guide to bodily location and sensory experience
When in FLESH OUT phase: Ask about role, job, what it does for them
When in FEEL TOWARD phase: **Critical** - Check for Self energy with "How do you feel toward this part?"
When unblending: Help protective parts step back with appreciation
When in BEFRIEND phase: Guide extending Self energy and building trust
When in FEARS phase: Explore what the part is afraid would happen

Remember: You're facilitating the user's connection with their own parts, not analyzing or interpreting for them.`;
  }

  async sendMessage(userMessage, currentPhase) {
    this.currentPhase = currentPhase;

    try {
      // Try AI first
      const aiResponse = await this.getAIResponse(userMessage);
      this.isOnline = true;
      return {
        response: aiResponse,
        isAI: true,
        phase: currentPhase
      };
    } catch (error) {
      console.log('AI unavailable, using fallback:', error.message);
      this.isOnline = false;

      // Use rule-based fallback
      const fallbackResponse = this.getFallbackResponse(userMessage, currentPhase);
      return {
        response: fallbackResponse,
        isAI: false,
        phase: currentPhase
      };
    }
  }

  async getAIResponse(userMessage) {
    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    const messages = [...this.conversationHistory];

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 500,
        system: this.getSystemPrompt() + `\n\nCurrent Phase: ${this.currentPhase}`,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    // Add assistant response to history
    this.conversationHistory.push({
      role: 'assistant',
      content: assistantMessage
    });

    return assistantMessage;
  }

  getFallbackResponse(userMessage, phase) {
    const lowerMessage = userMessage.toLowerCase();

    // Store responses for offline mode
    const fallbackResponses = {
      find: {
        default: "Thank you for identifying that part. Let's get to know it together. Where do you notice this part in or around your body?",
        patterns: [
          { keywords: ['anxious', 'worry', 'stress'], response: "I hear you noticing an anxious part. That makes sense - anxiety is such a common protector. Where do you feel this anxious part in your body?" },
          { keywords: ['critic', 'judge', 'critical'], response: "The inner critic is a powerful manager part. It's trying to keep you safe by controlling how you show up. Where do you sense this critical part?" },
          { keywords: ['sad', 'grief', 'hurt'], response: "Thank you for bringing attention to this sad part. Sadness often carries important wisdom. Where do you notice this sadness in your body?" }
        ]
      },

      findLocation: {
        default: "Good. You notice it there. Now, as you bring your attention to that place, what do you notice? Are there any images, sensations, colors, or feelings that come up?"
      },

      focus: {
        default: "Thank you for staying present with what you're experiencing. This kind of attention is valuable. Now, ask this part: What is its job or role? What is it trying to do for you?"
      },

      fleshOut: {
        default: "That's really valuable information about this part's role. Now this is an important question: As you focus on this part, how do you feel toward it?"
      },

      feelToward: {
        selfEnergy: "Beautiful - I hear curiosity and openness in your words. That's your Self energy. Now, let this part know that you'd like to get to know it. You appreciate how hard it's been working. How does the part respond to your interest?",
        blended: "I notice some protective energy there - that's another part stepping in. Would you be willing to ask that protective part if it could step back a little, so you can get to know this other part from curiosity?",
        default: "Thank you for sharing that. Let's continue building this relationship. Would you like to extend some appreciation to this part for what it does for you?"
      },

      unblend: {
        default: "Take a few deep breaths. Sometimes it helps to imagine that protective part taking one step back, like it's giving you some space. See if you can find even a little bit of curiosity about why the original part does what it does.",
        success: "Good. I sense more openness now. Let's continue from this place of curiosity."
      },

      befriend: {
        default: "Wonderful. You're building trust with this part. Now ask the part: What are you afraid would happen if you stopped doing this job? What's your biggest fear or worry?"
      },

      fears: {
        default: "Thank you for listening to this part's fears. They're valid and make sense. This part has been protecting you from something it believes is dangerous. You can let it know you understand its concerns and appreciate its hard work."
      }
    };

    // Get response based on phase
    const phaseResponses = fallbackResponses[phase];

    if (!phaseResponses) {
      return "I'm here with you. What would you like to explore?";
    }

    // Check for Self energy vs blended in feelToward phase
    if (phase === 'feelToward') {
      const selfQualities = ['curious', 'compassion', 'calm', 'open', 'interested', 'caring', 'warm', 'accepting', 'patient'];
      const blendedQualities = ['annoyed', 'frustrated', 'critical', 'angry', 'scared', 'worried', 'overwhelmed', 'judgmental', 'irritated'];

      const hasSelfEnergy = selfQualities.some(quality => lowerMessage.includes(quality));
      const isBlended = blendedQualities.some(quality => lowerMessage.includes(quality));

      if (hasSelfEnergy) {
        return phaseResponses.selfEnergy;
      } else if (isBlended) {
        return phaseResponses.blended;
      }
      return phaseResponses.default;
    }

    // Check for pattern matches
    if (phaseResponses.patterns) {
      for (const pattern of phaseResponses.patterns) {
        if (pattern.keywords.some(keyword => lowerMessage.includes(keyword))) {
          return pattern.response;
        }
      }
    }

    return phaseResponses.default;
  }

  updateSessionData(key, value) {
    this.sessionData[key] = value;
  }

  getSessionData() {
    return this.sessionData;
  }

  reset() {
    this.conversationHistory = [];
    this.currentPhase = 'intro';
    this.sessionData = {
      targetPart: '',
      location: '',
      description: '',
      partRole: '',
      selfEnergy: '',
      partFears: '',
      partResponse: ''
    };
  }

  isUsingAI() {
    return this.isOnline;
  }
}

export default new IFSAIService();
