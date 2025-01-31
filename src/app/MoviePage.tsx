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
  Modal
} from 'react-native'
import React from 'react'
import {
  Link,
  router,
  useLocalSearchParams
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import RateStars from '@/src/components/RateStars';
import { colors } from './util/colors';
import {
  defalutStyles,
  iconSize
} from './util/defaultStyles';
import { Movie } from './util/interfaces/MovieInterface';
import { getMovieById, getMovieTrailer } from './util/movieDbApi';
import ViewShot, { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import RateAndShare from '../components/RateAndShare';

const MoviePage = () => {
  const params = useLocalSearchParams();
  const { id } = params
  const [movie, setMovie] = React.useState<Movie | null>()
  const viewRef = React.useRef<ViewShot>(null);
  const [imageUri, setImageUri] = React.useState<string | null>(null)
  const [trailerUrl, setTrailerUrl] = React.useState<string | null>(null)
  const [shareModalVisible, setShareModalVisible] = React.useState<boolean>(false)

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

    handleMovieFetch()
    fetchTrailer()
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

  const shareReview = async () => {
    if (viewRef.current) {
      try {
        const uri = await captureRef(viewRef, {
          format: "jpg",
          quality: 1,
        });
        setImageUri(uri);

        const newPath = `${FileSystem.documentDirectory}captured.png`;
        await FileSystem.moveAsync({
          from: uri,
          to: newPath,
        });

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(newPath)
        }

      } catch (error) {
        console.error("Erro ao capturar screenshot: ", error);
      }
    }
  }

  const startSharing = () => {
    setShareModalVisible(true)
  }

  if (!movie) {
    return (
      <View style={[
        defalutStyles.container,
        defalutStyles.centerContent
      ]}>
        <ActivityIndicator size='large' color={colors.blue} />

        <StatusBar translucent />
      </View>
    )
  }

  return (
    <View style={[
      styles.container,
      defalutStyles.container
    ]}>
      <TouchableOpacity onPress={closePage} style={styles.backButton}>
        <Ionicons
          name='arrow-back'
          color={colors.black}
          size={iconSize}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={[
        styles.scrollview,
      ]}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }} style={{
          width: 220,
          height: 330,
          borderRadius: 12,
          alignSelf: 'center'
        }} />

        {trailerUrl && (
          <TouchableOpacity onPress={watchTrailer} style={[{ flexDirection: 'row', gap: 6 }, defalutStyles.centerContent]}>
            <Text style={[defalutStyles.colorWhite, defalutStyles.paragraph]}>Assistir ao railer</Text>
            <Ionicons name='logo-youtube' color={colors.white} size={iconSize} />
          </TouchableOpacity>
        )}

        <ViewShot
          ref={viewRef}
          options={{ format: "jpg", quality: 0.9 }}
          style={{
            flexDirection: 'row',
          }}>
          <Text
            style={[
              defalutStyles.colorWhite,
              defalutStyles.paragraph
            ]}
          >Avaliação média dos usuários: </Text>
          <RateStars id={movie.id} rating={Math.max(1, Math.round((movie.vote_average ?? 0) / 2))} />
          <Text style={[
            defalutStyles.paragraph,
            {
              color: colors.gold
            }
          ]}>/5</Text>
        </ViewShot>

        <View style={styles.box}>
          <Text
            style={[
              defalutStyles.h1,
              defalutStyles.colorWhite,
              { fontWeight: 'bold' }
            ]}>{movie?.title}</Text>

          <Text
            style={[
              defalutStyles.paragraph,
              defalutStyles.colorWhite,
            ]}>{movie?.overview}</Text>
        </View>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={startSharing}>
          <Text
            style={[
              defalutStyles.colorWhite,
              defalutStyles.paragraph
            ]}
          >Avaliar</Text>
          <Ionicons name='star-half-outline' color={colors.white} size={iconSize}/>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={shareModalVisible}
        animationType='fade'
        transparent
      >
        <RateAndShare modalVisible={setShareModalVisible} movie={movie} />
      </Modal>
      <StatusBar translucent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 80,
    paddingHorizontal: 20,
    gap: 20
  },

  scrollview: {
    gap: 20,
    paddingBottom: 20
  },

  box: {
    width: '100%',
  },

  backButton: {
    backgroundColor: colors.white,
    width: 30,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },

  shareButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6
  }
})

export default MoviePage