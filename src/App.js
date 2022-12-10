import "./App.css";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/api";
import Search from "./components/search";
import Weather from "./components/weather";
import Forecast from "./components/forecast";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  // const [weatherForecast, setWeatherForecast] = useState(null);

  function handleOnSearch(searchValue) {
    const [lat, lon] = searchValue.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const weatherForecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, weatherForecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        // const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchValue.label, ...weatherResponse });
        // setWeatherForecast({ city: searchValue.label, ...forcastResponse });
      })
      .catch(console.log);
  }

  return (
    <div className="App">
      <Search handleOnSearch={handleOnSearch} />
      {currentWeather && <Weather currentWeather={currentWeather} />}
      <Forecast />
    </div>
  );
}

export default App;
