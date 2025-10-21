import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import splashAnimation from '../design/splash-animation.json';

const AnimatedSplash = ({ onAnimationFinish }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    // Auto-play animation when component mounts
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animationRef}
        source={splashAnimation}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={onAnimationFinish}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1E8', // Warm cream background
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default AnimatedSplash;
