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
import Constants from 'expo-constants'
import { getMovies } from "../../util/movieDbApi";
import MovieCard from "@/src/components/MovieCard";
import { colors } from "../../util/colors";
import { defaultStyles, iconSize } from "../../util/defaultStyles";
import { Movie } from "../../util/interfaces/MovieInterface";

export default function Search() {
  const [query, setQuery] = React.useState<string>('')
  const [movies, setMovies] = React.useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    const resp = await getMovies(query)
    setMovies(resp);
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieCard showText={true} key={item.id} movie={item} />
  )

  if (movies === null) {
    return (
      <View style={[
        defaultStyles.container,
        defaultStyles.centerContent,
        {
          paddingHorizontal: 20,
          gap: 40
        }
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

            <Ionicons name='search' color={colors.gray} size={iconSize} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[
      defaultStyles.container,
      { paddingHorizontal: 20 }
    ]}>
      <View>
        <FlatList
          renderItem={renderItem}
          data={Array.isArray(movies) ? movies : movies ? [movies] : []}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: 20
          }}
          style={styles.flatlist}
          ListHeaderComponent={(
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

                <Ionicons name='search' color={colors.gray} size={iconSize} />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 20,
    gap: 4
  },

  searchInput: {
    borderWidth: 2,
    borderColor: colors.gray,
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
