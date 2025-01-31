import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '../app/util/colors'
import { iconSize } from '../app/util/defaultStyles'

interface RateStarsProps {
  rating: number | undefined,
  id: string | undefined
}

const RateStars: React.FC<RateStarsProps> = ({ rating, id }) => {
  const maxStars = Math.max(1, rating ?? 1)

  return (
    <View
      key={id}
      style={{
        flexDirection: 'row'
      }}
    >
      {[...Array(maxStars)].map((_, index) => (
        <Ionicons
          name='star'
          color={colors.gold}
          size={iconSize}
        />
      ))}
    </View>
  )
}

export default RateStars