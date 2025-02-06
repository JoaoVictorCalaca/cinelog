import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Button,
  Linking,
  Modal,
  FlatList
} from 'react-native'
import React from 'react'
import {
  Link,
  router,
  useLocalSearchParams
} from 'expo-router';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import RateStars from '@/src/components/RateStars';
import { colors } from '.././util/colors';
import {
  defaultStyles,
  iconSize
} from '.././util/defaultStyles';
import { Movie } from '.././util/interfaces/MovieInterface';
import { formatDate, getMovieById, getMovieTrailer, getSimilarMovies, getWatchProviders } from '.././util/movieDbApi';
import RateAndShare from '../components/RateAndShare';
import MovieProviders from '../components/MovieProviders';
import MovieCard from '../components/MovieCard';
import { LinearGradient } from 'expo-linear-gradient';

const MoviePage = () => {
  const params = useLocalSearchParams();
  const { id } = params
  const [movie, setMovie] = React.useState<Movie | null>()
  const [trailerUrl, setTrailerUrl] = React.useState<string | null>(null)
  const [shareModalVisible, setShareModalVisible] = React.useState<boolean>(false)
  const [providers, setProviders] = React.useState<WatchProvidersResponse | null>(null)
  const [similarMovies, setSimilarMovies] = React.useState<Movie | null>(null)

  React.useEffect(() => {
    const handleMovieFetch = async () => {
      const resp = await getMovieById(id.toString())

      setMovie(resp)
    }

    const fetchTrailer = async () => {
      const movieTrailer = await getMovieTrailer(id.toString())
      if (movieTrailer) {
        setTrailerUrl(movieTrailer)
      }
    };

    const fetchProviders = async () => {
      const resp = await getWatchProviders(id.toString())
      if (resp) {
        setProviders(resp)
      }
    }

    const fetchSimilarMovies = async () => {
      const resp = await getSimilarMovies(id.toString())

      setSimilarMovies(resp)
    }

    fetchSimilarMovies()
    handleMovieFetch()
    fetchTrailer()
    fetchProviders()
  }, [])

  const watchTrailer = () => {
    if (trailerUrl) {
      Linking.openURL(trailerUrl)
        .catch((err) => console.error("Erro ao abrir o trailer: ", err));
    }
  }

  const closePage = () => {
    router.back()
  }

  const startSharing = () => {
    setShareModalVisible(true)
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard key={item.id.toString()} showText={false} movie={item} />
  )

  if (!movie) {
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
      styles.container,
      defaultStyles.container
    ]}>
      <TouchableOpacity onPress={closePage} style={styles.backButton}>
        <Ionicons
          name='arrow-back'
          color={colors.black}
          size={iconSize}
        />
      </TouchableOpacity>
      <ScrollView>

        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/original${movie.backdrop_path}` }}
            style={{
              width: '100%',
              height: 210,
            }}
          />

          <LinearGradient
            colors={[
              colors.black, 'rgba(0, 0, 0, 0.38)',
              colors.black
            ]}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              flex: 1,
              bottom: 0,
            }}
          />
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: -85, gap: 20 }}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }} style={{
            width: 220,
            height: 330,
            borderRadius: 12,
            alignSelf: 'center',
          }} />

          {trailerUrl && (
            <TouchableOpacity
              onPress={watchTrailer}
              style={[{
                flexDirection: 'row',
                gap: 6
              },
              defaultStyles.centerContent,
              styles.trailerLink
              ]}
            >
              <Text
                style={[
                  defaultStyles.colorBlack,
                  defaultStyles.paragraph
                ]}
              >Assistir trailer</Text>
              <Ionicons name='logo-youtube' color={colors.black} size={iconSize} />
            </TouchableOpacity>
          )}

          <View style={styles.box}>
            <Text
              style={[
                defaultStyles.h1,
                defaultStyles.defaultTextColor,
                { fontWeight: 'bold' }
              ]}>{movie?.title}</Text>

            <Text
              style={[
                defaultStyles.paragraph,
                defaultStyles.defaultTextColor,
              ]}>{movie?.overview}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={[
                defaultStyles.defaultTextColor,
                defaultStyles.paragraph
              ]}
            >Avaliação média dos usuários: </Text>
            <RateStars id={movie.id} rating={Math.max(1, Math.round((movie.vote_average ?? 0) / 2))} />
          </View>

          <View>
            <Text style={[defaultStyles.defaultTextColor, defaultStyles.paragraph, { fontWeight: 'bold' }]}>Lançado em:
              <Text style={[defaultStyles.defaultTextColor, defaultStyles.paragraph, { fontWeight: 'normal' }]}> {formatDate(movie.release_date)}</Text>
            </Text>
            <Text style={[defaultStyles.defaultTextColor, defaultStyles.paragraph, { fontWeight: 'bold' }]}>Tempo de duração:
              <Text style={[defaultStyles.defaultTextColor, defaultStyles.paragraph, { fontWeight: 'normal' }]}> {movie.runtime}min</Text>
            </Text>
          </View>

          <MovieProviders providers={providers} />

          <View style={{ marginTop: 20, gap: 10 }}>
            <Text style={[defaultStyles.defaultTextColor, defaultStyles.paragraph]}>Quem assistiu {movie.title} também gostou de:</Text>

            <FlatList
              renderItem={renderItem}
              data={Array.isArray(similarMovies) ? similarMovies : similarMovies ? [similarMovies] : []}
              keyExtractor={item => item.id.toString()}
              horizontal
              contentContainerStyle={{
                gap: 10,
              }}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.shareButton}
        onPress={startSharing}>
        <Text
          style={[
            defaultStyles.paragraph,
            defaultStyles.colorBlack,
            {
              fontWeight: 'bold'
            }
          ]}
        >Avaliar</Text>
        <Ionicons name='star' color={colors.black} size={iconSize} />
      </TouchableOpacity>

      <Modal
        visible={shareModalVisible}
        animationType='fade'
        transparent
      >
        <RateAndShare modalVisible={setShareModalVisible} movie={movie} />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 80,
    gap: 20
  },

  box: {
    width: '100%',
    gap: 10
  },

  trailerLink: {
    backgroundColor: colors.green,
    padding: 10,
    width: '55%',
    borderRadius: 12,
    alignSelf: 'center'
  },

  backButton: {
    backgroundColor: colors.white,
    width: 30,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    position: 'absolute',
    top: Platform.OS === 'android' ? Constants.statusBarHeight + 15 : 45,
    left: 20,
    zIndex: 10,
  },

  shareButton: {
    backgroundColor: colors.green,
    padding: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    position: 'absolute',
    bottom: 20,
    right: 20
  }
})

export default MoviePage