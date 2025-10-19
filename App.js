import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { supabase } from './lib/supabase';
import { colors } from './theme/colors';
import AuthScreen from './screens/AuthScreen';
import ConversationScreen from './screens/ConversationScreen';
import SimpleEnhancedConversationScreen from './screens/SimpleEnhancedConversationScreen';
import EnhancedConversationScreen from './screens/EnhancedConversationScreen';
import EducationScreen from './screens/EducationScreen';
import OrganizedHomeScreen from './screens/OrganizedHomeScreen';
import AllSessionsScreen from './screens/AllSessionsScreen';
import ExperienceMappingScreen from './screens/ExperienceMappingScreen';
import TherapeuticIntegrationScreen from './screens/TherapeuticIntegrationScreen';
import PreparationScreen from './screens/PreparationScreen';
import GeneralPreparationScreen from './screens/preparation/GeneralPreparationScreen';
import SessionPreparationScreen from './screens/preparation/SessionPreparationScreen';
import SessionToolsScreen from './screens/SessionToolsScreen';
import SessionDetailScreen from './screens/SessionDetailScreen';
import InteractiveSessionMindMap from './screens/InteractiveSessionMindMap';
import QuickNetworkTest from './screens/QuickNetworkTest';
import NetworkTestScreen from './NetworkTestScreen';
import ExerciseLibraryScreen from './screens/ExerciseLibraryScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for authenticated users
const MainTabs = () => {
  const insets = useSafeAreaInsets();
  // Use the actual safe area inset from the device
  const bottomInset = insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Sessions') {
            iconName = 'chat';
          } else if (route.name === 'Education') {
            iconName = 'school';
          } else if (route.name === 'AllSessions') {
            iconName = 'list';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          height: 60 + bottomInset,
          paddingBottom: bottomInset,
          paddingTop: 8,
          backgroundColor: colors.surface,
          borderTopColor: colors.sand,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          paddingBottom: 4,
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Sessions"
        component={OrganizedHomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Education"
        component={EducationScreen}
        options={{ title: 'Learn' }}
      />
      <Tab.Screen
        name="AllSessions"
        component={AllSessionsScreen}
        options={{ title: 'Sessions' }}
      />
    </Tab.Navigator>
  );
};

// Main App Component with debug logging
export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('Starting app...');
  const [bypassAuth, setBypassAuth] = useState(false); // Add bypass mode

  useEffect(() => {
    // Check if we should bypass auth for testing
    const shouldBypass = __DEV__ && process.env.BYPASS_AUTH === 'true';
    if (shouldBypass) {
      console.log('App: Bypassing auth for development');
      setBypassAuth(true);
      setLoading(false);
      return;
    }

    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setDebugInfo('Connecting to Supabase...');
      console.log('App: Starting initialization');

      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('App: Auth error:', error);
        setDebugInfo(`Auth error: ${error.message}`);
        setLoading(false);
        return;
      }

      console.log('App: Session check complete:', session ? 'Logged in' : 'Not logged in');
      setDebugInfo(session ? 'User logged in' : 'No user session');
      
      setSession(session);
      setLoading(false);

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('App: Auth state changed:', _event, session ? 'Logged in' : 'Logged out');
        setSession(session);
      });

      return () => {
        console.log('App: Cleaning up auth subscription');
        subscription.unsubscribe();
      };

    } catch (error) {
      console.error('App: Initialization error:', error);
      setDebugInfo(`Initialization error: ${error.message}`);
      setLoading(false);
    }
  };

  console.log('App: Rendering, loading:', loading, 'session:', !!session);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingTitle}>Psychedelic Integration App</Text>
        <Text style={styles.debugText}>{debugInfo}</Text>
        <Text style={styles.debugHint}>
          If stuck here, check console logs or try restarting
        </Text>
        
        {/* Emergency bypass button */}
        <TouchableOpacity 
          style={styles.bypassButton}
          onPress={() => {
            console.log('Emergency bypass activated');
            setBypassAuth(true);
            setLoading(false);
          }}
        >
          <Text style={styles.bypassButtonText}>🚨 Emergency Bypass (Test Mode)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {(session && session.user) || bypassAuth ? (
            <>
              <Stack.Screen name="MainTabs" component={MainTabs} />
              {/* Dual Mode Conversation Screens */}
              <Stack.Screen 
                name="ExperienceMapping" 
                component={ExperienceMappingScreen}
                options={{ 
                  headerShown: false,
                  title: 'Experience Processing'
                }}
              />
              <Stack.Screen 
                name="TherapeuticIntegration" 
                component={TherapeuticIntegrationScreen}
                options={{ 
                  headerShown: false,
                  title: 'Therapeutic Integration'
                }}
              />
              <Stack.Screen 
                name="Preparation" 
                component={PreparationScreen}
                options={{ 
                  headerShown: false,
                  title: 'Preparation Hub'
                }}
              />
              <Stack.Screen 
                name="GeneralPreparation" 
                component={GeneralPreparationScreen}
                options={{ 
                  headerShown: false,
                  title: 'Foundational Preparation'
                }}
              />
              <Stack.Screen 
                name="SessionPreparation" 
                component={SessionPreparationScreen}
                options={{ 
                  headerShown: false,
                  title: 'Session Preparation'
                }}
              />
              <Stack.Screen
                name="SessionTools"
                component={SessionToolsScreen}
                options={{
                  headerShown: false,
                  title: 'Session Tools'
                }}
              />
              <Stack.Screen
                name="SessionDetail"
                component={SessionDetailScreen}
                options={{
                  headerShown: false,
                  title: 'Session Detail'
                }}
              />
              {/* Legacy screens */}
              <Stack.Screen 
                name="Conversation" 
                component={EnhancedConversationScreen}
                options={{ 
                  headerShown: false,
                  title: 'Enhanced Integration Session'
                }}
              />
              <Stack.Screen 
                name="MindMap" 
                component={InteractiveSessionMindMap}
                options={{ 
                  headerShown: false,
                  title: 'Mind Map'
                }}
              />
              <Stack.Screen
                name="NetworkTest"
                component={NetworkTestScreen}
                options={{
                  headerShown: true,
                  title: 'Network Diagnostics'
                }}
              />
              <Stack.Screen
                name="ExerciseLibrary"
                component={ExerciseLibraryScreen}
                options={{
                  headerShown: false,
                  title: 'Exercise Library'
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="NetworkTest" component={QuickNetworkTest} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  debugText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  debugHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  bypassButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
  },
  bypassButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});