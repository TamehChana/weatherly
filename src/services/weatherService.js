import axios from 'axios';
import * as Location from 'expo-location';
import { getApiKey, getBaseUrl, ENDPOINTS, ERROR_MESSAGES } from '../config/api';

class WeatherService {
  constructor() {
    this.apiKey = getApiKey();
    this.baseUrl = getBaseUrl();
  }

  // Get current weather by coordinates
  async getCurrentWeather(lat, lon) {
    try {
      // Uncomment the lines below and add your API key
      const response = await axios.get(
        `${this.baseUrl}${ENDPOINTS.CURRENT_WEATHER}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      return response.data;
      
      // For demo purposes, return mock data
      // return this.getMockWeatherData();
    } catch (error) {
      console.error('Error fetching current weather:', error);
      return this.getMockWeatherData();
    }
  }

  // Get weather forecast by coordinates
  async getForecast(lat, lon) {
    try {
      // Uncomment the lines below and add your API key
      const response = await axios.get(
        `${this.baseUrl}${ENDPOINTS.FORECAST}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );
      return response.data;
      
      // For demo purposes, return mock data
      // return this.getMockForecastData();
    } catch (error) {
      console.error('Error fetching forecast:', error);
      return this.getMockForecastData();
    }
  }

  // Get weather by city name
  async getWeatherByCity(cityName) {
    try {
      // Uncomment the lines below and add your API key
      // const response = await axios.get(
      //   `${this.baseUrl}${ENDPOINTS.CURRENT_WEATHER}?q=${cityName}&appid=${this.apiKey}&units=metric`
      // );
      // return response.data;
      
      // For demo purposes, return mock data
      return this.getMockWeatherData();
    } catch (error) {
      console.error('Error fetching weather by city:', error);
      throw error;
    }
  }

  // Get weather icon based on weather condition
  getWeatherIcon(weatherCode) {
    const weatherIcons = {
      '01d': 'weather-sunny',
      '01n': 'weather-night',
      '02d': 'weather-partly-cloudy',
      '02n': 'weather-night-partly-cloudy',
      '03d': 'weather-cloudy',
      '03n': 'weather-cloudy',
      '04d': 'weather-cloudy',
      '04n': 'weather-cloudy',
      '09d': 'weather-rainy',
      '09n': 'weather-rainy',
      '10d': 'weather-partly-rainy',
      '10n': 'weather-night-partly-rainy',
      '11d': 'weather-lightning',
      '11n': 'weather-lightning',
      '13d': 'weather-snowy',
      '13n': 'weather-snowy',
      '50d': 'weather-fog',
      '50n': 'weather-fog',
    };
    return weatherIcons[weatherCode] || 'weather-cloudy';
  }

  // Get weather description
  getWeatherDescription(weatherCode) {
    const descriptions = {
      '01d': 'Clear sky',
      '01n': 'Clear night',
      '02d': 'Few clouds',
      '02n': 'Few clouds',
      '03d': 'Scattered clouds',
      '03n': 'Scattered clouds',
      '04d': 'Broken clouds',
      '04n': 'Broken clouds',
      '09d': 'Shower rain',
      '09n': 'Shower rain',
      '10d': 'Rain',
      '10n': 'Rain',
      '11d': 'Thunderstorm',
      '11n': 'Thunderstorm',
      '13d': 'Snow',
      '13n': 'Snow',
      '50d': 'Mist',
      '50n': 'Mist',
    };
    return descriptions[weatherCode] || 'Unknown';
  }

  // Mock weather data for demo purposes
  getMockWeatherData() {
    return {
      weather: [{ icon: '02d', description: 'Partly Cloudy' }],
      main: {
        temp: 72,
        humidity: 65,
        pressure: 1013,
        feels_like: 74
      },
      wind: {
        speed: 12
      },
      visibility: 10000,
      name: 'Washington DC'
    };
  }

  // Mock forecast data for demo purposes
  getMockForecastData() {
    return {
      list: [
        {
          dt_txt: '2024-01-15 12:00:00',
          weather: [{ icon: '01d', description: 'Clear' }],
          main: { temp: 75, feels_like: 77 }
        },
        {
          dt_txt: '2024-01-16 12:00:00',
          weather: [{ icon: '02d', description: 'Partly Cloudy' }],
          main: { temp: 72, feels_like: 74 }
        },
        {
          dt_txt: '2024-01-17 12:00:00',
          weather: [{ icon: '03d', description: 'Cloudy' }],
          main: { temp: 68, feels_like: 70 }
        }
      ]
    };
  }
}

export default new WeatherService(); 