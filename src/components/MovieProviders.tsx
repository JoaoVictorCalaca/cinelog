import { View, Text, Linking, TouchableOpacity, Image } from 'react-native'
import { defalutStyles } from '../util/defaultStyles'

interface MovieprovidersProps {
  providers: WatchProvidersResponse | null
}

const Movieproviders: React.FC<MovieprovidersProps> = ({ providers }) => {
  console.log(providers);
  

  if (providers === null) {
    return (
      <Text style={[defalutStyles.colorWhite, defalutStyles.paragraph]}>Ainda não temos informações sobre onde assistir esse filme.</Text>
    )
  }

  return (
    <View
      style={{
        gap: 20
      }}
    >
      <Text
        style={[
          defalutStyles.colorWhite,
          defalutStyles.paragraph,
          {
            fontWeight: 'bold'
          }]}
      >Onde assistir:</Text>

      <View
        style={{
          gap: 10
        }}
      >
        {["free", "buy", "rent", "flatrate"].map((category) => (
          providers?.[category as keyof Provider]?.map((provider: any) => {
            if (!provider.logo_path) return null

            return (
              <View
                key={provider.provider_id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${provider.logo_path}` }}
                  style={{
                    width: 50,
                    aspectRatio: 1 / 1,
                    borderRadius: 12
                  }}
                />
                <Text
                  style={[
                    defalutStyles.colorWhite,
                    defalutStyles.paragraph
                  ]}
                >
                  • {provider.provider_name}
                </Text>
              </View>
            );
          })
        ))}
      </View>
    </View>
  )
}

export default Movieproviders