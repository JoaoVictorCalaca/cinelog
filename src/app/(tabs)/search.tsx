import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import { getMovies } from "../util/movieDbApi";
import MovieCard from "@/src/components/MovieCard";
import { colors } from "../util/colors";
import { defalutStyles, iconSize } from "../util/defaultStyles";
import { Movie } from "../util/interfaces/MovieInterface";

export default function Search() {
  const [query, setQuery] = React.useState<string>('')
  const [movies, setMovies] = React.useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    const resp = await getMovies(query)
    setMovies(resp);
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard key={item.id} movie={item} />
  )

  return (
    <View style={[
      defalutStyles.container,
      { paddingHorizontal: 20 }
    ]}>
      <View style={styles.header}>
        <View style={styles.searchInput}>
          <TextInput
            placeholder="Ex: Ainda Estou Aqui"
            placeholderTextColor={colors.gray}
            style={{ color: colors.white, width: '90%' }}
            cursorColor={colors.blue}
            selectionColor={colors.blue}
            keyboardType="web-search"
            returnKeyType="search"
            inputMode="search"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => handleSearch(query)}
          />

          <Ionicons name='search' color={colors.blue} size={iconSize} />
        </View>
      </View>

      <View style={styles.box}>
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
      </View>


      <StatusBar style="light" translucent />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight + 8 : 80,
    gap: 4
  },

  box: {
    paddingVertical: 20
  },

  searchInput: {
    borderWidth: 2,
    borderColor: colors.blue,
    paddingHorizontal: 10,
    color: colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 45
  },

  flatlist: {
    width: '100%',
  }
})
