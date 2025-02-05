import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../../util/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Image, Text, View } from 'react-native';

//conteúdo personalizado do drawer
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          paddingHorizontal: 20
        }}
      >
        <Image
          source={require('../../../assets/images/cinelog-logo.png')}
          style={{ width: 100, marginBottom: 10, }}
          resizeMode='contain'
        />
      </View>

      <DrawerItemList {...props} />

      <View style={{ padding: 20 , gap: 20}}>
        <Text style={{ color: colors.gray, fontSize: 14, textAlign: 'center' }}>
          © 2025 CineLog - Todos os direitos reservados.
        </Text>

        <Text style={{ color: colors.gray, fontSize: 14, textAlign: 'center' }}>
          Powered by The Movie Database API.
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#121212',
          },
          headerStyle: {
            backgroundColor: colors.black,
            borderColor: colors.blue,
            borderBottomWidth: 2
          },
          headerTintColor: colors.white,
          drawerInactiveTintColor: colors.white,
          drawerActiveTintColor: colors.white,
          drawerActiveBackgroundColor: colors.blue,
        }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Explorar',
            title: 'Descobrir filmes',
            drawerIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'compass' : 'compass-outline'} color={color} />,
          }}
        />
        <Drawer.Screen
          name="search"
          options={{
            drawerLabel: 'Pesquisar',
            title: 'Pesquisar',
            drawerIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'search' : 'search-outline'} color={color} />
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: 'Perfil',
            title: 'Perfil',
            drawerIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
