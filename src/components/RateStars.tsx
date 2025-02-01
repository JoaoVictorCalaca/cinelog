import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '../util/colors'
import { iconSize } from '../util/defaultStyles'

interface RateStarsProps {
  rating: number | undefined,
  id: string | undefined
}

const RateStars: React.FC<RateStarsProps> = ({ rating, id }) => {
  const maxStars = Math.max(1, rating ?? 1)

  return (
    <View
      style={{
        flexDirection: 'row'
      }}
    >
      {[...Array(maxStars)].map((_, index) => (
        <Ionicons
          key={index}
          name='star'
          color={colors.gold}
          size={iconSize}
        />
      ))}
    </View>
  )
}

export default RateStars