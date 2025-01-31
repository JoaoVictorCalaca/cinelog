import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { defalutStyles } from '../util/defaultStyles'
import { StatusBar } from 'expo-status-bar'
import { Movie } from '../util/interfaces/MovieInterface'
import MovieCard from '@/src/components/MovieCard'
import { getPopularMovies } from '../util/movieDbApi'

const index = () => {
  const [movies, setMovies] = React.useState<Movie | null>(null);

  React.useEffect(()=> {
    const fetchPopularMovies = async () => {
      const resp = await getPopularMovies()
      setMovies(resp)
    }

    fetchPopularMovies()
  }, [])

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard key={item.id.toString()} movie={item} />
  )

  return (
    <View style={[
      defalutStyles.container,
      {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      }
    ]}>
      <FlatList
        renderItem={renderItem}
        data={Array.isArray(movies) ? movies : movies ? [movies] : []}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 90
        }}
        style={styles.flatlist}
      />

      <StatusBar translucent />
    </View>
  )
}

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 20,
    width: '100%',
  }
})


export default index