import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="MoviePage" options={{ headerShown: false }} />

      <StatusBar translucent style='light'/>
    </Stack>
  );
}
