#!/bin/bash

echo "🚀 Setting up BlackBox Journal App..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

# Check if expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

echo "📦 Installing base dependencies..."
npm install

echo "📦 Installing Expo-specific dependencies..."
npx expo install expo-sqlite expo-asset react-native-web react-dom

echo "🔧 Fixing version compatibility..."
npx expo install --fix

echo "✅ Setup complete! You can now run:"
echo "   npx expo start"
echo ""
echo "📱 Platforms supported:"
echo "   - iOS: Scan QR with Camera app"
echo "   - Android: Scan QR with Expo Go"
echo "   - Web: Press 'w' to open in browser"
