import { StyleSheet, ScrollView, Button, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '../../util/defaultStyles'
import PopularMovies from '@/src/components/PopularMovies'
import NowPlayingMovies from '@/src/components/NowPlayingMovies'
import UpcomingMovies from '@/src/components/UpcomingMovies'
import BestRatedMovies from '@/src/components/BestRatedMovies'
import { StatusBar } from 'expo-status-bar'

const index = () => {
  return (
    <View style={[defaultStyles.container, { gap: 20 }]}>
      <PopularMovies />
      <StatusBar translucent style='light' />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default index