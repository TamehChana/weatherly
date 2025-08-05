import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import * as Location from 'expo-location';
import {COLORS} from '../constants/colors';
import WeatherService from '../services/weatherService';
import SideMenu from './SideMenu';

const HomeScreen = ({navigation}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied, using default location');
        // Use default location instead of showing error
        fetchWeatherData(51.5074, -0.1278);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      // Fallback to default location
      fetchWeatherData(51.5074, -0.1278);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      const data = await WeatherService.getCurrentWeather(lat, lon);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading weather data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="weather-cloudy" size={64} color={COLORS.gray} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => fetchWeatherData(51.5074, -0.1278)}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Navigation Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setMenuVisible(true)}>
            <Icon name="menu" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
          <Text style={styles.locationText}>Berlin, Germany</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="magnify" size={24} color={COLORS.darkGray} />
          </TouchableOpacity>
        </View>

        {/* Main Weather Card */}
        {weatherData && (
          <LinearGradient
            colors={['#4A90E2', '#1E90FF']}
            style={styles.mainWeatherCard}>
            <View style={styles.weatherCardContent}>
              {/* Top Left - Chance of Rain */}
              <View style={styles.chanceOfRain}>
                <Text style={styles.chanceText}>Chance of rain 60%</Text>
              </View>

              {/* Center Left - Weather Description */}
              <View style={styles.weatherDescriptionContainer}>
                <Text style={styles.weatherDescription}>
                  {weatherData.weather[0].description}
                </Text>
              </View>

              {/* Center Right - Weather Icon */}
              <View style={styles.weatherIconContainer}>
                <Icon
                  name={WeatherService.getWeatherIcon(weatherData.weather[0].icon)}
                  size={80}
                  color={COLORS.white}
                />
              </View>

              {/* Bottom Left - Location */}
              <View style={styles.locationContainer}>
                <Icon name="map-marker" size={16} color={COLORS.white} />
                <Text style={styles.locationName}>Washington DC, USA</Text>
              </View>

              {/* Bottom Row - Weather Details */}
              <View style={styles.weatherDetailsRow}>
                <Text style={styles.temperature}>
                  {Math.round(weatherData.main.temp)}°F
                </Text>
                <View style={styles.detailItem}>
                  <Icon name="cloud" size={16} color={COLORS.white} />
                  <Text style={styles.detailText}>10%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="weather-sunny" size={16} color={COLORS.white} />
                  <Text style={styles.detailText}>0.5</Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="weather-windy" size={16} color={COLORS.white} />
                  <Text style={styles.detailText}>124 mp/h</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        )}

        {/* News Weather Section */}
        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>News weather</Text>
          <View style={styles.newsCard}>
            <LinearGradient
              colors={['#2F4F4F', '#4A4A4A']}
              style={styles.newsCardBackground}>
              <View style={styles.newsCardContent}>
                <Icon name="weather-partly-cloudy" size={40} color={COLORS.white} />
                <View style={styles.newsWeatherDetails}>
                  <View style={styles.newsDetailItem}>
                    <Icon name="cloud" size={16} color={COLORS.white} />
                    <Text style={styles.newsDetailText}>10%</Text>
                  </View>
                  <View style={styles.newsDetailItem}>
                    <Icon name="weather-sunny" size={16} color={COLORS.white} />
                    <Text style={styles.newsDetailText}>0.5</Text>
                  </View>
                  <View style={styles.newsDetailItem}>
                    <Icon name="weather-windy" size={16} color={COLORS.white} />
                    <Text style={styles.newsDetailText}>124 mp/h</Text>
                  </View>
                  <Text style={styles.newsTemperature}>72°F</Text>
                  <View style={styles.newsLocation}>
                    <Icon name="map-marker" size={16} color={COLORS.white} />
                    <Text style={styles.newsLocationText}>Washington DC, USA</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </View>
          <Text style={styles.newsHeadline}>
            Here's what to expect from Tuesday weather forecast
          </Text>
          <View style={styles.newsMeta}>
            <Text style={styles.newsTime}>14 minutes ago</Text>
            <Text style={styles.newsSource}>WC Channel</Text>
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarSection}>
          <Text style={styles.sectionTitle}>Calendar</Text>
          <View style={styles.calendarCard}>
            <View style={styles.calendarDay}>
              <Text style={styles.dayName}>Monday</Text>
              <Text style={styles.dayTemp}>28°</Text>
              <Icon name="weather-sunny" size={24} color={COLORS.secondary} />
            </View>
            <View style={styles.calendarDay}>
              <Text style={styles.dayName}>Tuesday</Text>
              <Text style={styles.dayTemp}>27°</Text>
              <Icon name="weather-partly-cloudy" size={24} color={COLORS.primary} />
            </View>
            <View style={styles.calendarDay}>
              <Text style={styles.dayName}>Wednesday</Text>
              <Text style={styles.dayTemp}>26°</Text>
              <Icon name="weather-cloudy" size={24} color={COLORS.gray} />
            </View>
          </View>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
                 </View>
       </ScrollView>

       {/* Side Menu Modal */}
       <Modal
         visible={menuVisible}
         animationType="slide"
         transparent={true}
         onRequestClose={() => setMenuVisible(false)}>
         <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
             <SideMenu 
               navigation={navigation}
               closeMenu={() => setMenuVisible(false)}
             />
           </View>
         </View>
       </Modal>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButton: {
    padding: 8,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  searchButton: {
    padding: 8,
  },
  mainWeatherCard: {
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  weatherCardContent: {
    padding: 20,
  },
  chanceOfRain: {
    marginBottom: 10,
  },
  chanceText: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  weatherDescriptionContainer: {
    marginBottom: 15,
  },
  weatherDescription: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  weatherIconContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  locationName: {
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 5,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 4,
  },
  newsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 15,
  },
  newsCard: {
    borderRadius: 15,
    marginBottom: 10,
    overflow: 'hidden',
  },
  newsCardBackground: {
    padding: 15,
  },
  newsCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsWeatherDetails: {
    marginLeft: 15,
    flex: 1,
  },
  newsDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  newsDetailText: {
    fontSize: 14,
    color: COLORS.white,
    marginLeft: 4,
  },
  newsTemperature: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 5,
  },
  newsLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  newsLocationText: {
    fontSize: 12,
    color: COLORS.white,
    marginLeft: 4,
  },
  newsHeadline: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 5,
  },
  newsMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsTime: {
    fontSize: 12,
    color: COLORS.gray,
  },
  newsSource: {
    fontSize: 12,
    color: COLORS.primary,
  },
  calendarSection: {
    marginBottom: 20,
  },
  calendarCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  calendarDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.darkGray,
    flex: 1,
  },
  dayTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 10,
  },
  seeAllButton: {
    alignSelf: 'flex-end',
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
     retryButtonText: {
     color: COLORS.white,
     fontSize: 16,
     fontWeight: '600',
   },
   modalOverlay: {
     flex: 1,
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   modalContent: {
     flex: 1,
     width: '80%',
   },
 });

export default HomeScreen; 