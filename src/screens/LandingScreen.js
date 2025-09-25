import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {COLORS} from '../constants/colors';

const {width, height} = Dimensions.get('window');

const LandingScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate elements on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  const handleGetStarted = () => {
    navigation.replace('Main');
  };

  const handleLearnMore = () => {
    // You can add navigation to an about screen or external link
    console.log('Learn more pressed');
  };

  return (
    <LinearGradient
      colors={['#4A90E2', '#1E90FF']}
      style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      
      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <Text style={styles.headerText}>Welcome to</Text>
      </Animated.View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* App Icon with Animation */}
        <Animated.View
          style={[
            styles.iconContainer,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <View style={styles.iconBackground}>
            <Icon name="weather-partly-cloudy" size={50} color={COLORS.primary} />
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          Weatherly
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          Your personal weather companion
        </Animated.Text>

        {/* Features */}
        <Animated.View
          style={[
            styles.featuresContainer,
            {
              opacity: fadeAnim,
              transform: [{translateY: slideAnim}],
            },
          ]}>
          <View style={styles.featureItem}>
            <Icon name="map-marker" size={24} color={COLORS.white} />
            <Text style={styles.featureText}>Real-time weather updates</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="calendar-clock" size={24} color={COLORS.white} />
            <Text style={styles.featureText}>7-day forecasts</Text>
          </View>
          <View style={styles.featureItem}>
            <Icon name="microphone" size={24} color={COLORS.white} />
            <Text style={styles.featureText}>Voice weather queries</Text>
          </View>
        </Animated.View>
      </View>

      {/* Action Buttons */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <Icon name="arrow-right" size={20} color={COLORS.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleLearnMore}>
          <Text style={styles.secondaryButtonText}>Learn More</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: COLORS.white,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: COLORS.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 40,
  },
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: COLORS.white,
    marginLeft: 15,
    opacity: 0.9,
  },
  buttonContainer: {
    paddingBottom: 40,
    gap: 15,
  },
  primaryButton: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 10,
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
  },
});

export default LandingScreen; 