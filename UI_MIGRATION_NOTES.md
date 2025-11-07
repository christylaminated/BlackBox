# UI Migration to Minimalist Journal App Design-3

## Overview
This document describes the migration of the BlackBox journal app UI to match the Minimalist Journal App Design-3 aesthetic.

## Changes Made

### 1. Dependencies Added
- `lucide-react-native`: Icon library for React Native
- `@expo-google-fonts/lora`: Serif font for headers
- `@expo-google-fonts/merriweather`: Serif font for body text
- `@expo-google-fonts/inter`: Sans-serif font for UI elements
- `react-native-svg`: Required for lucide-react-native

### 2. New Files Created

#### Constants
- `constants/theme.ts`: Centralized theme configuration with colors, fonts, spacing, and border radius matching Design-3

#### Components
- `components/StatusBar.tsx`: Custom iOS-style status bar
- `components/TabBar.tsx`: Bottom tab navigation with 5 tabs
- `components/GoalCard.tsx`: Card component for monthly/yearly goals
- `components/HistoricalEntryCard.tsx`: Card component for historical entries

#### Screens (Tab-based Navigation)
- `app/(tabs)/_layout.tsx`: Tab layout with font loading
- `app/(tabs)/index.tsx`: Home screen with today's entry, goals, and historical entries
- `app/(tabs)/calendar.tsx`: Calendar view placeholder
- `app/(tabs)/analyzer.tsx`: Analyzer view placeholder
- `app/(tabs)/search.tsx`: Search view placeholder
- `app/(tabs)/profile.tsx`: Profile view placeholder

### 3. Modified Files
- `app/_layout.tsx`: Updated to use tab-based navigation instead of stack navigation

### 4. Design System

#### Colors
- Background: `#FBF8F4` (warm off-white)
- Foreground: `#3D312E` (dark brown)
- Card: `#EBE5DF` (light beige)
- Primary: `#C87F5F` (terracotta)
- Secondary: `#A39081` (muted brown)

#### Typography
- Headers: Lora (serif)
- Body: Merriweather (serif)
- UI Elements: Inter (sans-serif)

#### Layout
- Border Radius: 16px for cards, full for buttons
- Spacing: Consistent 4px base unit
- Bottom Tab Bar: Fixed position with 5 tabs

### 5. Features Implemented

#### Home Screen
- Custom status bar matching iOS design
- Navigation header with back button and title
- Today's entry textarea with save button
- Monthly goal card with dot progress indicator
- Yearly goal card with progress bar
- Historical entries section showing past years
- Bottom tab navigation

#### Placeholder Screens
All placeholder screens (Calendar, Analyzer, Search, Profile) follow the same design pattern:
- Custom status bar
- Navigation header
- Descriptive content
- Feature list card
- Bottom tab navigation

## Database
The existing database functionality remains unchanged. The UI layer has been completely redesigned while maintaining all backend operations.

## Next Steps
1. Test the app on iOS simulator
2. Implement actual functionality for placeholder screens
3. Connect home screen entry saving to database
4. Add goal tracking functionality
5. Implement historical entries query by date

## Running the App
```bash
cd BlackBox
yarn install
yarn start
# Then press 'i' for iOS simulator
```

## Notes
- The old index.tsx has been removed to avoid conflicts with the new tab-based structure
- All TypeScript errors related to lucide-react-native should be resolved after yarn install
- Fonts will load automatically on app start
- The app maintains backward compatibility with existing database entries
