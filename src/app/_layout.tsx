import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="moviePage" options={{ headerShown: false }} />

      <StatusBar translucent style='light'/>
    </Stack>
  );
}
