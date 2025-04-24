// src/WeatherCard.js
import React from 'react';
import './WeatherCard.css'; // Add custom styles here

const WeatherCard = ({ weatherData, forecastData }) => {
  return (
    <div className="weather-card">
      <h1>{weatherData.name}</h1>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>

      <h2>5-Day Forecast</h2>
      <div className="forecast-container">
        {forecastData.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {forecast.main.temp}°C</p>
            <p>{forecast.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
