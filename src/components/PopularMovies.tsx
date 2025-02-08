import { View, Text, FlatList, StatusBar, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '../util/defaultStyles';
import { Movie } from '../util/interfaces/MovieInterface';
import { getPopularMovies } from '../util/movieDbApi';
import BigMovieCard from './BigMovieCard';
import { colors } from '../util/colors';
import MovieCard from './MovieCard';
import ListMoreButton from './ListMoreButton';

const PopularMovies = () => {
  const [movies, setMovies] = React.useState<Movie[] | null>(null);
  const [page, setPage] = React.useState<number>(1)

  React.useEffect(() => {
    fetchMovies(1)
  }, [])

  const fetchMovies = async (pageNumber: number) => {
    try {
      const data = await getPopularMovies(pageNumber)

      if (!data || !Array.isArray(data.results)) {
        throw new Error('Resposta inválida da API');
      }

      setMovies(prevMovies => [...prevMovies ?? [], ...data.results])
      setPage(pageNumber)
    } catch (e) {
      console.error(`Error in fetch: ${e}`);

    }
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard showText={false} key={item.id.toString()} movie={item} />
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
      <FlatList
        renderItem={renderItem}
        data={Array.isArray(movies) ? movies : movies ? [movies] : []}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={(
          <Text
            key={'#'}
            style={[
              defaultStyles.defaultTextColor,
              defaultStyles.h1,
              {
                marginBottom: 10
              }
            ]}>Populares da semana</Text>
        )}
        ListFooterComponent={(
          <ListMoreButton
            page={page}
            fetchMovies={fetchMovies}
            key={'@'}
         />
        )}
      />
      <StatusBar translucent />
    </View>
  )
}

const styles = StyleSheet.create({
})

export default PopularMovies