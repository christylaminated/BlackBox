# BlackBox Journal App Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BlackBox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional required packages**
   ```bash
   npx expo install expo-sqlite expo-asset react-native-web react-dom
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

## Required Dependencies

This project requires the following key dependencies:

### Core Dependencies
- `expo` - Expo framework
- `expo-router` - File-based routing
- `react` - React library
- `react-native` - React Native framework

### Platform-Specific Dependencies
- `react-native-web` - Web support for React Native
- `react-dom` - React DOM for web rendering

### Database
- `expo-sqlite` - SQLite database for local storage

### UI Components
- `@expo/vector-icons` - Icon library
- `@react-native-async-storage/async-storage` - Async storage
- `react-native-screens` - Native screen management

### Assets Required
The following assets must be present in the `assets/` directory:
- `favicon.png` - Web favicon (32x32px)
- `icon.png` - App icon (1024x1024px recommended)
- `splash.png` - Splash screen image
- `adaptive-icon.png` - Android adaptive icon

## Platform Support

- **iOS**: Scan QR code with Camera app or use iOS Simulator
- **Android**: Scan QR code with Expo Go app or use Android Emulator  
- **Web**: Access via browser at `http://localhost:8081` (or assigned port)

## Troubleshooting

### Common Issues

1. **Missing dependencies**: Run `npx expo install --fix` to install compatible versions
2. **Asset errors**: Ensure all required PNG files are in the `assets/` directory
3. **SQLite errors**: Make sure `expo-sqlite` is properly installed
4. **Web bundling issues**: Verify `react-native-web` and `react-dom` are installed

### Version Compatibility

If you see version compatibility warnings, run:
```bash
npx expo install --fix
```

This will install the correct versions for your Expo SDK.
