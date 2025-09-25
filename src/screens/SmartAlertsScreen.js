import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {COLORS} from '../constants/colors';

const SmartAlertsScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [settings, setSettings] = useState({
    severeWeather: true,
    rainAlerts: true,
    windAlerts: true,
    temperatureAlerts: true,
    uvAlerts: true,
  });

  useEffect(() => {
    // Simulate fetching smart alerts
    const mockAlerts = [
      {
        id: 1,
        type: 'severe',
        title: 'Severe Thunderstorm Warning',
        description: 'AI detected unusual atmospheric pressure patterns indicating severe weather within 2 hours',
        time: '2 hours ago',
        severity: 'high',
        icon: 'weather-lightning',
        color: '#FF6B6B',
        gradient: ['#FF6B6B', '#FF8E8E'],
      },
      {
        id: 2,
        type: 'rain',
        title: 'Heavy Rain Alert',
        description: 'ML model predicts 90% chance of heavy rainfall in your area within 1 hour',
        time: '1 hour ago',
        severity: 'medium',
        icon: 'weather-rainy',
        color: '#4ECDC4',
        gradient: ['#4ECDC4', '#6EDDD6'],
      },
      {
        id: 3,
        type: 'wind',
        title: 'High Wind Warning',
        description: 'Anomaly detection identified unusual wind patterns. Wind speeds expected to reach 45 mph',
        time: '30 minutes ago',
        severity: 'medium',
        icon: 'weather-windy',
        color: '#45B7D1',
        gradient: ['#45B7D1', '#67C7E1'],
      },
      {
        id: 4,
        type: 'temperature',
        title: 'Temperature Anomaly',
        description: 'AI detected temperature pattern deviation. Unusually high temperatures expected',
        time: '15 minutes ago',
        severity: 'low',
        icon: 'thermometer',
        color: '#FFEAA7',
        gradient: ['#FFEAA7', '#FFF2C7'],
      },
    ];
    setAlerts(mockAlerts);
  }, []);

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return '#FF6B6B';
      case 'medium':
        return '#FFA500';
      case 'low':
        return '#4ECDC4';
      default:
        return COLORS.gray;
    }
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Smart Weather Alerts</Text>
          <Text style={styles.subtitle}>
            AI-powered severe weather detection using anomaly detection and pattern recognition
          </Text>
        </View>

        {/* Active Alerts */}
        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>Active Alerts</Text>
          {alerts.map((alert) => (
            <TouchableOpacity key={alert.id} style={styles.alertCard}>
              <LinearGradient
                colors={alert.gradient}
                style={styles.alertGradient}>
                <View style={styles.alertHeader}>
                  <Icon name={alert.icon} size={32} color={COLORS.white} />
                  <View style={styles.alertInfo}>
                    <Text style={styles.alertTitle}>{alert.title}</Text>
                    <Text style={styles.alertTime}>{alert.time}</Text>
                  </View>
                  <View style={styles.severityBadge}>
                    <Text style={styles.severityText}>
                      {getSeverityText(alert.severity)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.alertDescription}>{alert.description}</Text>
                <View style={styles.alertActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="eye" size={16} color={COLORS.white} />
                    <Text style={styles.actionText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="bell-off" size={16} color={COLORS.white} />
                    <Text style={styles.actionText}>Dismiss</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* AI Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <View style={styles.insightsCard}>
            <LinearGradient
              colors={['#4A90E2', '#1E90FF']}
              style={styles.insightsGradient}>
              <View style={styles.insightsHeader}>
                <Icon name="brain" size={32} color={COLORS.white} />
                <Text style={styles.insightsTitle}>Pattern Recognition</Text>
              </View>
              <Text style={styles.insightsText}>
                AI has detected 3 unusual weather patterns in your area this week, 
                with 95% accuracy in predicting severe weather events.
              </Text>
              <View style={styles.insightsStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>95%</Text>
                  <Text style={styles.statLabel}>Accuracy</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>3</Text>
                  <Text style={styles.statLabel}>Patterns Detected</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>2.5h</Text>
                  <Text style={styles.statLabel}>Avg. Early Warning</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Alert Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Alert Settings</Text>
          <View style={styles.settingsCard}>
            {Object.entries(settings).map(([key, value]) => (
              <View key={key} style={styles.settingItem}>
                <View style={styles.settingInfo}>
                  <Icon 
                    name={getSettingIcon(key)} 
                    size={24} 
                    color={COLORS.primary} 
                  />
                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>
                      {getSettingTitle(key)}
                    </Text>
                    <Text style={styles.settingDescription}>
                      {getSettingDescription(key)}
                    </Text>
                  </View>
                </View>
                <Switch
                  value={value}
                  onValueChange={() => toggleSetting(key)}
                  trackColor={{false: COLORS.lightGray, true: COLORS.primary}}
                  thumbColor={COLORS.white}
                />
              </View>
            ))}
          </View>
        </View>

        {/* AI Model Status */}
        <View style={styles.modelSection}>
          <Text style={styles.sectionTitle}>AI Model Status</Text>
          <View style={styles.modelCard}>
            <View style={styles.modelHeader}>
              <Icon name="robot" size={24} color={COLORS.primary} />
              <Text style={styles.modelTitle}>Weather Prediction Model</Text>
            </View>
            <View style={styles.modelStats}>
              <View style={styles.modelStat}>
                <Text style={styles.modelStatLabel}>Model Version</Text>
                <Text style={styles.modelStatValue}>v2.1.4</Text>
              </View>
              <View style={styles.modelStat}>
                <Text style={styles.modelStatLabel}>Last Updated</Text>
                <Text style={styles.modelStatValue}>2 hours ago</Text>
              </View>
              <View style={styles.modelStat}>
                <Text style={styles.modelStatLabel}>Training Data</Text>
                <Text style={styles.modelStatValue}>10M+ records</Text>
              </View>
              <View style={styles.modelStat}>
                <Text style={styles.modelStatLabel}>Accuracy</Text>
                <Text style={styles.modelStatValue}>94.2%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getSettingIcon = (key) => {
  const icons = {
    severeWeather: 'weather-lightning',
    rainAlerts: 'weather-rainy',
    windAlerts: 'weather-windy',
    temperatureAlerts: 'thermometer',
    uvAlerts: 'weather-sunny',
  };
  return icons[key] || 'bell';
};

const getSettingTitle = (key) => {
  const titles = {
    severeWeather: 'Severe Weather Alerts',
    rainAlerts: 'Rain & Precipitation',
    windAlerts: 'Wind & Storm Alerts',
    temperatureAlerts: 'Temperature Anomalies',
    uvAlerts: 'UV Index Warnings',
  };
  return titles[key] || key;
};

const getSettingDescription = (key) => {
  const descriptions = {
    severeWeather: 'Get notified about severe storms and lightning',
    rainAlerts: 'Receive alerts for rain and precipitation events',
    windAlerts: 'Be warned about high winds and storms',
    temperatureAlerts: 'Get notified about temperature anomalies',
    uvAlerts: 'Receive UV index warnings for sun protection',
  };
  return descriptions[key] || '';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    lineHeight: 22,
  },
  alertsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 15,
  },
  alertCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  alertGradient: {
    padding: 20,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertInfo: {
    flex: 1,
    marginLeft: 12,
  },
  alertTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertTime: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },
  severityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  severityText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
  },
  alertDescription: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  insightsSection: {
    marginBottom: 30,
  },
  insightsCard: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  insightsGradient: {
    padding: 20,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  insightsTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  insightsText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  insightsStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: COLORS.white,
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },
  settingsSection: {
    marginBottom: 30,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  modelSection: {
    marginBottom: 30,
  },
  modelCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  modelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginLeft: 12,
  },
  modelStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modelStat: {
    width: '48%',
    marginBottom: 15,
  },
  modelStatLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 4,
  },
  modelStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
  },
});

export default SmartAlertsScreen; 