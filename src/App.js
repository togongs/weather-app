import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function App() {
  const [weather, setWeather] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((success, error) => {
      let lat = success.coords.latitude;
      let lon = success.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=316fbb5f9f7f2d0a0c43fe518ee64717&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (weather)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          gap: 12,
        }}
      >
        <div
          style={{
            border: "3px solid #fff",
            padding: 16,
            borderRadius: 24,
            backgroundColor: "azure",
          }}
        >
          <div>{weather.name}</div>
          <h2>
            {weather.main.temp}C / {weather.main.temp * 1.8 + 32}F
          </h2>
          <h3>{weather.weather[0].description}</h3>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="primary">current location</Button>
          <Button variant="primary">hawaii</Button>
          <Button variant="primary">roma</Button>
        </div>
      </div>
    );
}

export default App;
