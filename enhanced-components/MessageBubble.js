import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MessageBubble = ({ message, entities = [], nervousSystemState, onEntityPress }) => {
  const isUser = message.role === 'user';
  
  const getBubbleStyle = () => {
    const baseStyle = {
      marginVertical: 4,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 16,
      maxWidth: '85%',
    };
    
    if (isUser) {
      return {
        ...baseStyle,
        backgroundColor: '#3b82f6',
        alignSelf: 'flex-end',
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: '#ffffff',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#e5e7eb',
      };
    }
  };

  const getTextStyle = () => {
    return {
      fontSize: 16,
      lineHeight: 22,
      color: isUser ? '#ffffff' : '#1f2937',
    };
  };

  const renderEntities = () => {
    if (!entities || entities.length === 0) return null;
    
    return (
      <View style={styles.entitiesContainer}>
        {entities.map((entity, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.entityChip,
              { backgroundColor: getEntityColor(entity.category) }
            ]}
            onPress={() => onEntityPress && onEntityPress(entity)}
          >
            <Text style={styles.entityText}>{entity.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getEntityColor = (category) => {
    switch (category) {
      case 'archetypal': return '#fef3c7';
      case 'emotional': return '#fce7f3';
      case 'somatic': return '#dcfce7';
      case 'spiritual': return '#e0e7ff';
      case 'parts': return '#fed7d7';
      default: return '#f3f4f6';
    }
  };

  return (
    <View style={getBubbleStyle()}>
      <Text style={getTextStyle()}>{message.content}</Text>
      {renderEntities()}
      
      {/* Show nervous system context if available */}
      {message.nervousSystemContext && (
        <View style={styles.contextIndicator}>
          <Text style={styles.contextText}>
            State: {message.nervousSystemContext.state} ({message.nervousSystemContext.intensity}/10)
          </Text>
        </View>
      )}
      
      {/* Show if practice is suggested */}
      {message.requiresPractice && (
        <View style={styles.practiceIndicator}>
          <Text style={styles.practiceText}>
            💫 {message.requiresPractice.title || 'Practice available'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  entitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  entityChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  entityText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  contextIndicator: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  contextText: {
    fontSize: 11,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  practiceIndicator: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
  },
  practiceText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
};

export default MessageBubble;