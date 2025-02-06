import { View, Text, FlatList, StatusBar, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { defaultStyles } from '../util/defaultStyles';
import { Movie } from '../util/interfaces/MovieInterface';
import { getBestRatedMovies } from '../util/movieDbApi';
import MovieCard from './MovieCard';
import { colors } from '../util/colors';

const BestRatedMovies = () => {
  const [movies, setMovies] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    const fetchPopularMovies = async () => {
      const resp = await getBestRatedMovies()
      setMovies(resp)
    }

    fetchPopularMovies()
  }, [])

  const renderItem = ({ item, index }: { item: Movie, index: number }) => (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[defaultStyles.h1, { color: colors.gold }]}>{`${index + 1}°`}</Text>
      <MovieCard showText={false} key={item.id.toString()} movie={item} />
    </View>
  )

  if (!movies) {
    return (
      <View style={[
        defaultStyles.container,
        defaultStyles.centerContent
      ]}>
        <ActivityIndicator size='large' color={colors.blue} />
      </View>
    )
  }

  return (
    <View
      style={[
        defaultStyles.container,
        {
          justifyContent: 'center',
          gap: 15,
          padding: 10
        }
      ]}>
      <Text style={[defaultStyles.defaultTextColor, defaultStyles.h1]}>Melhor avaliados 🌟</Text>

      <FlatList
        renderItem={renderItem}
        data={Array.isArray(movies) ? movies : movies ? [movies] : []}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          gap: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <StatusBar translucent />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default BestRatedMovies