import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import ScenarioTrainingSystem from '../lib/scenarioTrainingSystem';

const ScenarioUploadScreen = ({ navigation }) => {
  const [uploadMethod, setUploadMethod] = useState('text'); // 'text' or 'json'
  const [scenarioText, setScenarioText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [trainingSystem] = useState(new ScenarioTrainingSystem());

  const handleUpload = async () => {
    if (!scenarioText.trim()) {
      Alert.alert('Error', 'Please enter some scenario data to upload.');
      return;
    }

    setIsUploading(true);
    
    try {
      let parsedData;
      
      if (uploadMethod === 'json') {
        try {
          parsedData = JSON.parse(scenarioText);
        } catch (e) {
          Alert.alert('Error', 'Invalid JSON format. Please check your data.');
          setIsUploading(false);
          return;
        }
      } else {
        parsedData = scenarioText;
      }
      
      const result = await trainingSystem.uploadScenarios(parsedData);
      
      if (result.success) {
        Alert.alert(
          'Success!', 
          `Successfully uploaded ${result.count} scenarios. Claude will now use these examples to improve responses.`,
          [{ text: 'OK', onPress: () => setScenarioText('') }]
        );
      } else {
        Alert.alert('Error', result.error || 'Failed to upload scenarios.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const loadExampleData = () => {
    if (uploadMethod === 'json') {
      const exampleJSON = `{
  "mystical_experiences": {
    "triggers": ["unity", "oneness", "divine", "god", "cosmic"],
    "examples": [
      {
        "userMessage": "I felt connected to everything in the universe",
        "goodResponse": "What a profound experience. That sense of universal connection can be deeply meaningful. I'm curious - what was that feeling like in your body?",
        "approach": "honor_then_embody",
        "therapeuticNotes": "Mystical experiences need validation and somatic integration."
      }
    ]
  }
}`;
      setScenarioText(exampleJSON);
    } else {
      const exampleText = `USER: I saw dark shadow figures that felt threatening
CLAUDE: Thank you for sharing something so vulnerable. Dark visions can be intense. Let's check in with your nervous system - how is your body feeling right now?
APPROACH: validate_first_then_regulate
TRIGGERS: dark, shadow, threatening, scary
NOTES: Shadow work requires extra safety and nervous system regulation

---

USER: I felt connected to everything in the universe
CLAUDE: What a profound experience. That sense of universal connection can be deeply meaningful. I'm curious - what was that feeling like in your body?
APPROACH: honor_then_embody
TRIGGERS: connected, universe, oneness, unity
NOTES: Mystical experiences need validation and somatic integration`;
      setScenarioText(exampleText);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Upload Training Scenarios</Text>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>📚 Train Claude to Respond Better</Text>
        <Text style={styles.infoText}>
          Upload examples of user messages and good therapeutic responses. Claude will learn from these patterns to provide better integration support.
        </Text>
      </View>

      {/* Format Selection */}
      <View style={styles.formatSection}>
        <Text style={styles.sectionTitle}>Choose Format:</Text>
        <View style={styles.formatButtons}>
          <TouchableOpacity
            style={[styles.formatButton, uploadMethod === 'text' && styles.formatButtonActive]}
            onPress={() => setUploadMethod('text')}
          >
            <Text style={[styles.formatButtonText, uploadMethod === 'text' && styles.formatButtonTextActive]}>Text Format</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.formatButton, uploadMethod === 'json' && styles.formatButtonActive]}
            onPress={() => setUploadMethod('json')}
          >
            <Text style={[styles.formatButtonText, uploadMethod === 'json' && styles.formatButtonTextActive]}>JSON Format</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Format Instructions */}
      <View style={styles.instructionsSection}>
        <Text style={styles.sectionTitle}>Format Instructions:</Text>
        {uploadMethod === 'text' ? (
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>Use this format for each scenario:</Text>
            <Text style={styles.exampleText}>
              USER: [User's message]{"\n"}
              CLAUDE: [Good therapeutic response]{"\n"}
              APPROACH: [Therapeutic approach used]{"\n"}
              TRIGGERS: [Comma-separated keywords]{"\n"}
              NOTES: [Optional therapeutic notes]{"\n"}
              {"\n"}---{"\n"}
            </Text>
          </View>
        ) : (
          <View style={styles.instructions}>
            <Text style={styles.instructionText}>JSON structure with categories and examples:</Text>
            <Text style={styles.exampleText}>
              {`{
  "category_name": {
    "triggers": ["keyword1", "keyword2"],
    "examples": [{
      "userMessage": "...",
      "goodResponse": "...",
      "approach": "..."
    }]
  }
}`}
            </Text>
          </View>
        )}
      </View>

      {/* Load Example Button */}
      <TouchableOpacity style={styles.exampleButton} onPress={loadExampleData}>
        <Text style={styles.exampleButtonText}>📝 Load Example Data</Text>
      </TouchableOpacity>

      {/* Text Input */}
      <View style={styles.inputSection}>
        <Text style={styles.sectionTitle}>Scenario Data:</Text>
        <TextInput
          style={styles.textInput}
          value={scenarioText}
          onChangeText={setScenarioText}
          placeholder={uploadMethod === 'json' ? 'Paste JSON data here...' : 'Paste text scenarios here...'}
          multiline
          textAlignVertical="top"
        />
      </View>

      {/* Upload Button */}
      <TouchableOpacity 
        style={[styles.uploadButton, isUploading && styles.uploadButtonDisabled]}
        onPress={handleUpload}
        disabled={isUploading}
      >
        <Text style={styles.uploadButtonText}>
          {isUploading ? '⏳ Uploading...' : '🚀 Upload Scenarios'}
        </Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    fontSize: 16,
    color: '#3b82f6',
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  infoSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  formatSection: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  formatButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  formatButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  formatButtonActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
  },
  formatButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  formatButtonTextActive: {
    color: '#ffffff',
  },
  instructionsSection: {
    margin: 16,
    marginTop: 0,
  },
  instructions: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  instructionText: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },
  exampleText: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderRadius: 4,
  },
  exampleButton: {
    margin: 16,
    marginTop: 0,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  exampleButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  inputSection: {
    margin: 16,
    marginTop: 0,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 200,
    maxHeight: 400,
  },
  uploadButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomPadding: {
    height: 32,
  },
};

export default ScenarioUploadScreen;