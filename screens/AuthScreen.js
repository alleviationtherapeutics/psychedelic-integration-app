import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Card, TextInput, Title } from 'react-native-paper';
import { supabase } from '../lib/supabase';

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  async function signInWithEmail() {
    setLoading(true);

    // Check if username is 'test' and auto-fill credentials
    if (email.toLowerCase() === 'test') {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'test@psychapp.com',
        password: 'Test1234!',
      });

      if (error) {
        Alert.alert('Sign In Error', error.message);
      }
      setLoading(false);
      return;
    }

    // Determine if input is email or username
    let loginEmail = email;

    // If it doesn't contain @, treat it as a username and append domain
    if (!email.includes('@')) {
      loginEmail = `${email}@psychapp.com`;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: password,
    });

    if (error) {
      Alert.alert('Sign In Error', error.message);
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    // Determine email (support username format)
    let signupEmail = email;
    if (!email.includes('@')) {
      signupEmail = `${email}@psychapp.com`;
    }

    console.log('Attempting signup with:', { email: signupEmail, passwordLength: password.length });

    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: password,
    });

    if (error) {
      console.error('Signup error:', error);
      Alert.alert('Sign Up Error', `${error.message}\n\nEmail: ${signupEmail}\nPassword length: ${password.length}`);
    } else {
      console.log('Signup success:', data);
      if (data.user && !data.user.confirmed_at) {
        Alert.alert(
          'Email Confirmation Required',
          `Account created! Please check ${signupEmail} for the confirmation link.\n\nFor testing: Go to Supabase Dashboard → Authentication → Users → Find ${signupEmail} → Click "..." → Confirm email`
        );
      } else {
        Alert.alert('Success', 'Account created and ready to use!');
      }
    }
    setLoading(false);
  }

  // Quick test login helper
  async function quickTestLogin() {
    setEmail('test');
    setPassword('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: 'test@psychapp.com',
      password: 'Test1234!',
    });

    if (error) {
      Alert.alert('Test User Not Found', 'Please create the test user first by signing up with:\nUsername: test\nPassword: Test1234!');
    }
    setLoading(false);
  }

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Title>
          
          <TextInput
            label="Email or Username"
            placeholder="Database setup required - see console"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            autoCapitalize="none"
          />
          
          <Button
            mode="contained"
            onPress={isSignUp ? signUpWithEmail : signInWithEmail}
            loading={loading}
            style={styles.button}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          
          <Button
            mode="text"
            onPress={() => setIsSignUp(!isSignUp)}
            style={styles.switchButton}
          >
            {isSignUp ? 'Already have an account?' : 'Need an account?'}
          </Button>
          
          <Button
            mode="text"
            onPress={quickTestLogin}
            style={styles.quickLoginButton}
          >
            🚀 Quick Test Login
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate('NetworkTest')}
            style={styles.networkTestButton}
          >
            🌐 Test Network Connection
          </Button>
        </Card.Content>
      </Card>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 24,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  switchButton: {
    marginTop: 10,
  },
  quickLoginButton: {
    marginTop: 5,
  },
  networkTestButton: {
    marginTop: 15,
    borderColor: '#10b981',
  },
});