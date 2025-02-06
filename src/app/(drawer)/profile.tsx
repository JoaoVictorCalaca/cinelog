import { View, Text } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/src/util/defaultStyles'

const profile = () => {
  return (
    <View style={[defaultStyles.centerContent, defaultStyles.container]}>
      <Text style={defaultStyles.defaultTextColor}>Em breve</Text>
    </View>
  )
}

export default profile