import "./App.css";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/api";
import Search from "./components/search";
import Weather from "./components/weather";
import Forecast from "./components/forecast";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);

  useEffect(() => {
    handleOnSearch({ value: "51.507222222 -0.1275", label: "London, GB" });
  }, []);

  function handleOnSearch(searchValue) {
    console.log(searchValue);
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
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchValue.label, ...weatherResponse });
        setWeatherForecast({ city: searchValue.label, ...forcastResponse });
      })
      .catch(console.log);
  }

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Search handleOnSearch={handleOnSearch} />
          </Grid>
          <Grid item xs={12}>
            {currentWeather && <Weather currentWeather={currentWeather} />}
          </Grid>
          <Grid item xs={12}>
            <Forecast weatherForecast={weatherForecast} />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
