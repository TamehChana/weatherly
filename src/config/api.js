// API Configuration
// Add your API keys here

export const API_CONFIG = {
  // OpenWeatherMap API
  WEATHER_API_KEY: 'YOUR_API_KEY_HERE', // Replace with your actual API key
  
  // Alternative: WeatherAPI.com
  // WEATHER_API_KEY: 'your_weatherapi_key_here',
  // WEATHER_BASE_URL: 'http://api.weatherapi.com/v1',
  
  // Current weather API settings
  WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  UNITS: 'metric', // metric, imperial, kelvin
  
  // API Limits
  MAX_REQUESTS_PER_DAY: 1000, // Free tier limit
  
  // Cache settings
  CACHE_DURATION: 10 * 60 * 1000, // 10 minutes in milliseconds
};

// Environment variables (for production)
export const getApiKey = () => {
  return process.env.WEATHER_API_KEY || API_CONFIG.WEATHER_API_KEY;
};

export const getBaseUrl = () => {
  return process.env.WEATHER_BASE_URL || API_CONFIG.WEATHER_BASE_URL;
};

// API Endpoints
export const ENDPOINTS = {
  CURRENT_WEATHER: '/weather',
  FORECAST: '/forecast',
  AIR_POLLUTION: '/air_pollution',
  GEOCODING: '/geo/1.0/direct',
};

// Error messages
export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Weather API key is missing. Please add your API key in src/config/api.js',
  API_LIMIT_EXCEEDED: 'API request limit exceeded. Please upgrade your plan or wait.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  LOCATION_ERROR: 'Unable to get your location. Please enable location services.',
}; 