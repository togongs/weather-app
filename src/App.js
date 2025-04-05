import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import WeatherBox from "./components/WeatherBox";
import WeatherButton from "./components/WeatherButton";

const apiKey = "316fbb5f9f7f2d0a0c43fe518ee64717";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("curr");

  const cities = ["Paris", "Barcelona", "Hawaii", "Seoul"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((success, error) => {
      let lat = success.coords.latitude;
      let lon = success.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      getWeatherByCity();
    } else getCurrentLocation();
  }, [city]);

  if (weather)
    return (
      <div className="container">
        {loading ? (
          <ClipLoader
            color={"#f88c6b"}
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              setCity={setCity}
              getCurrentLocation={getCurrentLocation}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        )}
      </div>
    );
}

export default App;
