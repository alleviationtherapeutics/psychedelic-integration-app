import { StyleSheet, View } from 'react-native'
import { Card, Text } from 'react-native-paper'

export default function MessageBubble({ message, onEntityPress }) {
  return (
    <View style={[
      styles.messageContainer,
      message.isUser ? styles.userMessage : styles.assistantMessage
    ]}>
      <Card style={[
        styles.bubble,
        message.isUser ? styles.userBubble : styles.assistantBubble
      ]}>
        <Card.Content style={styles.content}>
          <Text style={[
            styles.messageText,
            message.isUser ? styles.userText : styles.assistantText
          ]}>
            {message.text}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  assistantMessage: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    elevation: 1,
  },
  userBubble: {
    backgroundColor: '#667eea',
  },
  assistantBubble: {
    backgroundColor: 'white',
  },
  content: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  assistantText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
})