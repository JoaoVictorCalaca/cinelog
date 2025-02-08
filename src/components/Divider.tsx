import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../util/colors'

const Divider = () => {
  return (
    <View style={{
      height: 1,
      width: '100%',
      backgroundColor: colors.gray,
    }}/>
  )
}

export default Divider