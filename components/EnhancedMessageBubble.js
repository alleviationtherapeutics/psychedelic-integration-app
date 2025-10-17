import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { 
  Heart, 
  Zap, 
  Shield, 
  Brain,
  Eye,
  Sparkles,
  Users,
  Activity,
  Clock,
  Info
} from 'react-native-vector-icons/Feather';

const EnhancedMessageBubble = ({ 
  message, 
  entities = [], 
  nervousSystemState, 
  onEntityPress 
}) => {
  const [showEntityDetails, setShowEntityDetails] = useState(false);
  
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const getNervousSystemIcon = () => {
    switch (nervousSystemState) {
      case 'ventral':
        return <Heart size={12} color="#10b981" />;
      case 'sympathetic':
        return <Zap size={12} color="#ef4444" />;
      case 'dorsal':
        return <Shield size={12} color="#6366f1" />;
      default:
        return <Brain size={12} color="#6b7280" />;
    }
  };

  const getEntityIcon = (category) => {
    const iconProps = { size: 14, color: '#6b7280' };
    
    switch (category) {
      case 'archetypal':
        return <Sparkles {...iconProps} color="#8b5cf6" />;
      case 'emotional':
        return <Heart {...iconProps} color="#ef4444" />;
      case 'somatic':
        return <Activity {...iconProps} color="#f59e0b" />;
      case 'spiritual':
        return <Eye {...iconProps} color="#3b82f6" />;
      case 'parts':
        return <Users {...iconProps} color="#10b981" />;
      default:
        return <Brain {...iconProps} />;
    }
  };

  const getEntityColor = (category) => {
    switch (category) {
      case 'archetypal': return '#8b5cf6';
      case 'emotional': return '#ef4444';
      case 'somatic': return '#f59e0b';
      case 'spiritual': return '#3b82f6';
      case 'parts': return '#10b981';
      default: return '#6b7280';
    }
  };

  const renderEntityChips = () => {
    if (!entities || entities.length === 0) return null;

    return (
      <View style={styles.entitiesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.entityChips}>
            {entities.map((entity, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.entityChip,
                  { borderColor: getEntityColor(entity.category) }
                ]}
                onPress={() => onEntityPress && onEntityPress(entity)}
              >
                {getEntityIcon(entity.category)}
                <Text style={[
                  styles.entityChipText,
                  { color: getEntityColor(entity.category) }
                ]}>
                  {entity.name}
                </Text>
                {entity.confidence && (
                  <View style={[
                    styles.confidenceDot,
                    { 
                      backgroundColor: entity.confidence > 0.7 
                        ? '#10b981' 
                        : entity.confidence > 0.4 
                        ? '#f59e0b' 
                        : '#ef4444' 
                    }
                  ]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        
        {entities.length > 3 && (
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => setShowEntityDetails(!showEntityDetails)}
          >
            <Info size={12} color="#6b7280" />
            <Text style={styles.viewAllText}>
              {showEntityDetails ? 'Hide' : 'View all'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderEntityDetails = () => {
    if (!showEntityDetails || !entities || entities.length === 0) return null;

    return (
      <View style={styles.entityDetails}>
        <Text style={styles.entityDetailsTitle}>Symbols & Elements</Text>
        {entities.map((entity, index) => (
          <View key={index} style={styles.entityDetailItem}>
            <View style={styles.entityDetailHeader}>
              {getEntityIcon(entity.category)}
              <Text style={styles.entityDetailName}>{entity.name}</Text>
              <Text style={styles.entityDetailCategory}>({entity.category})</Text>
            </View>
            {entity.context && (
              <Text style={styles.entityDetailContext}>"{entity.context}"</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  const renderPracticeIndicator = () => {
    if (!message.requiresPractice) return null;

    const urgencyColor = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    }[message.requiresPractice.urgency] || '#6b7280';

    return (
      <View style={[styles.practiceIndicator, { borderColor: urgencyColor }]}>
        <Activity size={14} color={urgencyColor} />
        <Text style={[styles.practiceIndicatorText, { color: urgencyColor }]}>
          Practice suggested: {message.requiresPractice.title || 'Regulation support'}
        </Text>
      </View>
    );
  };

  const renderNervousSystemContext = () => {
    if (!message.nervousSystemContext && !message.nervousSystemUpdate) return null;

    const context = message.nervousSystemContext || message.nervousSystemUpdate;
    
    return (
      <View style={styles.nervousSystemContext}>
        {getNervousSystemIcon()}
        <Text style={styles.nervousSystemContextText}>
          {context.state === 'ventral' && 'Safe & Social'}
          {context.state === 'sympathetic' && 'Activated'}
          {context.state === 'dorsal' && 'Protected'}
          {context.intensity && ` (${context.intensity}/10)`}
        </Text>
      </View>
    );
  };

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.assistantContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.assistantBubble
      ]}>
        {/* Message Content */}
        <Text style={[
          styles.messageText,
          isUser ? styles.userText : styles.assistantText
        ]}>
          {message.content}
        </Text>

        {/* Entity Chips (for assistant messages) */}
        {!isUser && renderEntityChips()}

        {/* Practice Indicator */}
        {renderPracticeIndicator()}

        {/* Nervous System Context */}
        {renderNervousSystemContext()}

        {/* Timestamp */}
        <View style={styles.footer}>
          <Text style={[
            styles.timestamp,
            isUser ? styles.userTimestamp : styles.assistantTimestamp
          ]}>
            {timestamp}
          </Text>
          
          {message.practiceFollowUp && (
            <View style={styles.followUpIndicator}>
              <Activity size={10} color="#10b981" />
              <Text style={styles.followUpText}>Post-practice</Text>
            </View>
          )}
        </View>
      </View>

      {/* Expanded Entity Details */}
      {!isUser && renderEntityDetails()}
    </View>
  );
};

const styles = {
  container: {
    marginVertical: 4,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  assistantContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '85%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#3b82f6',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#ffffff',
  },
  assistantText: {
    color: '#1f2937',
  },
  entitiesContainer: {
    marginTop: 12,
  },
  entityChips: {
    flexDirection: 'row',
    gap: 6,
  },
  entityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  entityChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  confidenceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 2,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  viewAllText: {
    fontSize: 11,
    color: '#6b7280',
  },
  entityDetails: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    maxWidth: '85%',
  },
  entityDetailsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  entityDetailItem: {
    marginBottom: 8,
  },
  entityDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  entityDetailName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1f2937',
  },
  entityDetailCategory: {
    fontSize: 11,
    color: '#6b7280',
  },
  entityDetailContext: {
    fontSize: 12,
    color: '#4b5563',
    fontStyle: 'italic',
    marginLeft: 20,
  },
  practiceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fef3c7',
  },
  practiceIndicatorText: {
    fontSize: 12,
    fontWeight: '500',
  },
  nervousSystemContext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  nervousSystemContextText: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  assistantTimestamp: {
    color: '#9ca3af',
  },
  followUpIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  followUpText: {
    fontSize: 10,
    color: '#10b981',
    fontWeight: '500',
  },
};

export default EnhancedMessageBubble;