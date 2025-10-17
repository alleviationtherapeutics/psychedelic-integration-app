import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { getAllExercises, exerciseCategories } from '../content/exercises';

const ExerciseLibraryScreen = ({ navigation }) => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get all exercises from the content file
  const allPractices = getAllExercises();

  const getCategoryInfo = (categoryId) => {
    return exerciseCategories.find(c => c.id === categoryId) || exerciseCategories[0];
  };

  const filteredPractices = selectedCategory === 'all'
    ? allPractices
    : allPractices.filter(p => p.category === selectedCategory);

  const renderExerciseModal = () => {
    if (!selectedExercise) return null;

    const categoryInfo = getCategoryInfo(selectedExercise.category);

    return (
      <Modal
        visible={!!selectedExercise}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedExercise(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.modalHeader, { backgroundColor: categoryInfo.color }]}>
              <View style={styles.modalHeaderTop}>
                <Text style={styles.modalTitle}>{selectedExercise.title}</Text>
                <TouchableOpacity onPress={() => setSelectedExercise(null)}>
                  <MaterialIcons name="close" size={28} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <View style={styles.modalMetadata}>
                <View style={styles.metadataItem}>
                  <MaterialIcons name="schedule" size={16} color="#ffffff" />
                  <Text style={styles.metadataText}>{selectedExercise.duration} min</Text>
                </View>
                <View style={styles.metadataItem}>
                  <MaterialIcons name={categoryInfo.icon} size={16} color="#ffffff" />
                  <Text style={styles.metadataText}>{categoryInfo.name}</Text>
                </View>
              </View>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.instructionsSection}>
                <Text style={styles.sectionTitle}>💡 Purpose</Text>
                <Text style={styles.instructionsText}>{selectedExercise.instructions}</Text>
              </View>

              <View style={styles.stepsSection}>
                <Text style={styles.sectionTitle}>📋 Steps</Text>
                {selectedExercise.steps.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={styles.stepNumber}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.tipBox}>
                <MaterialIcons name="lightbulb" size={20} color="#f59e0b" />
                <Text style={styles.tipText}>
                  Take your time with each step. There's no rush. This is your practice.
                </Text>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.startButton, { backgroundColor: categoryInfo.color }]}
                onPress={() => setSelectedExercise(null)}
              >
                <MaterialIcons name="check" size={20} color="#ffffff" />
                <Text style={styles.startButtonText}>Got It</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>

        <Text style={styles.heroTitle}>Exercise Library</Text>
        <Text style={styles.heroSubtitle}>
          Therapeutic practices for integration & well-being
        </Text>
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {exerciseCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && { backgroundColor: category.color }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <MaterialIcons
              name={category.icon}
              size={18}
              color={selectedCategory === category.id ? '#ffffff' : '#6b7280'}
            />
            <Text style={[
              styles.categoryChipText,
              selectedCategory === category.id && styles.categoryChipTextActive
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.exercisesList} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          <Text style={styles.resultsText}>
            {filteredPractices.length} {filteredPractices.length === 1 ? 'exercise' : 'exercises'}
          </Text>

          {filteredPractices.map((exercise, index) => {
            const categoryInfo = getCategoryInfo(exercise.category);
            return (
              <TouchableOpacity
                key={index}
                style={styles.exerciseCard}
                onPress={() => setSelectedExercise(exercise)}
              >
                <View style={[styles.exerciseIcon, { backgroundColor: categoryInfo.color }]}>
                  <MaterialIcons name={categoryInfo.icon} size={24} color="#ffffff" />
                </View>

                <View style={styles.exerciseContent}>
                  <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                  <Text style={styles.exerciseInstructions} numberOfLines={2}>
                    {exercise.instructions}
                  </Text>
                  <View style={styles.exerciseMetadata}>
                    <View style={styles.metadataBadge}>
                      <MaterialIcons name="schedule" size={14} color="#6b7280" />
                      <Text style={styles.metadataBadgeText}>{exercise.duration} min</Text>
                    </View>
                    <View style={styles.metadataBadge}>
                      <Text style={styles.metadataBadgeText}>{exercise.steps.length} steps</Text>
                    </View>
                  </View>
                </View>

                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {renderExerciseModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingTop: 60,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 20,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
  },
  categoryScroll: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  categoryScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    gap: 6,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  categoryChipTextActive: {
    color: '#ffffff',
  },
  exercisesList: {
    flex: 1,
  },
  contentPadding: {
    padding: 16,
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  exerciseInstructions: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  exerciseMetadata: {
    flexDirection: 'row',
    gap: 8,
  },
  metadataBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  metadataBadgeText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
    marginRight: 16,
  },
  modalMetadata: {
    flexDirection: 'row',
    gap: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metadataText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '500',
  },
  modalBody: {
    padding: 24,
  },
  instructionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
  stepsSection: {
    marginBottom: 24,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  tipBox: {
    flexDirection: 'row',
    backgroundColor: '#fffbeb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  modalFooter: {
    padding: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  startButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default ExerciseLibraryScreen;
