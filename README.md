# Weatherly

Weatherly is a modern, cross‑platform weather application built with React Native and Expo. It combines reliable weather data with AI‑assisted features like photo‑based sky analysis, smart alerts, and voice queries. The project showcases a pragmatic mobile stack: React 19 with hooks, React Navigation for routing, Axios for networking, and Expo modules for sensors, imaging, and device services. It targets Android, iOS, and web from a single codebase and emphasizes clean UI, responsive layouts, and maintainable architecture.

![Expo](https://img.shields.io/badge/Expo-53.x-green)
![React Native](https://img.shields.io/badge/React%20Native-0.79.x-blue)
![React](https://img.shields.io/badge/React-19.0.0-61dafb)

## Features

- Current conditions and 7‑day forecast
- AI photo weather analysis (camera/gallery)
- Smart weather alerts
- Voice weather queries
- Beautiful gradient UI with side menu

## Tech Stack

- React Native (Expo SDK 53): unified toolchain for Android/iOS/web, OTA updates
- React 19 + Hooks: functional components and predictable state
- React Navigation (stack/tabs): screen routing and transitions
- Axios: HTTP client for weather API integration
- Expo Location: geolocation for local weather
- Expo Image Picker: camera/gallery for photo analysis
- Expo Linear Gradient: polished UI styling
- Expo Status Bar and safe-area helpers: consistent device behavior

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm i -g expo`)

### Install
```bash
npm install
```

### Configure API (optional)
Update `src/config/api.js` with your weather API key if using a live provider.

### Run
```bash
npm start
# press a for Android, i for iOS, w for web
```

## Project Structure

```
src/
  screens/
    HomeScreen.js
    LandingScreen.js
    PhotoAnalysisScreen.js
    SmartAlertsScreen.js
    VoiceScreen.js
    ForecastScreen.js
    SettingsScreen.js
    SideMenu.js
  navigation/
    AppNavigator.js
  services/
    weatherService.js
    aiService.js
  constants/
    colors.js
  config/
    api.js
App.js
```

## Scripts

- `npm start` – start Expo
- `npm run android` – run on Android
- `npm run ios` – run on iOS
- `npm run web` – run on web

## Contributing

PRs welcome. Please open an issue to discuss major changes.

## License

MIT