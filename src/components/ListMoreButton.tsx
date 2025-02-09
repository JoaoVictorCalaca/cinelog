import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../util/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { defaultStyles, iconSize } from '../util/defaultStyles'

interface ListMoreButtonProps {
  page: number,
  fetchMovies: (page: number) => void
}

const ListMoreButton: React.FC<ListMoreButtonProps> = ({ page, fetchMovies }) => {
  return (
    <>
      {page < 5 && (
        <TouchableOpacity
          onPress={() => fetchMovies(page + 1)}
          style={styles.loadBtn}
        >
          <Text style={[defaultStyles.colorBlack, defaultStyles.paragraph]}>Ver mais</Text>
          <Ionicons name='reload' color={colors.black} size={iconSize} />
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  loadBtn: {
    backgroundColor: colors.green,
    padding: 10,
    width: '100%',
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 15
  },
})

export default ListMoreButton