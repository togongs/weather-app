import React from "react";

const WeatherBox = ({ weather }) => {
  return (
    <div className="box">
      <p>{weather.name}</p>
      <hr />
      <h2>
        {weather.main.temp}°C / {(weather.main.temp * 1.8 + 32).toFixed(2)}°F
      </h2>
      <h3>{weather.weather[0].description}</h3>
    </div>
  );
};

export default WeatherBox;
