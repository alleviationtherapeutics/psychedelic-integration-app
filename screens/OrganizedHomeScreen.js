import { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import FeedbackButton from '../components/FeedbackButton';

const { width } = Dimensions.get('window');

const OrganizedHomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentSessions, setRecentSessions] = useState([]);
  const [userRole, setUserRole] = useState('patient'); // patient | therapist | admin

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      console.log('OrganizedHomeScreen: Loading user data');
      console.log('OrganizedHomeScreen: Supabase URL:', process.env.SUPABASE_URL ? 'Set' : 'Missing');
      console.log('OrganizedHomeScreen: Starting auth check...');

      // Get current user
      console.log('OrganizedHomeScreen: Calling supabase.auth.getUser()...');
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('OrganizedHomeScreen: Auth response received:', { user: !!user, error: !!userError });
      
      if (userError) {
        console.error('User error:', userError);
        showAlert('Authentication Error', userError.message);
        return;
      }

      if (!user) {
        console.error('No user found');
        showAlert('Error', 'Please log in again');
        return;
      }

      setUser(user);

      // Try to load recent sessions, but don't fail if database is unavailable
      try {
        console.log('OrganizedHomeScreen: Attempting to load sessions...');
        const { data: sessionData, error: sessionError } = await supabase
          .from('sessions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);

        if (sessionError) {
          console.error('Session loading error (non-fatal):', sessionError);
          // Don't show alert for database errors - just continue without sessions
          setRecentSessions([]);
        } else {
          console.log('Sessions loaded successfully:', sessionData?.length || 0);
          setRecentSessions(sessionData || []);
        }
      } catch (dbError) {
        console.error('Database connection error (non-fatal):', dbError);
        // Continue without recent sessions - the app can still work
        setRecentSessions([]);
      }

      // Check user role (if you have a user_roles table or metadata)
      // For now, defaulting to 'patient'
      setUserRole('patient');

    } catch (error) {
      console.error('Unexpected error:', error);
      showAlert('Connection Error', 'Unable to load data. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (title, message) => {
    console.log(`Alert: ${title} - ${message}`);
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const navigateToExperienceProcessing = () => {
    navigation.navigate('ExperienceMapping');
  };

  const navigateToIntegrationSession = () => {
    navigation.navigate('TherapeuticIntegration');
  };

  const navigateToEducation = () => {
    navigation.navigate('Education');
  };

  const navigateToTherapistTools = () => {
    navigation.navigate('TherapistVerification');
  };

  const createQuickSession = async (type) => {
    try {
      console.log('createQuickSession called with type:', type);
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        console.error('Auth error in createQuickSession:', userError);
        showAlert('Authentication Error', 'Please log in again');
        return;
      }

      const sessionTitle = type === 'experience' 
        ? `Experience Processing ${new Date().toLocaleDateString()}`
        : `Integration Session ${new Date().toLocaleDateString()}`;

      console.log('Creating session with title:', sessionTitle);

      // Create session object WITHOUT id - let database generate UUID
      const newSessionData = {
        user_id: user.id,
        title: sessionTitle,
        journey_date: new Date().toISOString().split('T')[0],
        current_step: 1,
        session_data: {
          sessionType: type,
          conversationMode: type === 'experience' ? 'experience_mapping' : 'therapeutic_integration',
          messages: [],
          entities: []
        }
      };

      console.log('Session data prepared:', newSessionData);

      // Try to save to database first
      try {
        console.log('Attempting to save to database...');
        const { data, error } = await supabase
          .from('sessions')
          .insert([newSessionData])
          .select()
          .single();

        if (error) {
          console.error('Database session creation failed:', error);
          // Create local fallback session with temp ID
          const localSession = {
            id: `temp_${Date.now()}`,
            created_at: new Date().toISOString(),
            ...newSessionData
          };
          console.log('Using local session:', localSession);
          navigateToSession(localSession, type);
        } else {
          console.log('Session created in database successfully:', data);
          // Use the database session
          navigateToSession(data, type);
        }
      } catch (dbError) {
        console.error('Database completely unavailable (continuing with local session):', dbError);
        // Create local fallback session with temp ID
        const localSession = {
          id: `temp_${Date.now()}`,
          created_at: new Date().toISOString(),
          ...newSessionData
        };
        console.log('Using local session due to db error:', localSession);
        navigateToSession(localSession, type);
      }

    } catch (error) {
      console.error('Error creating session:', error);
      showAlert('Error', `Failed to create session: ${error.message}`);
    }
  };

  const navigateToSession = (sessionData, type) => {
    console.log('navigateToSession called with:', { type, sessionId: sessionData.id });
    // Navigate based on type
    if (type === 'experience') {
      console.log('Navigating to ExperienceMapping');
      navigation.navigate('ExperienceMapping', { session: sessionData });
    } else {
      console.log('Navigating to TherapeuticIntegration');
      navigation.navigate('TherapeuticIntegration', { session: sessionData });
    }
  };

  const renderMainActions = () => {
    const mainSections = [
      {
        id: 'foundation',
        emoji: '🧠',
        title: 'Foundation Learning',
        description: 'Learn nervous system basics, parts work, and grounding exercises',
        badge: 'Start Here',
        badgeColor: '#10b981',
        onPress: () => navigation.navigate('GeneralPreparation')
      },
      {
        id: 'session_tools',
        emoji: '🛠️',
        title: 'Session Tools',
        description: 'Create sessions, prepare, process experiences, and integrate insights',
        onPress: () => navigation.navigate('SessionTools')
      },
      {
        id: 'exercise_library',
        emoji: '💪',
        title: 'Exercise Library',
        description: 'Browse therapeutic practices: breathing, grounding, IFS parts work, and more',
        badge: 'New',
        badgeColor: '#8b5cf6',
        onPress: () => navigation.navigate('ExerciseLibrary')
      },
      {
        id: 'learning_library',
        emoji: '📚',
        title: 'Learning Library',
        description: 'Deep dives into psychedelic science, integration frameworks, and healing',
        onPress: navigateToEducation
      },
      {
        id: 'therapist_tools',
        emoji: '⚕️',
        title: 'Therapist Tools',
        description: 'Professional tools for facilitators and integration therapists',
        onPress: navigateToTherapistTools
      }
    ];

    return (
      <View style={styles.mainActionsContainer}>
        <Text style={styles.sectionTitle}>What would you like to do today?</Text>

        {mainSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={[styles.actionCard, styles.primaryCard]}
            onPress={section.onPress}
          >
            <View style={styles.cardHeader}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionEmoji}>{section.emoji}</Text>
              </View>
              {section.badge && (
                <View style={[styles.badge, { backgroundColor: section.badgeColor }]}>
                  <Text style={styles.badgeText}>{section.badge}</Text>
                </View>
              )}
            </View>
            <Text style={styles.actionTitle}>{section.title}</Text>
            <Text style={styles.actionDescription}>{section.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderRecentSessions = () => {
    if (recentSessions.length === 0) return null;

    return (
      <View style={styles.recentSessionsContainer}>
        <Text style={styles.sectionTitle}>Recent Sessions</Text>
        {recentSessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={styles.sessionItem}
            onPress={() => {
              // Navigate based on session type
              const sessionType = session.session_data?.sessionType || 'integration';
              if (sessionType === 'experience') {
                navigation.navigate('ExperienceMapping', { session });
              } else {
                navigation.navigate('TherapeuticIntegration', { session });
              }
            }}
          >
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTitle}>{session.title}</Text>
              <Text style={styles.sessionDate}>
                {new Date(session.created_at).toLocaleDateString()}
              </Text>
              <Text style={styles.sessionType}>
                {session.session_data?.sessionType === 'experience' 
                  ? '📝 Experience Processing' 
                  : '🧘 Integration Session'}
              </Text>
            </View>
            <View style={styles.sessionArrow}>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('AllSessions')}
        >
          <Text style={styles.viewAllText}>View All Sessions</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderWelcomeHeader = () => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>Welcome to Integration</Text>
      <Text style={styles.welcomeSubtitle}>
        Your companion for psychedelic integration and healing
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Integration" />
        </Appbar.Header>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading your dashboard...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Integration" />
        <Appbar.Action
          icon="cog"
          onPress={() => navigation.navigate('NetworkTest')}
        />
        <Appbar.Action
          icon="account"
          onPress={() => navigation.navigate('Profile')}
        />
      </Appbar.Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderWelcomeHeader()}
        {renderMainActions()}
        {renderRecentSessions()}

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <FeedbackButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  welcomeContainer: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  mainActionsContainer: {
    padding: 24,
  },
  primaryActions: {
    gap: 16,
  },
  actionCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  primaryCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  actionIcon: {
    alignItems: 'center',
  },
  actionEmoji: {
    fontSize: 40,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ffffff',
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  secondaryActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  secondaryCard: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  secondaryActionEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  secondaryActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  recentSessionsContainer: {
    backgroundColor: '#ffffff',
    margin: 24,
    marginTop: 0,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 2,
  },
  sessionType: {
    fontSize: 12,
    color: '#6b7280',
  },
  sessionArrow: {
    paddingLeft: 16,
  },
  arrowText: {
    fontSize: 18,
    color: '#9ca3af',
  },
  viewAllButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  bottomSpacing: {
    height: 40,
  },
});

export default OrganizedHomeScreen;