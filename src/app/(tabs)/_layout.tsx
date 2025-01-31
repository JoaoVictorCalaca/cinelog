import { Tabs } from 'expo-router';
import { colors } from '../util/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { iconSize } from '../util/defaultStyles';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.blue,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.black
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'home' : 'home-outline'} color={color} />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => <Ionicons size={24} name={focused ? 'search' : 'search-outline'} color={color} />,
        }}
      />
    </Tabs>
  );
}
