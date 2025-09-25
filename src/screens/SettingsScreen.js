import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {COLORS} from '../constants/colors';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [units, setUnits] = useState('metric'); // metric or imperial

  const handleLocationPermission = () => {
    Alert.alert(
      'Location Permission',
      'This app needs location access to provide accurate weather information for your area.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Allow', onPress: () => setLocationServices(true)},
      ]
    );
  };

  const handleUnitsChange = () => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    Alert.alert(
      'Units Changed',
      `Weather units changed to ${newUnits === 'metric' ? 'Celsius' : 'Fahrenheit'}`,
      [{text: 'OK'}]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      'About Weatherly',
      'Weatherly v1.0.0\n\nAn AI-powered weather app with voice control capabilities.\n\nBuilt with React Native and modern weather APIs.',
      [{text: 'OK'}]
    );
  };

  const handlePrivacy = () => {
    Alert.alert(
      'Privacy Policy',
      'Your location data is only used to provide weather information and is not stored or shared with third parties.',
      [{text: 'OK'}]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Settings</Text>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="bell" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Weather Alerts</Text>
                <Text style={styles.settingDescription}>
                  Get notified about severe weather
                </Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{false: COLORS.lightGray, true: COLORS.primary}}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {/* Location Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="map-marker" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Location Services</Text>
                <Text style={styles.settingDescription}>
                  Use your location for weather data
                </Text>
              </View>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{false: COLORS.lightGray, true: COLORS.primary}}
              thumbColor={COLORS.white}
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={handleLocationPermission}>
            <View style={styles.settingInfo}>
              <Icon name="shield-check" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Location Permission</Text>
                <Text style={styles.settingDescription}>
                  Manage location access
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {/* Voice Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Voice Assistant</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="microphone" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Voice Commands</Text>
                <Text style={styles.settingDescription}>
                  Enable AI voice assistant
                </Text>
              </View>
            </View>
            <Switch
              value={voiceEnabled}
              onValueChange={setVoiceEnabled}
              trackColor={{false: COLORS.lightGray, true: COLORS.primary}}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="theme-light-dark" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  Switch to dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{false: COLORS.lightGray, true: COLORS.primary}}
              thumbColor={COLORS.white}
            />
          </View>
          <TouchableOpacity style={styles.settingItem} onPress={handleUnitsChange}>
            <View style={styles.settingInfo}>
              <Icon name="thermometer" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Temperature Units</Text>
                <Text style={styles.settingDescription}>
                  {units === 'metric' ? 'Celsius' : 'Fahrenheit'}
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {/* About & Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity style={styles.settingItem} onPress={handleAbout}>
            <View style={styles.settingInfo}>
              <Icon name="information" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>About Weatherly</Text>
                <Text style={styles.settingDescription}>
                  App version and information
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacy}>
            <View style={styles.settingInfo}>
              <Icon name="shield" size={24} color={COLORS.primary} />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Privacy Policy</Text>
                <Text style={styles.settingDescription}>
                  How we handle your data
                </Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 15,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.darkGray,
  },
  settingDescription: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default SettingsScreen; 