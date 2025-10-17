import { supabase } from '../lib/supabase';

class ScenarioTrainingSystem {
  constructor() {
    this.scenarios = [];
    this.responsePatterns = new Map();
  }

  // Upload and process scenario files
  async uploadScenarios(scenarioData) {
    try {
      // Parse scenarios from uploaded JSON/text
      const parsedScenarios = this.parseScenarioData(scenarioData);
      
      // Store in database
      const { data, error } = await supabase
        .from('training_scenarios')
        .insert(parsedScenarios);
      
      if (error) throw error;
      
      // Update local cache
      await this.loadScenarios();
      
      return { success: true, count: parsedScenarios.length };
    } catch (error) {
      console.error('Error uploading scenarios:', error);
      return { success: false, error: error.message };
    }
  }

  // Parse different scenario formats
  parseScenarioData(data) {
    // Handle JSON format
    if (typeof data === 'object') {
      return this.parseJSONScenarios(data);
    }
    
    // Handle text format
    if (typeof data === 'string') {
      return this.parseTextScenarios(data);
    }
    
    throw new Error('Unsupported scenario format');
  }

  parseJSONScenarios(jsonData) {
    const scenarios = [];
    
    for (const [category, categoryData] of Object.entries(jsonData)) {
      for (const example of categoryData.examples || []) {
        scenarios.push({
          category: category,
          user_message: example.userMessage,
          good_response: example.goodResponse,
          approach: example.approach,
          triggers: categoryData.triggers || [],
          therapeutic_notes: example.therapeuticNotes || '',
          nervous_system_considerations: example.nervousSystemNotes || '',
          created_at: new Date().toISOString()
        });
      }
    }
    
    return scenarios;
  }

  parseTextScenarios(textData) {
    const scenarios = [];
    const sections = textData.split('---').filter(section => section.trim());
    
    for (const section of sections) {
      const lines = section.trim().split('\n');
      let scenario = {
        category: 'uploaded_text',
        created_at: new Date().toISOString()
      };
      
      for (const line of lines) {
        if (line.startsWith('USER:')) {
          scenario.user_message = line.replace('USER:', '').trim();
        } else if (line.startsWith('CLAUDE:')) {
          scenario.good_response = line.replace('CLAUDE:', '').trim();
        } else if (line.startsWith('APPROACH:')) {
          scenario.approach = line.replace('APPROACH:', '').trim();
        } else if (line.startsWith('TRIGGERS:')) {
          scenario.triggers = line.replace('TRIGGERS:', '').trim().split(',').map(t => t.trim());
        } else if (line.startsWith('NOTES:')) {
          scenario.therapeutic_notes = line.replace('NOTES:', '').trim();
        }
      }
      
      if (scenario.user_message && scenario.good_response) {
        scenarios.push(scenario);
      }
    }
    
    return scenarios;
  }

  // Load scenarios from database
  async loadScenarios() {
    try {
      const { data, error } = await supabase
        .from('training_scenarios')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      this.scenarios = data || [];
      this.buildResponsePatterns();
      
      return this.scenarios;
    } catch (error) {
      console.error('Error loading scenarios:', error);
      return [];
    }
  }

  // Build pattern matching system
  buildResponsePatterns() {
    this.responsePatterns.clear();
    
    for (const scenario of this.scenarios) {
      // Index by triggers
      for (const trigger of scenario.triggers || []) {
        if (!this.responsePatterns.has(trigger)) {
          this.responsePatterns.set(trigger, []);
        }
        this.responsePatterns.get(trigger).push(scenario);
      }
      
      // Index by key phrases from user message
      const keyPhrases = this.extractKeyPhrases(scenario.user_message);
      for (const phrase of keyPhrases) {
        if (!this.responsePatterns.has(phrase)) {
          this.responsePatterns.set(phrase, []);
        }
        this.responsePatterns.get(phrase).push(scenario);
      }
    }
  }

  // Find relevant scenarios for a user message
  findRelevantScenarios(userMessage, limit = 3) {
    const lowerMessage = userMessage.toLowerCase();
    const scenarioScores = new Map();
    
    // Score scenarios based on trigger/phrase matches
    for (const [pattern, scenarios] of this.responsePatterns) {
      if (lowerMessage.includes(pattern.toLowerCase())) {
        for (const scenario of scenarios) {
          const currentScore = scenarioScores.get(scenario.id) || 0;
          scenarioScores.set(scenario.id, currentScore + 1);
        }
      }
    }
    
    // Get top scoring scenarios
    const sortedScenarios = Array.from(scenarioScores.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id, score]) => this.scenarios.find(s => s.id === id));
    
    return sortedScenarios.filter(s => s); // Remove any undefined scenarios
  }

  // Extract key phrases for indexing
  extractKeyPhrases(text) {
    if (!text) return [];
    
    // Simple key phrase extraction
    const words = text.toLowerCase().split(/\W+/);
    const phrases = [];
    
    // Single important words
    const importantWords = words.filter(word => 
      word.length > 3 && 
      !['that', 'this', 'with', 'have', 'they', 'were', 'been', 'their', 'said', 'what', 'when', 'where'].includes(word)
    );
    
    phrases.push(...importantWords);
    
    // Two-word phrases
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].length > 2 && words[i + 1].length > 2) {
        phrases.push(`${words[i]} ${words[i + 1]}`);
      }
    }
    
    return phrases;
  }

  // Generate enhanced prompt with relevant scenarios
  buildEnhancedPrompt(userMessage, context, relevantScenarios) {
    let prompt = `You are an expert integration guide. Here are some examples of how to respond to similar experiences:\n\n`;
    
    // Add relevant scenario examples
    for (const scenario of relevantScenarios) {
      prompt += `EXAMPLE SCENARIO:\n`;
      prompt += `User said: "${scenario.user_message}"\n`;
      prompt += `Good response: "${scenario.good_response}"\n`;
      prompt += `Approach: ${scenario.approach}\n`;
      if (scenario.therapeutic_notes) {
        prompt += `Therapeutic notes: ${scenario.therapeutic_notes}\n`;
      }
      prompt += `\n`;
    }
    
    prompt += `Now respond to this user message using similar therapeutic principles:\n`;
    prompt += `User: "${userMessage}"\n\n`;
    
    prompt += `Remember to:\n`;
    prompt += `- Validate their experience first\n`;
    prompt += `- Check nervous system state when appropriate\n`;
    prompt += `- Use the therapeutic approaches shown in examples\n`;
    prompt += `- Be warm, professional, and trauma-informed\n`;
    
    return prompt;
  }
}

export default ScenarioTrainingSystem;