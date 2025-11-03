export interface JournalEntry {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewJournalEntry {
  title: string;
  body: string;
}

export interface UpdateJournalEntry {
  id: number;
  title: string;
  body: string;
}
