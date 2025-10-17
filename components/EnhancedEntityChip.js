import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EnhancedEntityChip = ({ entity, onPress, symbolLibrary = {} }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      archetypal: '#FFD700',    // Gold
      beings: '#9370DB',        // Medium Purple
      emotional: '#FF6B6B',     // Coral
      somatic: '#4ECDC4',       // Teal
      spiritual: '#A8E6CF',     // Light Green
      parts: '#FFB84D',         // Orange
      environments: '#87CEEB',  // Sky Blue
      colors: '#DDA0DD',        // Plum
      sensory: '#F0E68C'        // Khaki
    };
    return colors[category] || '#CCCCCC';
  };

  const getIntensityOpacity = (intensity) => {
    const opacities = {
      low: 0.6,
      medium: 0.8,
      high: 1.0
    };
    return opacities[intensity] || 0.8;
  };

  const getConfidenceIcon = (confidence) => {
    if (confidence >= 0.9) return '🌟';
    if (confidence >= 0.7) return '✨';
    if (confidence >= 0.5) return '💫';
    return '⭐';
  };

  const getSymbolMeanings = (symbolName) => {
    return symbolLibrary[symbolName.toLowerCase()] || [];
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.chip,
          {
            backgroundColor: getCategoryColor(entity.category),
            opacity: getIntensityOpacity(entity.emotional_intensity)
          }
        ]}
        onPress={() => setShowDetails(true)}
      >
        <Text style={styles.chipText}>
          {getConfidenceIcon(entity.confidence)} {entity.name}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showDetails}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.entityName}>{entity.name}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowDetails(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Entity Metadata */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Details</Text>
              <View style={styles.metadataRow}>
                <Text style={styles.label}>Category:</Text>
                <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(entity.category) }]}>
                  <Text style={styles.categoryText}>{entity.category}</Text>
                </View>
              </View>
              <View style={styles.metadataRow}>
                <Text style={styles.label}>Confidence:</Text>
                <Text style={styles.value}>{Math.round(entity.confidence * 100)}%</Text>
              </View>
              <View style={styles.metadataRow}>
                <Text style={styles.label}>Emotional Intensity:</Text>
                <Text style={styles.value}>{entity.emotional_intensity}</Text>
              </View>
            </View>

            {/* Context from your session */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Experience</Text>
              <Text style={styles.contextText}>{entity.context}</Text>
            </View>

            {/* Archetypal/Symbol meanings */}
            {getSymbolMeanings(entity.name).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Traditional Meanings</Text>
                {getSymbolMeanings(entity.name).map((meaning, index) => (
                  <View key={`${entity.name}-${meaning.tradition}-${index}`} style={styles.meaningCard}>
                    <Text style={styles.traditionLabel}>{meaning.tradition}</Text>
                    <Text style={styles.meaningText}>{meaning.meaning}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Personal associations (could be added later) */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Associations</Text>
              <Text style={styles.placeholder}>
                What does this symbol mean to you? (This will become interactive)
              </Text>
            </View>

            {/* Integration suggestions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Integration Ideas</Text>
              <Text style={styles.placeholder}>
                • Journal about your personal connection to this symbol
                • Create art or movement expressing this energy
                • Notice when this archetype appears in daily life
                • (AI-generated suggestions coming soon)
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  entityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  metadataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    width: 120,
  },
  value: {
    fontSize: 14,
    color: '#333',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  contextText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  meaningCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  traditionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  meaningText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  placeholder: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default EnhancedEntityChip;