import { View, Text, StyleSheet, Button, Pressable, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { defalutStyles, iconSize } from '../app/util/defaultStyles'
import { Movie } from '../app/util/interfaces/MovieInterface'
import { colors } from '../app/util/colors'
import ViewShot, { captureRef } from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import * as FileSystem from 'expo-file-system'
import Ionicons from '@expo/vector-icons/Ionicons'

interface RateAndShareProps {
  modalVisible: (visible: boolean) => void,
  movie: Movie
}

const RateAndShare: React.FC<RateAndShareProps> = ({ modalVisible, movie }) => {
  const viewRef = React.useRef<ViewShot>(null);
  const [imageUri, setImageUri] = React.useState<string | null>(null)
  const [rating, setRating] = React.useState<number>(0)

  const closeModal = () => {
    modalVisible(false)
  }

  const handleRate = (newRating: number) => {
    setRating(newRating)
  }

  const handlePress = (e: any) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <Pressable onPress={handlePress} style={styles.container}>

      <ViewShot
        ref={viewRef}
        options={{ format: "png", quality: 1 }}
        style={styles.box}
      >
        <Image source={{ uri: `https://image.tmdb.org/t/p/original${movie.poster_path}` }} style={{
          width: 220,
          height: 330,
          borderRadius: 12
        }} />

        <View>
          <Text
            style={[
              defalutStyles.colorWhite,
              defalutStyles.paragraph,
              styles.title
            ]}
          >{movie.title}</Text>

          <Text
            style={[
              defalutStyles.colorWhite,
              defalutStyles.paragraph,
            ]}
          >{formatDate(movie.release_date)}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          gap: 4
        }}>
          {[1, 2, 3, 4, 5].map((index) => (
            <TouchableOpacity onPress={() => handleRate(index)}>
              <Ionicons name={index <= rating ? 'star' : 'star-outline'} color={colors.gold} size={iconSize + 6} />
            </TouchableOpacity>
          ))}
        </View>

        <Text
          style={[
            defalutStyles.colorWhite,
            defalutStyles.paragraph,
            styles.title,
          ]}
        >Shared with Cinelog 🔥</Text>
      </ViewShot>

      <TouchableOpacity
        onPress={shareReview}
        style={styles.shareButton}
      >
        <Text
          style={[
            defalutStyles.colorWhite,
            defalutStyles.paragraph
          ]}
        >Compartilhar</Text>
        <Ionicons name='share-outline' color={colors.white} size={iconSize} />
      </TouchableOpacity>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 0,
    gap: 50
  },

  box: {
    width: '77%',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: colors.blue,
    gap: 15,
    backgroundColor: colors.black
  },

  title: {
    fontWeight: 'bold'
  },

  shareButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6
  },
})

export default RateAndShare