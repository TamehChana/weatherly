import axios from 'axios';

class AIService {
  constructor() {
    this.apiKey = process.env.AI_API_KEY || 'your_ai_api_key_here';
  }

  // Process voice command and return weather-related response
  async processVoiceCommand(command) {
    try {
      // This would integrate with an AI service like OpenAI or similar
      // For now, we'll create a simple command parser
      const response = await this.parseWeatherCommand(command.toLowerCase());
      return response;
    } catch (error) {
      console.error('Error processing voice command:', error);
      throw error;
    }
  }

  // Parse weather-related voice commands
  parseWeatherCommand(command) {
    const weatherKeywords = {
      'temperature': ['temp', 'temperature', 'hot', 'cold', 'warm'],
      'humidity': ['humidity', 'humid', 'moisture'],
      'wind': ['wind', 'breeze', 'windy'],
      'rain': ['rain', 'rainy', 'precipitation', 'wet'],
      'snow': ['snow', 'snowy', 'winter'],
      'sunny': ['sun', 'sunny', 'clear', 'bright'],
      'cloudy': ['cloud', 'cloudy', 'overcast'],
      'forecast': ['forecast', 'prediction', 'tomorrow', 'week'],
    };

    // Simple command parsing logic
    for (const [category, keywords] of Object.entries(weatherKeywords)) {
      if (keywords.some(keyword => command.includes(keyword))) {
        return {
          type: category,
          command: command,
          response: this.generateAIResponse(category, command),
        };
      }
    }

    return {
      type: 'general',
      command: command,
      response: "I'm sorry, I didn't understand that weather command. Try asking about temperature, humidity, wind, or forecast.",
    };
  }

  // Generate AI-powered weather insights
  generateAIResponse(category, command) {
    const responses = {
      temperature: "The current temperature is being fetched. Would you like me to tell you the high and low temperatures for today?",
      humidity: "I'm checking the humidity levels for you. This affects how the temperature feels.",
      wind: "Let me get the wind speed and direction for you. This is important for outdoor activities.",
      rain: "I'm checking the precipitation forecast. This will help you plan your day.",
      snow: "Let me check the snow conditions and accumulation for you.",
      sunny: "I'm looking at the sunshine forecast. This affects UV levels and outdoor activities.",
      cloudy: "I'm checking the cloud cover. This affects temperature and visibility.",
      forecast: "I'm analyzing the weather patterns to give you the most accurate forecast.",
    };

    return responses[category] || "I'm processing your weather request.";
  }

  // Generate intelligent weather recommendations
  generateWeatherRecommendations(weatherData) {
    const recommendations = [];
    const {temp, humidity, weather, wind_speed} = weatherData;

    // Temperature-based recommendations
    if (temp < 10) {
      recommendations.push("It's quite cold today. Consider wearing warm clothing.");
    } else if (temp > 25) {
      recommendations.push("It's warm today. Stay hydrated and wear light clothing.");
    }

    // Weather condition recommendations
    if (weather.includes('rain')) {
      recommendations.push("Rain is expected. Don't forget your umbrella!");
    } else if (weather.includes('snow')) {
      recommendations.push("Snow is in the forecast. Drive carefully and dress warmly.");
    } else if (weather.includes('sunny')) {
      recommendations.push("It's sunny today. Don't forget sunscreen!");
    }

    // Wind recommendations
    if (wind_speed > 20) {
      recommendations.push("It's quite windy. Secure loose objects and be careful outdoors.");
    }

    // Humidity recommendations
    if (humidity > 70) {
      recommendations.push("High humidity today. The air feels more humid than the temperature suggests.");
    }

    return recommendations;
  }

  // Convert weather data to natural language
  convertToNaturalLanguage(weatherData) {
    const {temp, humidity, weather, wind_speed, city} = weatherData;
    
    let description = `In ${city}, it's currently ${temp}°C with ${weather.toLowerCase()}. `;
    
    if (wind_speed > 0) {
      description += `The wind is blowing at ${wind_speed} km/h. `;
    }
    
    description += `The humidity is ${humidity}%. `;
    
    // Add AI insights
    const recommendations = this.generateWeatherRecommendations(weatherData);
    if (recommendations.length > 0) {
      description += recommendations[0];
    }
    
    return description;
  }
}

export default new AIService(); 