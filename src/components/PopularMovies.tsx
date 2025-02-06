import { View, Text, FlatList, StatusBar, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { defaultStyles } from '../util/defaultStyles';
import { Movie } from '../util/interfaces/MovieInterface';
import { getPopularMovies } from '../util/movieDbApi';
import BigMovieCard from './BigMovieCard';
import { colors } from '../util/colors';

const PopularMovies = () => {
  const [movies, setMovies] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    const fetchPopularMovies = async () => {
      const resp = await getPopularMovies()
      setMovies(resp)
    }

    fetchPopularMovies()
  }, [])

  const renderItem = ({ item }: { item: Movie }) => (
    <BigMovieCard key={item.id.toString()} movie={item} />
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
    <View style={[
      defaultStyles.container,
      {
        justifyContent: 'center',
        padding: 10,
        gap: 15
      }
    ]}>
      <Text style={[defaultStyles.defaultTextColor, defaultStyles.h1]}>Destaques da semana 🔥</Text>

      <View style={{

      }}>
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
      </View>

      <StatusBar translucent />
    </View>
  )
}

const styles = StyleSheet.create({
})

export default PopularMovies