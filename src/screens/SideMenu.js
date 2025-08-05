import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {COLORS} from '../constants/colors';

const SideMenu = ({navigation, closeMenu}) => {
  const menuItems = [
    {
      id: 'ai-assistant',
      title: 'AI Weather Assistant',
      subtitle: 'Chat with AI for personalized advice',
      icon: 'robot',
      color: '#FF6B6B',
      gradient: ['#FF6B6B', '#FF8E8E'],
    },
    {
      id: 'ml-forecast',
      title: 'ML Weather Forecast',
      subtitle: 'AI-powered hyper-local predictions',
      icon: 'brain',
      color: '#4ECDC4',
      gradient: ['#4ECDC4', '#6EDDD6'],
    },
    {
      id: 'personalized',
      title: 'Personalized Insights',
      subtitle: 'Smart tips based on your habits',
      icon: 'account-heart',
      color: '#45B7D1',
      gradient: ['#45B7D1', '#67C7E1'],
    },
    {
      id: 'photo-analysis',
      title: 'Photo Weather Analysis',
      subtitle: 'Analyze sky photos with AI',
      icon: 'camera',
      color: '#96CEB4',
      gradient: ['#96CEB4', '#B8DEC6'],
    },
    {
      id: 'smart-alerts',
      title: 'Smart Weather Alerts',
      subtitle: 'AI-powered severe weather detection',
      icon: 'alert-circle',
      color: '#FFEAA7',
      gradient: ['#FFEAA7', '#FFF2C7'],
    },
    {
      id: 'climate-trends',
      title: 'Climate Trends',
      subtitle: 'Historical data & climate insights',
      icon: 'chart-line',
      color: '#DDA0DD',
      gradient: ['#DDA0DD', '#E8B5E8'],
    },
    {
      id: 'voice-weather',
      title: 'Voice Weather Queries',
      subtitle: 'Ask weather questions naturally',
      icon: 'microphone',
      color: '#98D8C8',
      gradient: ['#98D8C8', '#BAE8D8'],
    },
  ];

  const handleMenuPress = (itemId) => {
    closeMenu();
    // Navigate to appropriate screen based on menu item
    switch (itemId) {
      case 'ai-assistant':
        navigation.navigate('Voice'); // Using existing voice screen for AI assistant
        break;
      case 'ml-forecast':
        navigation.navigate('Forecast'); // Using existing forecast screen
        break;
      case 'personalized':
        navigation.navigate('Settings'); // Will add personalized section
        break;
      case 'photo-analysis':
        navigation.navigate('PhotoAnalysis');
        break;
      case 'smart-alerts':
        navigation.navigate('SmartAlerts');
        break;
      case 'climate-trends':
        // Will create new screen for climate trends
        break;
      case 'voice-weather':
        navigation.navigate('Voice');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#1E90FF']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.locationSection}>
            <Text style={styles.locationLabel}>Current location</Text>
            <View style={styles.locationRow}>
              <Icon name="map-marker" size={16} color={COLORS.white} />
              <Text style={styles.locationText}>Berlin, Germany</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
        {/* Add Location Button */}
        <TouchableOpacity style={styles.addLocationButton}>
          <LinearGradient
            colors={['#FFD700', '#FFA500']}
            style={styles.addLocationGradient}>
            <Icon name="map-marker-plus" size={20} color={COLORS.white} />
            <Text style={styles.addLocationText}>Add Location</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Saved Locations */}
        <View style={styles.savedLocations}>
          <Text style={styles.sectionTitle}>Saved Locations</Text>
          {['Berlin, Germany', 'Liverpool, UK', 'Washington, USA'].map((location, index) => (
            <TouchableOpacity key={index} style={styles.locationItem}>
              <Icon name="map-marker" size={16} color={COLORS.white} />
              <Text style={styles.locationItemText}>{location}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Features Section */}
        <View style={styles.aiFeatures}>
          <Text style={styles.sectionTitle}>AI-Powered Features</Text>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.id)}>
              <LinearGradient
                colors={item.gradient}
                style={styles.menuItemGradient}>
                <View style={styles.menuItemContent}>
                  <Icon name={item.icon} size={24} color={COLORS.white} />
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={COLORS.white} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Actions */}
        <View style={styles.appActions}>
          <TouchableOpacity style={styles.actionItem}>
            <Icon name="cog" size={20} color={COLORS.white} />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Icon name="share-variant" size={20} color={COLORS.white} />
            <Text style={styles.actionText}>Share this app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem}>
            <Icon name="star" size={20} color={COLORS.white} />
            <Text style={styles.actionText}>Rate this app</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E90FF',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  headerContent: {
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 20,
  },
  locationSection: {
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
    marginLeft: 5,
  },
  menuContent: {
    flex: 1,
    padding: 20,
  },
  addLocationButton: {
    marginBottom: 30,
  },
  addLocationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
  },
  addLocationText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  savedLocations: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  locationItemText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 10,
  },
  aiFeatures: {
    marginBottom: 30,
  },
  menuItem: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItemGradient: {
    padding: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    flex: 1,
    marginLeft: 12,
  },
  menuItemTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
  },
  appActions: {
    marginTop: 20,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 12,
  },
});

export default SideMenu; 