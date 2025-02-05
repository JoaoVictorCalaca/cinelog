import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { defalutStyles } from '../../util/defaultStyles'
import PopularMovies from '@/src/components/PopularMovies'
import { colors } from '@/src/util/colors'
import NowPlayingMovies from '@/src/components/NowPlayingMovies'
import BestRatedMovies from '@/src/components/BestRatedMovies'
import UpcomingMovies from '@/src/components/UpcomingMovies'

const index = () => {
  const [activeFilter, setActiveFilter] = React.useState<number>(0)
  const options = ['Em exibição', 'Populares da semana', 'Melhor avaliados', 'Em breve']

  const handleFilterOption = (index: number) => {
    setActiveFilter(index)
  }

  const componentsArray = [
    <NowPlayingMovies />,
    <PopularMovies />,
    <BestRatedMovies />,
    <UpcomingMovies />,
  ];

  return (
    <View style={[defalutStyles.container]}>
      <View style={{ height: 50 }}>
        <ScrollView
          horizontal
          style={{ flexDirection: 'row' }}
          contentContainerStyle={{ gap: 8, padding: 5 }}
          showsHorizontalScrollIndicator={false}
        >
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={()=> handleFilterOption(index)} style={[styles.optionBtn, { backgroundColor: activeFilter === index ? colors.blue : colors.darkGray }]}>
              <Text style={[defalutStyles.colorWhite, defalutStyles.paragraph]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {componentsArray[activeFilter]}
    </View>
  )
}

const styles = StyleSheet.create({
  optionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 45,
    borderRadius: 12
  }
})

export default index