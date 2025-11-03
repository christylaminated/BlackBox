import * as SQLite from 'expo-sqlite';
import { JournalEntry, NewJournalEntry, UpdateJournalEntry } from '../types/journal';

const db = SQLite.openDatabaseSync('journal.db');

export const initDatabase = async () => {
  try {
    // Create tables
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
    throw error;
  }
};

const seedInitialData = async () => {
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
    const entries = await db.getAllAsync('SELECT * FROM journal_entries ORDER BY createdAt DESC');
    return entries as JournalEntry[];
  } catch (error) {
    console.error('Error getting all entries:', error);
    return [];
  }
};

export const getEntryById = async (id: number): Promise<JournalEntry | null> => {
  try {
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
    const result = await db.runAsync(
      'INSERT INTO journal_entries (title, body, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
      [entry.title, entry.body, now, now]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error creating entry:', error);
    throw error;
  }
};

export const updateEntry = async (entry: UpdateJournalEntry): Promise<void> => {
  try {
    const now = new Date().toISOString();
    await db.runAsync(
      'UPDATE journal_entries SET title = ?, body = ?, updatedAt = ? WHERE id = ?',
      [entry.title, entry.body, now, entry.id]
    );
  } catch (error) {
    console.error('Error updating entry:', error);
    throw error;
  }
};

export const deleteEntry = async (id: number): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM journal_entries WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw error;
  }
};
