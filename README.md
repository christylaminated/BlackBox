# Journal App

A mobile journaling app built with Expo (React Native + TypeScript) that allows users to write, edit, and manage personal journal entries entirely offline.

## Features

- **Offline-First**: All data is stored locally on device using expo-sqlite
- **Auto-Save Drafts**: Drafts are automatically saved using AsyncStorage
- **Full CRUD Operations**: Create, read, update, and delete journal entries
- **Clean UI**: Simple and intuitive interface for writing and browsing entries
- **Seeded Data**: Includes 2 example entries on first run

## Tech Stack

- **Expo** (Managed Workflow)
- **React Native**
- **TypeScript**
- **Expo Router** (File-based routing)
- **expo-sqlite** (Local database)
- **AsyncStorage** (Draft autosave)

## Prerequisites

- Node.js (v18 or newer)
- npm or yarn
- Expo Go app (for testing on physical device)
- iOS Simulator (Mac only) or Android Emulator

## Quick Setup

**Option 1: Automated Setup (Recommended)**
```bash
git clone <repository-url>
cd BlackBox
./install-deps.sh
```

**Option 2: Manual Setup**
```bash
git clone <repository-url>
cd BlackBox
npm install
npx expo install expo-sqlite expo-asset react-native-web react-dom
npx expo install --fix
```

> **Note**: See `SETUP.md` for detailed setup instructions and troubleshooting.

## Running the App

### Development Server

Start the Expo development server:
```bash
npm run dev
# or
npm start
```

This will open the Expo DevTools in your browser. You can then:
- Scan the QR code with Expo Go app (iOS/Android)
- Press `i` to open iOS Simulator
- Press `a` to open Android Emulator

### iOS

Run on iOS simulator (Mac only):
```bash
npm run ios
```

### Android

Run on Android emulator:
```bash
npm run android
```

## Project Structure

```
journal-app/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Home screen (entry list)
│   ├── new-entry.tsx      # New entry screen
│   ├── entry/
│   │   └── [id].tsx       # Entry detail screen
│   └── edit/
│       └── [id].tsx       # Edit entry screen
├── types/
│   └── journal.ts         # TypeScript interfaces
├── utils/
│   └── database.ts        # SQLite database utilities
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md
```

## Screens

### Home Screen
- Displays all journal entries in chronological order
- Tap any entry to view details
- Floating action button (+) to create new entry

### New Entry Screen
- Enter optional title and required body text
- Automatically saves draft as you type
- Save or cancel with confirmation

### Entry Detail Screen
- View full entry with title, body, and timestamps
- Edit button to modify entry
- Delete button with confirmation

### Edit Entry Screen
- Modify existing entry
- Auto-saves draft while editing
- Save changes or cancel with confirmation

## Data Storage

- **SQLite Database**: Persistent storage for all journal entries
- **AsyncStorage**: Temporary storage for draft autosave
- **No Backend**: All data remains on device

## Development Notes

- Database is automatically initialized on first app launch
- Two example entries are seeded on first run
- Draft autosave runs on every text change
- All timestamps are stored in ISO 8601 format

## Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache and restart
npx expo start -c
```

### Database Issues
- Uninstall and reinstall the app to reset database
- Check console logs for SQLite errors

### Dependencies Not Installing
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install
```

## Future Enhancements

- Search functionality
- Tags and categories
- Export entries (JSON, PDF)
- Dark mode support
- Photo attachments
- Cloud sync (optional)

## License

MIT

## Author

Built with Expo and Claude Code