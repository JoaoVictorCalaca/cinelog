import { View, Text } from 'react-native'
import React from 'react'
import { defalutStyles } from '../util/defaultStyles'
import { StatusBar } from 'expo-status-bar'

const index = () => {
  return (
    <View style={[
      defalutStyles.container,
      {
        justifyContent: 'center',
        alignItems: 'center'
      }
    ]}>
      <Text style={defalutStyles.colorWhite}>Página home</Text>

      <StatusBar translucent />
    </View>
  )
}

export default index