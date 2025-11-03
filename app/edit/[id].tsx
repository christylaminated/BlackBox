import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getEntryById, updateEntry } from '../../utils/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EDIT_DRAFT_KEY = '@journal_edit_draft_';

export default function EditEntryScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalBody, setOriginalBody] = useState('');
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadEntry();
  }, [id]);

  useEffect(() => {
    if (!isLoading) {
      saveDraft();
    }
  }, [title, body, isLoading]);

  const getDraftKey = () => {
    return `${EDIT_DRAFT_KEY}${id}`;
  };

  const loadEntry = async () => {
    if (typeof id === 'string') {
      const entry = await getEntryById(parseInt(id, 10));
      if (entry) {
        // Check for draft first
        try {
          const draft = await AsyncStorage.getItem(getDraftKey());
          if (draft) {
            const { title: draftTitle, body: draftBody } = JSON.parse(draft);
            setTitle(draftTitle || '');
            setBody(draftBody || '');
          } else {
            setTitle(entry.title || '');
            setBody(entry.body || '');
          }
        } catch (error) {
          console.error('Error loading draft:', error);
          setTitle(entry.title || '');
          setBody(entry.body || '');
        }
        setOriginalTitle(entry.title || '');
        setOriginalBody(entry.body || '');
      }
      setIsLoading(false);
    }
  };

  const saveDraft = async () => {
    try {
      if (title !== originalTitle || body !== originalBody) {
        await AsyncStorage.setItem(getDraftKey(), JSON.stringify({ title, body }));
      }
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const clearDraft = async () => {
    try {
      await AsyncStorage.removeItem(getDraftKey());
    } catch (error) {
      console.error('Error clearing draft:', error);
    }
  };

  const handleSave = async () => {
    if (!body.trim()) {
      Alert.alert('Error', 'Entry body is required');
      return;
    }

    setIsSaving(true);
    try {
      if (typeof id === 'string') {
        await updateEntry({
          id: parseInt(id, 10),
          title: title.trim(),
          body: body.trim(),
        });
        await clearDraft();
        Alert.alert('Success', 'Entry updated successfully', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update entry');
      console.error('Error updating entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (title !== originalTitle || body !== originalBody) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: async () => {
              await clearDraft();
              router.back();
            },
          },
        ]
      );
    } else {
      router.back();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title (optional)"
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.bodyInput}
            placeholder="Write your thoughts..."
            placeholderTextColor="#999"
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
          disabled={isSaving}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingVertical: 8,
  },
  bodyInput: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    minHeight: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
