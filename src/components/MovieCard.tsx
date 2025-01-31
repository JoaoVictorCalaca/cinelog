import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import RateStars from './RateStars'
import { Link, router } from 'expo-router'
import { colors } from '../app/util/colors'
import { defalutStyles } from '../app/util/defaultStyles'
import { Movie } from '../app/util/interfaces/MovieInterface'

interface MovieCardProps {
  movie: Movie | null
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [votes, setVotes] = React.useState<number | undefined>(0)

  React.useEffect(() => {
    const handleRateStars = (rate: number = 0) => {
      let formatedRate = rate / 2
      formatedRate = Math.round(formatedRate)

      setVotes(formatedRate)
    }

    handleRateStars(movie?.vote_average ?? 0)
  }, [])

  const navigateToMoviePage = () => {
    router.push('/MoviePage')
  }

  //formatar a data de lançamento
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  if (!movie) {
    return (
      <View style={[styles.container, { backgroundColor: colors.gray }]}>
        <ActivityIndicator size={'large'} color={colors.blue} />
      </View>
    );
  }

  return (
    <Link
      href={{
        pathname: '/MoviePage',
        params: { id: movie.id },
      }}
      onPress={navigateToMoviePage}
    >
      <View style={styles.container}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }} style={{
          width: 110,
          height: 165,
          borderRadius: 12
        }} />

        <View style={styles.box}>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode='tail'
              style={[
                defalutStyles.h1,
                defalutStyles.colorWhite,
                styles.title,
                { fontWeight: 'bold' }
              ]}>{movie?.title}</Text>

            <Text
              numberOfLines={6}
              ellipsizeMode='tail'
              style={[
                defalutStyles.paragraph,
                defalutStyles.colorWhite,
                styles.title,
                {
                  fontWeight: 'bold'
                }
              ]}>{formatDate(movie?.release_date)}</Text>
          </View>

          <Text
            numberOfLines={6}
            ellipsizeMode='tail'
            style={[
              defalutStyles.paragraph,
              defalutStyles.colorWhite,
              styles.title
            ]}>{movie?.overview}</Text>

          <View style={{
            flexDirection: 'row'
          }}>
            <RateStars id={movie.id} rating={votes} />
            <Text style={[
              defalutStyles.paragraph,
              {
                color: colors.gold
              }
            ]}>/5</Text>
          </View>
        </View>
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    flexDirection: 'row',
    padding: 5,
    width: '100%',
    justifyContent: 'space-around',
    gap: 20
  },

  box: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
    gap: 6
  },

  title: {
    flexShrink: 1
  }
})

export default MovieCard
