import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {COLORS} from '../constants/colors';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Navigate to landing page after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Landing');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#4A90E2', '#1E90FF']}
      style={styles.container}>
      <View style={styles.content}>
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>W</Text>
        </View>
        
        {/* App Name */}
        <Text style={styles.appName}>Weatherly</Text>
        
        {/* Tagline */}
        <Text style={styles.tagline}>We track weather.</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
  },
});

export default SplashScreen; 