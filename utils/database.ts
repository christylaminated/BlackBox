import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry, NewJournalEntry, UpdateJournalEntry } from '../types/journal';

// Platform-specific database initialization
let db: any = null;
let isWeb = Platform.OS === 'web';

if (!isWeb) {
  // Only import SQLite on mobile platforms
  const SQLite = require('expo-sqlite');
  try {
    db = SQLite.openDatabaseSync('journal.db');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Web storage functions using AsyncStorage
const WEB_STORAGE_KEY = 'journal_entries';

const getWebEntries = async (): Promise<JournalEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(WEB_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting web entries:', error);
    return [];
  }
};

const setWebEntries = async (entries: JournalEntry[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(WEB_STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error setting web entries:', error);
  }
};

export const initDatabase = async () => {
  try {
    if (isWeb) {
      // Web initialization - check if we need to seed data
      const entries = await getWebEntries();
      if (entries.length === 0) {
        await seedInitialDataWeb();
      }
      return;
    }

    if (!db) {
      console.warn('Database not available, skipping initialization');
      return;
    }

    // Mobile initialization
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        body TEXT NOT NULL,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );
    `);

    // Check if we need to seed data
    const result = await db.getAllAsync('SELECT COUNT(*) as count FROM journal_entries');
    const count = (result[0] as any).count;

    if (count === 0) {
      await seedInitialData();
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    // Don't throw error on web platform
    if (!isWeb) {
      throw error;
    }
  }
};

const seedInitialDataWeb = async () => {
  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();

  const initialEntries: JournalEntry[] = [
    {
      id: 1,
      title: 'My First Journal Entry',
      body: 'Today was a great day! I started using this new journal app to track my thoughts and experiences. I\'m excited to see how this helps me reflect on my daily life.',
      createdAt: yesterday,
      updatedAt: yesterday
    },
    {
      id: 2,
      title: 'Reflections on Learning',
      body: 'I\'ve been learning so much lately. It\'s amazing how documenting your thoughts can help solidify your understanding and track your progress over time.',
      createdAt: now,
      updatedAt: now
    }
  ];

  await setWebEntries(initialEntries);
};

const seedInitialData = async () => {
  if (!db) {
    console.warn('Database not available, skipping seed data');
    return;
  }

  const now = new Date().toISOString();
  const yesterday = new Date(Date.now() - 86400000).toISOString();

  await db.runAsync(
    'INSERT INTO journal_entries (title, body, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
    ['My First Journal Entry', 'Today was a great day! I started using this new journal app to track my thoughts and experiences. I\'m excited to see how this helps me reflect on my daily life.', yesterday, yesterday]
  );

  await db.runAsync(
    'INSERT INTO journal_entries (title, body, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
    ['Reflections on Learning', 'I\'ve been learning so much lately. It\'s amazing how documenting your thoughts can help solidify your understanding and track your progress over time.', now, now]
  );
};

export const getAllEntries = async (): Promise<JournalEntry[]> => {
  try {
    if (isWeb) {
      const entries = await getWebEntries();
      return entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    if (!db) {
      console.warn('Database not available, returning empty entries');
      return [];
    }
    const entries = await db.getAllAsync('SELECT * FROM journal_entries ORDER BY createdAt DESC');
    return entries as JournalEntry[];
  } catch (error) {
    console.error('Error getting all entries:', error);
    return [];
  }
};

export const getEntryById = async (id: number): Promise<JournalEntry | null> => {
  try {
    if (isWeb) {
      const entries = await getWebEntries();
      return entries.find(entry => entry.id === id) || null;
    }

    if (!db) {
      console.warn('Database not available, returning null');
      return null;
    }
    const entry = await db.getFirstAsync('SELECT * FROM journal_entries WHERE id = ?', [id]);
    return entry as JournalEntry | null;
  } catch (error) {
    console.error('Error getting entry by id:', error);
    return null;
  }
};

export const createEntry = async (entry: NewJournalEntry): Promise<number> => {
  try {
    const now = new Date().toISOString();
    
    if (isWeb) {
      const entries = await getWebEntries();
      const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
      const newEntry: JournalEntry = {
        id: newId,
        title: entry.title,
        body: entry.body,
        createdAt: now,
        updatedAt: now
      };
      entries.push(newEntry);
      await setWebEntries(entries);
      return newId;
    }

    if (!db) {
      console.warn('Database not available, cannot create entry');
      return 0;
    }
    
    const result = await db.runAsync(
      'INSERT INTO journal_entries (title, body, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
      [entry.title, entry.body, now, now]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error creating entry:', error);
    if (!isWeb) {
      throw error;
    }
    return 0;
  }
};

export const updateEntry = async (entry: UpdateJournalEntry): Promise<void> => {
  try {
    const now = new Date().toISOString();
    
    if (isWeb) {
      const entries = await getWebEntries();
      const index = entries.findIndex(e => e.id === entry.id);
      if (index !== -1) {
        entries[index] = {
          ...entries[index],
          title: entry.title,
          body: entry.body,
          updatedAt: now
        };
        await setWebEntries(entries);
      }
      return;
    }

    if (!db) {
      console.warn('Database not available, cannot update entry');
      return;
    }
    
    await db.runAsync(
      'UPDATE journal_entries SET title = ?, body = ?, updatedAt = ? WHERE id = ?',
      [entry.title, entry.body, now, entry.id]
    );
  } catch (error) {
    console.error('Error updating entry:', error);
    if (!isWeb) {
      throw error;
    }
  }
};

export const deleteEntry = async (id: number): Promise<void> => {
  try {
    if (isWeb) {
      const entries = await getWebEntries();
      const filteredEntries = entries.filter(entry => entry.id !== id);
      await setWebEntries(filteredEntries);
      return;
    }

    if (!db) {
      console.warn('Database not available, cannot delete entry');
      return;
    }
    
    await db.runAsync('DELETE FROM journal_entries WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting entry:', error);
    if (!isWeb) {
      throw error;
    }
  }
};
