import { Chip } from 'react-native-paper'

export default function EntityChip({ entity, onPress }) {
  const getChipColor = (category) => {
    const colors = {
      being: '#e1f5fe',
      symbol: '#f3e5f5',
      environment: '#e8f5e8',
      emotion: '#fff3e0',
      unknown: '#f5f5f5'
    }
    return colors[category] || colors.unknown
  }

  return (
    <Chip
      mode="outlined"
      onPress={() => onPress(entity)}
      style={{
        backgroundColor: getChipColor(entity.category),
        marginRight: 8,
      }}
    >
      {entity.name}
    </Chip>
  )
}