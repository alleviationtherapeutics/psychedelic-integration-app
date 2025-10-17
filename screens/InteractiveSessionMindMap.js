import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle, G, Line, Text as SvgText } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = SCREEN_WIDTH * 2;
const MAP_HEIGHT = SCREEN_HEIGHT * 2;

// Cross-platform alert helper
const showAlert = (title, message) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    window.alert(`${title}: ${message}`);
  } else {
    Alert.alert(title, message);
  }
};

// Cross-platform confirm helper
const showConfirm = (title, message) => {
  return new Promise((resolve) => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      resolve(window.confirm(`${title}: ${message}`));
    } else {
      Alert.alert(
        title,
        message,
        [
          { text: 'Cancel', onPress: () => resolve(false) },
          { text: 'OK', onPress: () => resolve(true) }
        ]
      );
    }
  });
};

function InteractiveSessionMindMap({ 
  session, 
  entities = [], 
  connections = [],
  onEntitySelect,
  onConnectionCreate 
}) {
  const [nodes, setNodes] = useState([]);
  const [mindMapConnections, setMindMapConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState(null);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const sessionTitle = session?.title || 'Integration Session';

  // Color mapping for different entity categories
  const getCategoryColor = (category) => {
    const colors = {
      archetypal: '#FF6B6B',
      emotional: '#4ECDC4', 
      somatic: '#45B7D1',
      spiritual: '#96CEB4',
      parts: '#FFEAA7',
      environmental: '#DDA0DD',
      temporal: '#98D8C8',
      default: '#BDC3C7'
    };
    return colors[category] || colors.default;
  };

  // Initialize nodes from entities
  useEffect(() => {
    if (!entities || entities.length === 0) return;

    console.log('🧠 Initializing mind map with entities:', entities.length);
    
    const initialNodes = entities.map((entity, index) => {
      const angle = (index / entities.length) * 2 * Math.PI;
      const radius = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.3;
      const centerX = MAP_WIDTH / 2;
      const centerY = MAP_HEIGHT / 2;
      
      return {
        id: entity.id || `entity-${index}`,
        entity,
        name: entity.name,
        category: entity.category || 'unknown',
        confidence: entity.confidence || 0.7,
        emotionalIntensity: entity.emotional_intensity || 'medium',
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        color: getCategoryColor(entity.category)
      };
    });

    setNodes(initialNodes);
    console.log('✅ Mind map nodes initialized:', initialNodes.length);
  }, [entities]);

  // Initialize connections
  useEffect(() => {
    if (!connections) return;
    
    console.log('🔗 Initializing connections:', connections.length);
    setMindMapConnections(connections);
  }, [connections]);

  // Handle node press with better debugging
  const handleNodePress = async (node) => {
    console.log('🎯 Node pressed:', node.name, 'isConnecting:', isConnecting);

    if (isConnecting) {
      if (!connectionStart) {
        // First node selection for connection
        setConnectionStart(node);
        console.log('🔗 Connection start set:', node.name);
        showAlert(
          'Connection Mode',
          `Selected "${node.name}". Now tap another entity to connect them.`
        );
      } else if (connectionStart.id !== node.id) {
        // Create connection between nodes
        console.log('🔗 Creating connection:', connectionStart.name, '->', node.name);
        await createConnection(connectionStart, node);
      } else {
        // Cancel if same node
        setConnectionStart(null);
        setIsConnecting(false);
        showAlert('Cancelled', 'Connection cancelled');
      }
      return;
    }

    // Normal selection - show entity details
    setSelectedNode(node);
    console.log('📋 Entity selected:', node.name);
    
    if (onEntitySelect) {
      onEntitySelect(node);
    }
    
    showAlert(
      node.name,
      `Category: ${node.category}\nConfidence: ${Math.round(node.confidence * 100)}%\nIntensity: ${node.emotionalIntensity}`
    );
  };

  const createConnection = async (fromNode, toNode) => {
    const confirmed = await showConfirm(
      'Create Connection',
      `Connect "${fromNode.name}" with "${toNode.name}"?`
    );
    
    if (!confirmed) {
      setConnectionStart(null);
      setIsConnecting(false);
      return;
    }

    const newConnection = {
      id: `conn-${Date.now()}`,
      session_id: entities[0]?.session_id || session?.id,
      entity1_id: fromNode.entity?.id || fromNode.id,
      entity2_id: toNode.entity?.id || toNode.id,
      connection_type: 'user_created',
      strength: 0.8,
      description: `User connected ${fromNode.name} with ${toNode.name}`
    };
    
    console.log('✅ Creating connection:', newConnection);
    
    // Add to local state immediately
    setMindMapConnections(prev => [...prev, newConnection]);
    
    // Call parent handler if provided
    if (onConnectionCreate) {
      onConnectionCreate(newConnection);
    }
    
    setConnectionStart(null);
    setIsConnecting(false);
    
    showAlert('Connected!', `Created connection between "${fromNode.name}" and "${toNode.name}"`);
  };

  // Render individual node
  const renderNode = (node, index) => {
    const isSelected = selectedNode?.id === node.id;
    const isConnectionStart = connectionStart?.id === node.id;
    
    return (
      <G key={node.id}>
        {/* Node circle with better touch target */}
        <Circle
          cx={node.x}
          cy={node.y}
          r={isSelected || isConnectionStart ? 35 : 30}
          fill={node.color}
          stroke={isSelected ? '#333' : isConnectionStart ? '#FF4444' : '#fff'}
          strokeWidth={isSelected || isConnectionStart ? 3 : 2}
          opacity={0.9}
          onPress={() => handleNodePress(node)}
        />
        
        {/* Node label */}
        <SvgText
          x={node.x}
          y={node.y + 50}
          fontSize="12"
          fill="#333"
          textAnchor="middle"
          fontWeight="bold"
          onPress={() => handleNodePress(node)}
        >
          {node.name.length > 15 ? node.name.substring(0, 15) + '...' : node.name}
        </SvgText>
        
        {/* Confidence indicator */}
        <Circle
          cx={node.x + 20}
          cy={node.y - 20}
          r={6}
          fill="#fff"
          stroke={node.confidence > 0.7 ? '#4CAF50' : node.confidence > 0.4 ? '#FF9800' : '#F44336'}
          strokeWidth={2}
        />
      </G>
    );
  };

  // Render connections between nodes
  const renderConnections = () => {
    return mindMapConnections.map((connection, index) => {
      const sourceNode = nodes.find(n => 
        n.entity?.id === connection.entity1_id || n.id === connection.entity1_id
      );
      const targetNode = nodes.find(n => 
        n.entity?.id === connection.entity2_id || n.id === connection.entity2_id
      );

      if (!sourceNode || !targetNode) {
        console.log('❌ Could not find nodes for connection:', connection);
        return null;
      }

      return (
        <Line
          key={`connection-${index}`}
          x1={sourceNode.x}
          y1={sourceNode.y}
          x2={targetNode.x}
          y2={targetNode.y}
          stroke="#666"
          strokeWidth={Math.max(1, (connection.strength || 0.5) * 3)}
          strokeDasharray={connection.connection_type === 'auto_generated' ? '5,5' : '0,0'}
          opacity={0.6}
        />
      );
    });
  };

  // List view component
  const renderListView = () => (
    <ScrollView style={styles.listContainer}>
      <Text style={styles.listTitle}>Session Entities ({entities.length})</Text>
      
      {entities.map((entity, index) => (
        <TouchableOpacity
          key={entity.id || index}
          style={[
            styles.entityItem,
            { borderLeftColor: getCategoryColor(entity.category) }
          ]}
          onPress={() => {
            console.log('📋 List item pressed:', entity.name);
            showAlert(
              entity.name,
              `Category: ${entity.category}\nConfidence: ${Math.round((entity.confidence || 0.7) * 100)}%\nDescription: ${entity.description || 'No description'}`
            );
          }}
        >
          <View style={styles.entityHeader}>
            <Text style={styles.entityName}>{entity.name}</Text>
            <View style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(entity.category) }
            ]}>
              <Text style={styles.categoryText}>{entity.category}</Text>
            </View>
          </View>
          
          <Text style={styles.entityDescription}>
            {entity.description || entity.context || 'No description available'}
          </Text>
          
          <View style={styles.entityMeta}>
            <Text style={styles.metaText}>
              Confidence: {Math.round((entity.confidence || 0.7) * 100)}%
            </Text>
            <Text style={styles.metaText}>
              Intensity: {entity.emotional_intensity || 'medium'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
      
      {mindMapConnections.length > 0 && (
        <View>
          <Text style={styles.listTitle}>Connections ({mindMapConnections.length})</Text>
          {mindMapConnections.map((connection, index) => {
            const entity1 = entities.find(e => e.id === connection.entity1_id);
            const entity2 = entities.find(e => e.id === connection.entity2_id);
            
            return (
              <View key={index} style={styles.connectionItem}>
                <Text style={styles.connectionText}>
                  {entity1?.name || 'Unknown'} ↔ {entity2?.name || 'Unknown'}
                </Text>
                <Text style={styles.connectionMeta}>
                  Strength: {Math.round((connection.strength || 0.5) * 100)}% • {connection.connection_type}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </ScrollView>
  );

  if (!entities || entities.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="brain" size={64} color="#ccc" />
        <Text style={styles.emptyText}>No entities discovered yet</Text>
        <Text style={styles.emptySubtext}>
          Continue your conversation to discover symbols, emotions, and insights
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🧠 {sessionTitle}</Text>
        <Text style={styles.subtitle}>
          {nodes.length} entities • {mindMapConnections.length} connections
        </Text>
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'map' && styles.activeToggle]}
          onPress={() => setViewMode('map')}
        >
          <MaterialCommunityIcons name="graph" size={20} color={viewMode === 'map' ? '#fff' : '#666'} />
          <Text style={[styles.toggleText, viewMode === 'map' && styles.activeToggleText]}>
            Map
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.toggleButton, viewMode === 'list' && styles.activeToggle]}
          onPress={() => setViewMode('list')}
        >
          <MaterialCommunityIcons name="format-list-bulleted" size={20} color={viewMode === 'list' ? '#fff' : '#666'} />
          <Text style={[styles.toggleText, viewMode === 'list' && styles.activeToggleText]}>
            List
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'list' ? renderListView() : (
        <>
          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.controlButton, isConnecting && styles.activeButton]}
              onPress={() => {
                setIsConnecting(!isConnecting);
                setConnectionStart(null);
                console.log('🔗 Connection mode toggled:', !isConnecting);
              }}
            >
              <MaterialCommunityIcons 
                name={isConnecting ? "link-off" : "link"} 
                size={16} 
                color={isConnecting ? '#fff' : '#666'} 
              />
              <Text style={[styles.controlText, isConnecting && styles.activeText]}>
                {isConnecting ? 'Cancel Connect' : 'Connect Entities'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
                console.log('🎯 View reset');
              }}
            >
              <MaterialCommunityIcons name="fit-to-screen" size={16} color="#666" />
              <Text style={styles.controlText}>Reset View</Text>
            </TouchableOpacity>
          </View>

          {/* Status Bar */}
          {(isConnecting || connectionStart) && (
            <View style={styles.statusBar}>
              <Text style={styles.statusText}>
                {connectionStart 
                  ? `Selected "${connectionStart.name}" - tap another entity to connect`
                  : 'Connection mode active - tap an entity to start'
                }
              </Text>
            </View>
          )}

          {/* Mind Map SVG */}
          <View style={styles.mapContainer}>
            <Svg
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT * 0.6}
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            >
              {/* Render connections first (behind nodes) */}
              {renderConnections()}
              
              {/* Render nodes */}
              {nodes.map(renderNode)}
            </Svg>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#007AFF',
  },
  toggleText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  activeToggleText: {
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    gap: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#FF4444',
  },
  controlText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
  },
  activeText: {
    color: '#fff',
  },
  statusBar: {
    backgroundColor: '#FFF3CD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  statusText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  entityItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  entityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  entityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  entityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  connectionItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  connectionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  connectionMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
});

export default InteractiveSessionMindMap;