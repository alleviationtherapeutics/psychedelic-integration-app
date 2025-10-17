import React from 'react';
import { View, Text } from 'react-native';
import { Heart, Zap, Shield, Brain } from 'lucide-react-native';

const NervousSystemIndicator = ({ state, confidence = 1, size = 'medium' }) => {
  const getStateConfig = () => {
    switch (state) {
      case 'ventral':
        return {
          name: 'Safe & Social',
          description: 'Calm, connected, curious',
          color: '#10b981',
          icon: Heart,
          backgroundColor: '#d1fae5'
        };
      case 'sympathetic':
        return {
          name: 'Activated',
          description: 'Energized, alert, mobilized',
          color: '#ef4444',
          icon: Zap,
          backgroundColor: '#fee2e2'
        };
      case 'dorsal':
        return {
          name: 'Protected',
          description: 'Withdrawn, conserving energy',
          color: '#6366f1',
          icon: Shield,
          backgroundColor: '#e0e7ff'
        };
      default:
        return {
          name: 'Checking in...',
          description: 'Assessing nervous system state',
          color: '#6b7280',
          icon: Brain,
          backgroundColor: '#f3f4f6'
        };
    }
  };

  const config = getStateConfig();
  const IconComponent = config.icon;
  
  const sizeConfig = {
    small: {
      iconSize: 16,
      fontSize: 12,
      padding: 8,
      containerSize: 32
    },
    medium: {
      iconSize: 20,
      fontSize: 14,
      padding: 12,
      containerSize: 44
    },
    large: {
      iconSize: 24,
      fontSize: 16,
      padding: 16,
      containerSize: 56
    }
  };

  const sizes = sizeConfig[size];

  return (
    <View style={[styles.container, { padding: sizes.padding }]}>
      <View style={[
        styles.iconContainer,
        {
          backgroundColor: config.backgroundColor,
          width: sizes.containerSize,
          height: sizes.containerSize,
          borderRadius: sizes.containerSize / 2
        }
      ]}>
        <IconComponent size={sizes.iconSize} color={config.color} />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.stateName, { fontSize: sizes.fontSize, color: config.color }]}>
          {config.name}
        </Text>
        <Text style={[styles.stateDescription, { fontSize: sizes.fontSize - 2 }]}>
          {config.description}
        </Text>
        {confidence < 1 && (
          <Text style={[styles.confidence, { fontSize: sizes.fontSize - 3 }]}>
            {Math.round(confidence * 100)}% confidence
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  stateName: {
    fontWeight: '600',
    marginBottom: 2,
  },
  stateDescription: {
    color: '#6b7280',
    marginBottom: 2,
  },
  confidence: {
    color: '#9ca3af',
    fontStyle: 'italic',
  },
};

export default NervousSystemIndicator;