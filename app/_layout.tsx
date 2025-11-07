import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Font from 'expo-font';
import {
  Lora_400Regular,
  Lora_600SemiBold,
  Lora_700Bold,
} from '@expo-google-fonts/lora';
import {
  Merriweather_300Light,
  Merriweather_400Regular,
  Merriweather_700Bold,
} from '@expo-google-fonts/merriweather';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { initDatabase } from '../utils/database';

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          Lora_400Regular,
          Lora_600SemiBold,
          Lora_700Bold,
          Merriweather_300Light,
          Merriweather_400Regular,
          Merriweather_700Bold,
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
        });

        // Initialize database
        await initDatabase();

        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading resources:', error);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: '#FBF8F4' }} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="new-entry"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="entry/[id]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
