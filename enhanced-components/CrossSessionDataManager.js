/**
 * Cross-Session Data Manager
 * Handles data sharing between Experience Mapping and Therapeutic Integration modes
 */

class CrossSessionDataManager {
  constructor() {
    this.sessionId = null;
    this.fullSessionData = {};
  }

  async loadFullSessionData(sessionId, supabase = null) {
    this.sessionId = sessionId;
    
    try {
      // Handle temporary/offline sessions
      if (sessionId && sessionId.startsWith('temp_')) {
        console.log('Loading temporary session - using passed data');
        return this.fullSessionData; // Will be set by navigation
      }
      
      // Load from database
      if (supabase) {
        const { data, error } = await supabase
          .from('sessions')
          .select('session_data')
          .eq('id', sessionId)
          .single();

        if (error) throw error;
        
        this.fullSessionData = data?.session_data || {};
        console.log('✅ Loaded full session data:', {
          sessionId,
          hasExperienceData: !!(this.fullSessionData.experienceMessages || this.fullSessionData.experienceData),
          hasTherapeuticData: !!(this.fullSessionData.therapeuticMessages || this.fullSessionData.nervousSystemState),
          totalKeys: Object.keys(this.fullSessionData).length
        });
      }
      
      return this.fullSessionData;
      
    } catch (error) {
      console.error('Error loading full session data:', error);
      return {};
    }
  }

  setSessionData(sessionData) {
    this.fullSessionData = sessionData;
  }

  // Get experience mapping specific data
  getExperienceMappingData() {
    return {
      messages: this.fullSessionData.experienceMessages || this.fullSessionData.messages || [],
      entities: this.fullSessionData.experienceEntities || this.fullSessionData.entities || [],
      experienceData: this.fullSessionData.experienceData || {
        associations: [],
        dynamics: [],
        integrations: [],
        rituals: [],
        currentPhase: 1
      }
    };
  }

  // Get therapeutic integration specific data  
  getTherapeuticIntegrationData() {
    return {
      messages: this.fullSessionData.therapeuticMessages || this.fullSessionData.messages || [],
      entities: this.fullSessionData.therapeuticEntities || this.fullSessionData.entities || [],
      nervousSystemState: this.fullSessionData.nervousSystemState || 'unknown',
      stateConfidence: this.fullSessionData.stateConfidence || 0,
      practicesCompleted: this.fullSessionData.practicesCompleted || [],
      interventionsFocused: this.fullSessionData.interventionsFocused || [],
      regulationInterventions: this.fullSessionData.regulationInterventions || 0,
      lastNervousSystemCheck: this.fullSessionData.lastNervousSystemCheck || null
    };
  }

  // Get cross-referenced data for experience mapping (includes therapeutic context)
  getExperienceContextWithTherapeuticData() {
    const experienceData = this.getExperienceMappingData();
    const therapeuticData = this.getTherapeuticIntegrationData();
    
    return {
      ...experienceData,
      // Cross-reference context
      therapeuticInsights: {
        nervousSystemPatterns: therapeuticData.nervousSystemState,
        completedPractices: therapeuticData.practicesCompleted,
        identifiedThemes: therapeuticData.interventionsFocused,
        therapeuticEntities: therapeuticData.entities
      },
      hasTherapeuticHistory: therapeuticData.messages.length > 0
    };
  }

  // Get cross-referenced data for therapeutic integration (includes experience context)
  getTherapeuticContextWithExperienceData() {
    const therapeuticData = this.getTherapeuticIntegrationData();
    const experienceData = this.getExperienceMappingData();
    
    return {
      ...therapeuticData,
      // Cross-reference context
      experienceInsights: {
        processingPhase: experienceData.experienceData.currentPhase,
        documentedAssociations: experienceData.experienceData.associations,
        mappedDynamics: experienceData.experienceData.dynamics,
        foundMeanings: experienceData.experienceData.integrations,
        experienceEntities: experienceData.entities
      },
      hasExperienceHistory: experienceData.messages.length > 0
    };
  }

  // Save data for experience mapping mode
  async saveExperienceMappingData(newMessages, entities, experienceData, additionalData = {}, supabase = null) {
    try {
      const updatedSessionData = {\n        ...this.fullSessionData, // Preserve all existing data\n        // Update experience mapping specific data\n        experienceMessages: newMessages,\n        experienceEntities: entities,\n        experienceData: experienceData,\n        // Update metadata\n        lastUpdated: new Date().toISOString(),\n        lastMode: 'experience_mapping',\n        sessionType: this.fullSessionData.sessionType || 'experience',\n        ...additionalData\n      };\n\n      this.fullSessionData = updatedSessionData;\n\n      // Save to database if not temporary session\n      if (this.sessionId && !this.sessionId.startsWith('temp_') && supabase) {\n        const { error } = await supabase\n          .from('sessions')\n          .update({ session_data: updatedSessionData })\n          .eq('id', this.sessionId);\n\n        if (error) {\n          console.error('Failed to save experience mapping data:', error);\n          throw error;\n        }\n\n        console.log('✅ Experience mapping data saved successfully');\n      }\n\n      return updatedSessionData;\n      \n    } catch (error) {\n      console.error('Error saving experience mapping data:', error);\n      throw error;\n    }\n  }\n\n  // Save data for therapeutic integration mode\n  async saveTherapeuticIntegrationData(newMessages, entities, therapeuticData, additionalData = {}, supabase = null) {\n    try {\n      const updatedSessionData = {\n        ...this.fullSessionData, // Preserve all existing data\n        // Update therapeutic integration specific data\n        therapeuticMessages: newMessages,\n        therapeuticEntities: entities,\n        nervousSystemState: therapeuticData.nervousSystemState,\n        stateConfidence: therapeuticData.stateConfidence,\n        practicesCompleted: therapeuticData.practicesCompleted,\n        interventionsFocused: therapeuticData.interventionsFocused,\n        regulationInterventions: therapeuticData.regulationInterventions,\n        lastNervousSystemCheck: therapeuticData.lastNervousSystemCheck,\n        // Update metadata\n        lastUpdated: new Date().toISOString(),\n        lastMode: 'therapeutic_integration',\n        sessionType: this.fullSessionData.sessionType || 'integration',\n        ...additionalData\n      };\n\n      this.fullSessionData = updatedSessionData;\n\n      // Save to database if not temporary session\n      if (this.sessionId && !this.sessionId.startsWith('temp_') && supabase) {\n        const { error } = await supabase\n          .from('sessions')\n          .update({ session_data: updatedSessionData })\n          .eq('id', this.sessionId);\n\n        if (error) {\n          console.error('Failed to save therapeutic integration data:', error);\n          throw error;\n        }\n\n        console.log('✅ Therapeutic integration data saved successfully');\n      }\n\n      return updatedSessionData;\n      \n    } catch (error) {\n      console.error('Error saving therapeutic integration data:', error);\n      throw error;\n    }\n  }\n\n  // Check if nervous system assessment is needed\n  shouldShowNervousSystemCheck() {\n    const lastCheck = this.fullSessionData.lastNervousSystemCheck;\n    const currentMessages = this.fullSessionData.therapeuticMessages || this.fullSessionData.messages || [];\n    \n    // Don't show if checked in last 10 minutes\n    if (lastCheck) {\n      const lastCheckTime = new Date(lastCheck);\n      const now = new Date();\n      const timeDiff = (now - lastCheckTime) / (1000 * 60); // minutes\n      \n      if (timeDiff < 10) {\n        console.log('⏰ Nervous system check not needed - checked', Math.round(timeDiff), 'minutes ago');\n        return false;\n      }\n    }\n    \n    // Don't show if no messages yet (will be shown in intro)\n    if (currentMessages.length === 0) {\n      console.log('📝 Nervous system check will be in intro message');\n      return false;\n    }\n    \n    // Show if never checked or it's been a while\n    console.log('🧠 Nervous system check needed');\n    return true;\n  }\n\n  // Mark nervous system check as completed\n  markNervousSystemCheckCompleted() {\n    this.fullSessionData.lastNervousSystemCheck = new Date().toISOString();\n  }\n\n  // Get summary of all session activity for AI context\n  getFullSessionSummary() {\n    const experienceData = this.getExperienceMappingData();\n    const therapeuticData = this.getTherapeuticIntegrationData();\n    \n    return {\n      sessionOverview: {\n        totalExperienceMessages: experienceData.messages.length,\n        totalTherapeuticMessages: therapeuticData.messages.length,\n        processingPhase: experienceData.experienceData.currentPhase,\n        nervousSystemState: therapeuticData.nervousSystemState,\n        practicesCompleted: therapeuticData.practicesCompleted.length,\n        lastUpdated: this.fullSessionData.lastUpdated,\n        lastMode: this.fullSessionData.lastMode\n      },\n      allEntities: [\n        ...experienceData.entities.map(e => ({...e, source: 'experience'})),\n        ...therapeuticData.entities.map(e => ({...e, source: 'therapeutic'}))\n      ],\n      crossModeInsights: {\n        hasWorkInBothModes: experienceData.messages.length > 0 && therapeuticData.messages.length > 0,\n        dominantMode: experienceData.messages.length > therapeuticData.messages.length ? 'experience' : 'therapeutic'\n      }\n    };\n  }\n\n  // Get recent activity from both modes for context\n  getRecentCrossSessionActivity(messageCount = 3) {\n    const experienceData = this.getExperienceMappingData();\n    const therapeuticData = this.getTherapeuticIntegrationData();\n    \n    const recentExperience = experienceData.messages.slice(-messageCount);\n    const recentTherapeutic = therapeuticData.messages.slice(-messageCount);\n    \n    return {\n      recentExperience,\n      recentTherapeutic,\n      hasRecentActivityInOtherMode: {\n        experience: recentTherapeutic.length > 0,\n        therapeutic: recentExperience.length > 0\n      }\n    };\n  }\n}\n\nexport default CrossSessionDataManager;"
