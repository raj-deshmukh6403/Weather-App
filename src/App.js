import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './App.css'; // Add custom styles here
import { FaSearchLocation } from 'react-icons/fa'; // Icons for a modern look

const apiKey = 'e0020488e7cfa0ea3305ea9ed96b1d52'; // Replace with your actual API key

const App = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if (currentPosition) {
      fetchWeatherByCoords(currentPosition.latitude, currentPosition.longitude);
    }
  }, [currentPosition]);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setForecastData(forecastResponse.data.list.filter((_, index) => index % 8 === 0));
    } catch (error) {
      console.error('Error fetching the weather data:', error.response ? error.response.data : error.message);
      alert('Failed to retrieve weather data. Please check the location and try again.');
    }
  };

  const getWeather = async (e) => {
    e.preventDefault();
    if (!location) return;
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`
      );
      setForecastData(forecastResponse.data.list.filter((_, index) => index % 8 === 0));
    } catch (error) {
      console.error('Error fetching the weather data:', error.response ? error.response.data : error.message);
      alert('Failed to retrieve weather data. Please check the location and try again.');
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition(position.coords);
        },
        (error) => {
          alert('Geolocation is not supported by this browser or denied by the user.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={getWeather}>
          <FaSearchLocation /> Get Weather
        </button>
        <button onClick={detectLocation}>
          Use Current Location
        </button>
      </div>
      {weatherData && (
        <WeatherCard weatherData={weatherData} forecastData={forecastData} />
      )}
    </div>
  );
};

export default App;
