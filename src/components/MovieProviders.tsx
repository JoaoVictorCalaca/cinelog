import { View, Text, Linking, TouchableOpacity, Image } from 'react-native'
import { defaultStyles } from '../util/defaultStyles'

interface MovieprovidersProps {
  providers: WatchProvidersResponse | null
}

const Movieproviders: React.FC<MovieprovidersProps> = ({ providers }) => {
  const handleCategoryTranslante = (englishCategory: string) => {
    switch (englishCategory) {
      case 'free':
        return 'Grátis'
        break;
      case 'buy':
        return 'Compra'
        break;
      case 'rent':
        return 'Aluguel'
        break;
      case 'flatrate':
        return 'Streaming'
        break;
      default:
        break;
    }
  }
  
  if (providers === null) {
    return (
      <Text
        style={[
          defaultStyles.defaultTextColor,
          defaultStyles.paragraph
        ]}
      >
        Ainda não temos informações sobre onde assistir esse filme.
      </Text>
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
          defaultStyles.defaultTextColor,
          defaultStyles.paragraph,
          {
            fontWeight: 'bold'
          }]}
      >Onde assistir:</Text>

      <View
        style={{
          gap: 10
        }}
      >
        {["free", "buy", "rent", "flatrate"].map((category) => {
          const categoryProviders = providers?.[category as keyof Provider];

          if (!categoryProviders) return null;

          return categoryProviders.map((provider: any) => {
            if (!provider.logo_path) return null;

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
                    defaultStyles.defaultTextColor,
                    defaultStyles.paragraph
                  ]}
                >
                  • {provider.provider_name} | {handleCategoryTranslante(category)}
                </Text>
              </View>
            );
          });
        })}
      </View>
      <Text style={[defaultStyles.defaultTextColor, defaultStyles.paragraph]}>Dados de provedores fornecidos por: JustWatch</Text>
    </View>
  )
}

export default Movieproviders