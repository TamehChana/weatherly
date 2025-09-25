import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import {COLORS} from '../constants/colors';

const PhotoAnalysisScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const pickImage = async () => {
    try {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera roll permissions to analyze photos.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
    try {
      const {status} = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        analyzeImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const analyzeImage = async (imageUri) => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        cloudType: 'Cumulus',
        cloudCover: '60%',
        weatherPrediction: 'Partly Cloudy',
        confidence: '85%',
        recommendations: [
          'Light rain possible in the next 2 hours',
          'Good visibility for outdoor activities',
          'UV index: Moderate',
        ],
        details: {
          temperature: '72°F',
          humidity: '65%',
          windSpeed: '8 mph',
          pressure: '1013 hPa',
        },
      };
      setAnalysisResult(mockAnalysis);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Photo Analysis</Text>
          <Text style={styles.subtitle}>
            Upload sky photos for AI-powered weather prediction
          </Text>
        </View>

        {/* Image Upload Section */}
        <View style={styles.uploadSection}>
          <Text style={styles.sectionTitle}>Upload Sky Photo</Text>
          
          {!selectedImage ? (
            <View style={styles.uploadArea}>
              <Icon name="camera" size={64} color={COLORS.gray} />
              <Text style={styles.uploadText}>
                Take a photo or select from gallery
              </Text>
              <View style={styles.uploadButtons}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={takePhoto}>
                  <Icon name="camera" size={20} color={COLORS.white} />
                  <Text style={styles.uploadButtonText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickImage}>
                  <Icon name="image" size={20} color={COLORS.white} />
                  <Text style={styles.uploadButtonText}>Choose Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.imageContainer}>
              <Image source={{uri: selectedImage}} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.retakeButton}
                onPress={() => setSelectedImage(null)}>
                <Icon name="refresh" size={20} color={COLORS.white} />
                <Text style={styles.retakeButtonText}>Retake</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Analysis Results */}
        {analyzing && (
          <View style={styles.analyzingContainer}>
            <LinearGradient
              colors={['#4A90E2', '#1E90FF']}
              style={styles.analyzingCard}>
              <Icon name="brain" size={40} color={COLORS.white} />
              <Text style={styles.analyzingText}>AI Analyzing...</Text>
              <Text style={styles.analyzingSubtext}>
                Classifying clouds and predicting weather
              </Text>
            </LinearGradient>
          </View>
        )}

        {analysisResult && (
          <View style={styles.resultsSection}>
            <Text style={styles.sectionTitle}>Analysis Results</Text>
            
            {/* Main Prediction */}
            <LinearGradient
              colors={['#4A90E2', '#1E90FF']}
              style={styles.predictionCard}>
              <View style={styles.predictionHeader}>
                <Icon name="weather-partly-cloudy" size={40} color={COLORS.white} />
                <View style={styles.predictionText}>
                  <Text style={styles.predictionTitle}>
                    {analysisResult.weatherPrediction}
                  </Text>
                  <Text style={styles.confidenceText}>
                    Confidence: {analysisResult.confidence}
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Cloud Analysis */}
            <View style={styles.analysisCard}>
              <Text style={styles.cardTitle}>Cloud Analysis</Text>
              <View style={styles.analysisRow}>
                <Text style={styles.analysisLabel}>Cloud Type:</Text>
                <Text style={styles.analysisValue}>{analysisResult.cloudType}</Text>
              </View>
              <View style={styles.analysisRow}>
                <Text style={styles.analysisLabel}>Cloud Cover:</Text>
                <Text style={styles.analysisValue}>{analysisResult.cloudCover}</Text>
              </View>
            </View>

            {/* Weather Details */}
            <View style={styles.analysisCard}>
              <Text style={styles.cardTitle}>Weather Details</Text>
              <View style={styles.weatherGrid}>
                <View style={styles.weatherItem}>
                  <Icon name="thermometer" size={20} color={COLORS.primary} />
                  <Text style={styles.weatherLabel}>Temperature</Text>
                  <Text style={styles.weatherValue}>{analysisResult.details.temperature}</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Icon name="water-percent" size={20} color={COLORS.primary} />
                  <Text style={styles.weatherLabel}>Humidity</Text>
                  <Text style={styles.weatherValue}>{analysisResult.details.humidity}</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Icon name="weather-windy" size={20} color={COLORS.primary} />
                  <Text style={styles.weatherLabel}>Wind</Text>
                  <Text style={styles.weatherValue}>{analysisResult.details.windSpeed}</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Icon name="gauge" size={20} color={COLORS.primary} />
                  <Text style={styles.weatherLabel}>Pressure</Text>
                  <Text style={styles.weatherValue}>{analysisResult.details.pressure}</Text>
                </View>
              </View>
            </View>

            {/* Recommendations */}
            <View style={styles.analysisCard}>
              <Text style={styles.cardTitle}>AI Recommendations</Text>
              {analysisResult.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Icon name="lightbulb" size={16} color={COLORS.secondary} />
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>
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
  uploadSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 15,
  },
  uploadArea: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  uploadButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  uploadButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  retakeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  retakeButtonText: {
    color: COLORS.white,
    fontSize: 12,
    marginLeft: 4,
  },
  analyzingContainer: {
    marginBottom: 30,
  },
  analyzingCard: {
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  analyzingText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  analyzingSubtext: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.9,
    marginTop: 5,
    textAlign: 'center',
  },
  resultsSection: {
    marginBottom: 30,
  },
  predictionCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  predictionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  predictionText: {
    marginLeft: 15,
    flex: 1,
  },
  predictionTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  confidenceText: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.9,
    marginTop: 2,
  },
  analysisCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginBottom: 15,
  },
  analysisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  analysisLabel: {
    fontSize: 16,
    color: COLORS.gray,
  },
  analysisValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
  weatherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weatherItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    marginBottom: 10,
  },
  weatherLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  weatherValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkGray,
    marginTop: 2,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: COLORS.darkGray,
    marginLeft: 10,
    flex: 1,
  },
});

export default PhotoAnalysisScreen; 