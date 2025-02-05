import { View, Text, FlatList, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { defalutStyles } from '../util/defaultStyles';
import { Movie } from '../util/interfaces/MovieInterface';
import { getUpcomingMovies } from '../util/movieDbApi';
import MovieCard from './MovieCard';

const UpcomingMovies = () => {
  const [movies, setMovies] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    const fetchPopularMovies = async () => {
      const resp = await getUpcomingMovies()
      setMovies(resp)
    }

    fetchPopularMovies()
  }, [])

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard showText={true} key={item.id.toString()} movie={item} />
  )

  return (
    <View style={[
      defalutStyles.container,
      {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
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

export default UpcomingMovies