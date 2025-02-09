import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles, iconSize } from '../util/defaultStyles'
import { getMovieImage } from '../util/movieDbApi'
import { StatusBar } from 'expo-status-bar'
import { router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '../util/colors'

const images = ['ziECpBRIyclmBNaFSWlvCfsKbMD', 'j0IobR8VH9x0Y5koAcnB7VkPW04', 'jIRpHvS2pQIz2hWR2RZs10hTvOs', 'ejdD20cdHNFAYAN2DlqPToXKyzx']

const index = () => {
  const [imageUrl, setImageUrl] = React.useState<string>()

  React.useEffect(() => {
    const chooseImage = () => {
      const i = Math.floor(Math.random() * 3)
      setImageUrl(images[i])
    };

    chooseImage();
  }, []);

  return (
    <View style={[
      defaultStyles.container,
      {
        justifyContent: 'space-between'
      }
    ]}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/original/${imageUrl}.jpg` }}
        alt='Background'
        style={{
          width: '100%',
          height: 210,
          resizeMode: 'cover'
        }}
      />
      <View style={styles.container}>
        <Text style={[defaultStyles.defaultTextColor, defaultStyles.h1]}>Autenticar com:</Text>

        <TouchableOpacity style={styles.authBtn}>
          <Ionicons name='logo-google' color={colors.black} size={iconSize} />
          <Text style={[defaultStyles.colorBlack, defaultStyles.paragraph]}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authBtn}>
          <Ionicons name='logo-facebook' color={colors.black} size={iconSize} />
          <Text style={[defaultStyles.colorBlack, defaultStyles.paragraph]}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authBtn}>
          <Ionicons name='logo-github' color={colors.black} size={iconSize} />
          <Text style={[defaultStyles.colorBlack, defaultStyles.paragraph]}>Github</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authBtn}>
          <Ionicons name='logo-microsoft' color={colors.black} size={iconSize} />
          <Text style={[defaultStyles.colorBlack, defaultStyles.paragraph]}>Microsoft</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <Image
          source={require('../../assets/images/cinelog-logo.png')}
          style={{ width: 80, height: 69 }}
          resizeMode='contain'
        />

        <Text style={[defaultStyles.defaultTextColor]}>Data pruved by: TMDB API</Text>
      </View>

      <Button title='acessar' onPress={() => router.push('/(drawer)')} />

      <StatusBar translucent style='dark' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 15,
  },

  authBtn: {
    backgroundColor: colors.green,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    gap: 10
  },

  box: {
    padding: 20,
    alignItems: 'center'
  }
})

export default index