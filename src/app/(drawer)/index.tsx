import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { defaultStyles } from '../../util/defaultStyles'
import PopularMovies from '@/src/components/PopularMovies'
import NowPlayingMovies from '@/src/components/NowPlayingMovies'
import UpcomingMovies from '@/src/components/UpcomingMovies'
import BestRatedMovies from '@/src/components/BestRatedMovies'
import { StatusBar } from 'expo-status-bar'

const index = () => {
  return (
    <ScrollView style={[defaultStyles.container]} contentContainerStyle={{ gap: 20 }}>
      <PopularMovies />
      <NowPlayingMovies />
      <UpcomingMovies />
      <BestRatedMovies />

      <StatusBar translucent style='light'/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

})

export default index