import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {COLORS} from '../constants/colors';
import WeatherService from '../services/weatherService';

const ForecastScreen = () => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForecastData(51.5074, -0.1278);
  }, []);

  const fetchForecastData = async (lat, lon) => {
    try {
      setLoading(true);
      const data = await WeatherService.getForecast(lat, lon);
      setForecastData(data);
    } catch (error) {
      console.error('Error fetching forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading forecast...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>5-Day Forecast</Text>
        
        {forecastData && (
          <View style={styles.forecastContainer}>
            {forecastData.list
              .filter((item, index) => index % 8 === 0) // Get one forecast per day
              .map((item, index) => (
                <View key={index} style={styles.forecastItem}>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {formatDate(item.dt_txt)}
                    </Text>
                    <Text style={styles.timeText}>
                      {formatTime(item.dt_txt)}
                    </Text>
                  </View>
                  
                  <View style={styles.weatherContainer}>
                    <Icon
                      name={WeatherService.getWeatherIcon(item.weather[0].icon)}
                      size={40}
                      color={COLORS.primary}
                    />
                    <Text style={styles.weatherDescription}>
                      {item.weather[0].description}
                    </Text>
                  </View>
                  
                  <View style={styles.temperatureContainer}>
                    <Text style={styles.temperature}>
                      {Math.round(item.main.temp)}°C
                    </Text>
                    <Text style={styles.feelsLike}>
                      Feels like {Math.round(item.main.feels_like)}°C
                    </Text>
                  </View>
                  
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                      <Icon name="water-percent" size={16} color={COLORS.gray} />
                      <Text style={styles.detailText}>
                        {item.main.humidity}%
                      </Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Icon name="weather-windy" size={16} color={COLORS.gray} />
                      <Text style={styles.detailText}>
                        {Math.round(item.wind.speed)} km/h
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
  },
  forecastContainer: {
    gap: 15,
  },
  forecastItem: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  weatherDescription: {
    fontSize: 16,
    color: COLORS.darkGray,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
  temperatureContainer: {
    marginBottom: 15,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  feelsLike: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.gray,
  },
});

export default ForecastScreen; 