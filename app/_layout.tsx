import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../utils/database';

export default function RootLayout() {
  useEffect(() => {
    initDatabase().catch(console.error);
  }, []);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'My Journal',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="new-entry"
        options={{
          title: 'New Entry',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="entry/[id]"
        options={{
          title: 'Entry Details',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="edit/[id]"
        options={{
          title: 'Edit Entry',
          presentation: 'modal',
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
