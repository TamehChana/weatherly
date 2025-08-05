import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

import {COLORS} from '../constants/colors';
import AIService from '../services/aiService';
import WeatherService from '../services/weatherService';

const VoiceScreen = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleVoiceCommand = async () => {
    if (!voiceCommand.trim()) {
      Alert.alert('Error', 'Please enter a voice command');
      return;
    }

    try {
      setIsListening(true);
      
      // Simulate voice processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process the command through AI service
      const response = await AIService.processVoiceCommand(voiceCommand);
      setAiResponse(response.response);
      
      // If it's a weather-related command, fetch weather data
      if (response.type !== 'general') {
        const weather = await WeatherService.getCurrentWeather(51.5074, -0.1278);
        setWeatherData(weather);
      }
      
    } catch (error) {
      console.error('Error processing voice command:', error);
      Alert.alert('Error', 'Failed to process voice command');
    } finally {
      setIsListening(false);
    }
  };

  const speakWeather = () => {
    if (weatherData) {
      const weatherDescription = AIService.convertToNaturalLanguage({
        temp: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        weather: weatherData.weather[0].description,
        wind_speed: weatherData.wind.speed,
        city: weatherData.name,
      });
      
      setAiResponse(weatherDescription);
      // For now, just log the speech (you can add TTS later)
      console.log('Speaking:', weatherDescription);
      alert('Weather spoken: ' + weatherDescription);
    }
  };

  const clearResponse = () => {
    setAiResponse('');
    setWeatherData(null);
    setVoiceCommand('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Voice Assistant</Text>
        
        {/* Voice Input Section */}
        <LinearGradient
          colors={['#4A90E2', '#1E90FF']}
          style={styles.voiceCard}>
          <View style={styles.voiceInputContainer}>
            <TextInput
              style={styles.voiceInput}
              placeholder="Type your weather command..."
              placeholderTextColor={COLORS.white}
              value={voiceCommand}
              onChangeText={setVoiceCommand}
              multiline
            />
            
            <TouchableOpacity
              style={[styles.micButton, isListening && styles.micButtonActive]}
              onPress={handleVoiceCommand}
              disabled={isListening}>
              <Icon
                name={isListening ? 'microphone' : 'microphone-outline'}
                size={32}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleVoiceCommand}
            disabled={isListening}>
            <Text style={styles.sendButtonText}>Send Command</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* AI Response Section */}
        {aiResponse && (
          <View style={styles.responseContainer}>
            <View style={styles.responseHeader}>
              <Text style={styles.responseTitle}>AI Response</Text>
              <TouchableOpacity onPress={clearResponse}>
                <Icon name="close" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.responseText}>{aiResponse}</Text>
            
            {weatherData && (
              <TouchableOpacity style={styles.speakButton} onPress={speakWeather}>
                <Icon name="volume-high" size={20} color={COLORS.white} />
                <Text style={styles.speakButtonText}>Speak Weather</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Voice Commands Help */}
        <View style={styles.helpContainer}>
          <Text style={styles.helpTitle}>Voice Commands</Text>
          <Text style={styles.helpText}>
            Try saying commands like:
          </Text>
          <View style={styles.commandList}>
            <Text style={styles.commandItem}>• "What's the temperature?"</Text>
            <Text style={styles.commandItem}>• "How's the humidity?"</Text>
            <Text style={styles.commandItem}>• "Tell me about the wind"</Text>
            <Text style={styles.commandItem}>• "Is it going to rain?"</Text>
            <Text style={styles.commandItem}>• "What's the forecast?"</Text>
          </View>
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
  voiceCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  voiceInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  voiceInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 16,
    minHeight: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    marginRight: 15,
  },
  micButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButtonActive: {
    backgroundColor: COLORS.secondary,
  },
  sendButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  responseContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  responseText: {
    fontSize: 16,
    color: COLORS.darkGray,
    lineHeight: 24,
    marginBottom: 15,
  },
  speakButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  speakButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  helpContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 10,
  },
  commandList: {
    gap: 5,
  },
  commandItem: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
});

export default VoiceScreen; 