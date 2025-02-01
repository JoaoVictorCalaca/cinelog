import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../../util/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { iconSize } from '../../util/defaultStyles';
import React from 'react';
import { Image } from 'react-native';

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: colors.blue,
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           backgroundColor: colors.black
//         }
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           tabBarShowLabel: false,
//           tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'home' : 'home-outline'} color={color} />,
//         }}
//       />

//       <Tabs.Screen
//         name="search"
//         options={{
//           tabBarShowLabel: false,
//           tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'search' : 'search-outline'} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        drawerStyle: {
          backgroundColor: '#121212'
        },
        headerStyle: {
          backgroundColor: colors.black,
          borderColor: colors.blue,
          borderBottomWidth: 2
        },
        headerTintColor: colors.white,
        drawerInactiveTintColor: colors.white,
        drawerActiveTintColor: colors.white,
        drawerActiveBackgroundColor: colors.blue
      }}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Início',
            title: 'Filmes em alta 🔥',
            drawerIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'flame' : 'flame-outline'} color={color} />,
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
