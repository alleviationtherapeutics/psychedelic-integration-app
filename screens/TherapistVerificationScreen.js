import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import userRoleService from '../lib/userRoleService';

const TherapistVerificationScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [formData, setFormData] = useState({
    full_name: '',
    license_type: '',
    license_number: '',
    license_state: '',
    license_expiry: '',
    practice_name: '',
    practice_address: '',
    years_experience: '',
    specializations: '',
    additional_info: ''
  });

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const checkVerificationStatus = async () => {
    try {
      const result = await userRoleService.getVerificationStatus();
      setVerificationStatus(result);
    } catch (error) {
      console.error('Error checking verification status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['full_name', 'license_type', 'license_number', 'license_state'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const verificationData = {
        ...formData,
        years_experience: parseInt(formData.years_experience) || 0,
        specializations: formData.specializations.split(',').map(s => s.trim()).filter(s => s),
        // Only include license_expiry if it's not empty
        ...(formData.license_expiry && formData.license_expiry.trim() ? { license_expiry: formData.license_expiry } : {})
      };

      // Remove empty string fields that might cause database issues
      Object.keys(verificationData).forEach(key => {
        if (verificationData[key] === '') {
          delete verificationData[key];
        }
      });

      console.log('Submitting verification data:', verificationData);

      const result = await userRoleService.requestTherapistVerification(verificationData);
      
      if (result.success) {
        Alert.alert(
          'Success!',
          'Your therapist verification request has been submitted. You will receive an email when your application is reviewed.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        Alert.alert('Error', result.error || 'Failed to submit verification request.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Checking verification status...</Text>
      </View>
    );
  }

  // Show status if already submitted
  if (verificationStatus?.status && verificationStatus.status !== 'none') {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Verification Status</Text>
        </View>

        <View style={styles.statusContainer}>
          {verificationStatus.status === 'pending' && (
            <>
              <Text style={styles.statusEmoji}>⏳</Text>
              <Text style={styles.statusTitle}>Verification Pending</Text>
              <Text style={styles.statusText}>
                Your therapist verification request is being reviewed. You will receive an email when the review is complete.
              </Text>
            </>
          )}
          
          {verificationStatus.status === 'approved' && (
            <>
              <Text style={styles.statusEmoji}>✅</Text>
              <Text style={styles.statusTitle}>Verification Approved</Text>
              <Text style={styles.statusText}>
                Congratulations! Your therapist credentials have been verified. You now have access to upload training scenarios.
              </Text>
            </>
          )}
          
          {verificationStatus.status === 'rejected' && (
            <>
              <Text style={styles.statusEmoji}>❌</Text>
              <Text style={styles.statusTitle}>Verification Rejected</Text>
              <Text style={styles.statusText}>
                Unfortunately, your verification request was not approved.
              </Text>
              {verificationStatus.data?.review_notes && (
                <Text style={styles.reviewNotes}>
                  Reason: {verificationStatus.data.review_notes}
                </Text>
              )}
            </>
          )}
          
          {verificationStatus.status === 'needs_more_info' && (
            <>
              <Text style={styles.statusEmoji}>📋</Text>
              <Text style={styles.statusTitle}>More Information Needed</Text>
              <Text style={styles.statusText}>
                Your application needs additional information.
              </Text>
              {verificationStatus.data?.review_notes && (
                <Text style={styles.reviewNotes}>
                  {verificationStatus.data.review_notes}
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Therapist Verification</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>🩺 Professional Verification</Text>
        <Text style={styles.infoText}>
          To upload training scenarios and help improve Claude's therapeutic responses, you need to be a verified mental health professional.
        </Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Professional Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.full_name}
            onChangeText={(text) => setFormData({...formData, full_name: text})}
            placeholder="Your full legal name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>License Type *</Text>
          <TextInput
            style={styles.input}
            value={formData.license_type}
            onChangeText={(text) => setFormData({...formData, license_type: text})}
            placeholder="LMFT, LCSW, PhD, MD, etc."
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>License Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.license_number}
            onChangeText={(text) => setFormData({...formData, license_number: text})}
            placeholder="Your license number"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>License State *</Text>
          <TextInput
            style={styles.input}
            value={formData.license_state}
            onChangeText={(text) => setFormData({...formData, license_state: text})}
            placeholder="CA, NY, TX, etc."
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Practice Name</Text>
          <TextInput
            style={styles.input}
            value={formData.practice_name}
            onChangeText={(text) => setFormData({...formData, practice_name: text})}
            placeholder="Your practice or clinic name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Years of Experience</Text>
          <TextInput
            style={styles.input}
            value={formData.years_experience}
            onChangeText={(text) => setFormData({...formData, years_experience: text})}
            placeholder="5"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Specializations</Text>
          <TextInput
            style={styles.input}
            value={formData.specializations}
            onChangeText={(text) => setFormData({...formData, specializations: text})}
            placeholder="Trauma, EMDR, Psychedelic Therapy, etc. (comma-separated)"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Additional Information</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.additional_info}
            onChangeText={(text) => setFormData({...formData, additional_info: text})}
            placeholder="Any additional information about your background or training in psychedelic-assisted therapy"
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <View style={styles.disclaimerSection}>
        <Text style={styles.disclaimerTitle}>📋 Verification Process</Text>
        <Text style={styles.disclaimerText}>
          • We will verify your license with your state licensing board{"\n"}
          • Verification typically takes 2-3 business days{"\n"}
          • You will receive an email with the verification result{"\n"}
          • Once verified, you can upload training scenarios to improve Claude's responses
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? '⏳ Submitting...' : '🚀 Submit for Verification'}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
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
  statusContainer: {
    margin: 16,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
  },
  statusEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  statusText: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  reviewNotes: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    fontStyle: 'italic',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
  },
  formSection: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  disclaimerSection: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  submitButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  bottomPadding: {
    height: 32,
  },
};

export default TherapistVerificationScreen;