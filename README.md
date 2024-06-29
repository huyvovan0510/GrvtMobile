# GrvtMobile

GrvtMobile is a mobile application built using Expo version 51.0.16, designed to deliver high performance and seamless user experience. This project leverages several powerful libraries to ensure optimal performance and functionality.
GrvtMobile is an app that shows users a listing of cryptocurrencies.

## Libraries Used

- **@shopify/flash-list**: High performance list for React Native.
- **zustand**: State management library for React.
- **@react-native-async-storage/async-storage**: Library to persist data for offline mode.
- **react-native-reanimated**: Library for animations.
- **@expo/vector-icons**: Library to use icons.
- **@react-native-community/netinfo**: Library to handle network status, checking if the user is offline or online.

## Steps to Run the App Locally

1. Install the project dependencies:

   ```bash
   yarn install
   ```

2. Start the Expo server:

   ```bash
   yarn start
   ```

3. Use the Expo Go app to scan the QR code displayed in the terminal to view the app.

### Running on iOS or Android Without Expo Go

If you want to build the app without using Expo Go or need to access the native folder, follow these steps:

- For iOS:

  ```bash
  npx expo prebuild ios
  ```

- For Android:
  ```bash
  npx expo prebuild android
  ```

After prebuilding, you can open the project in Xcode or Android Studio to run it on a simulator or physical device.

Enjoy using GrvtMobile!
