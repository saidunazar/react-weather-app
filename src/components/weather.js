import Container from "@mui/material/Container";

function Weather({ currentWeather }) {
  return (
    <Container fixed={true}>
      <div className="weather-wrapper">
        <div className="weather-top">
          <h4>{currentWeather.city}</h4>
        </div>
        <div className="weather-middle">
          <div className="weather-icon">
            <img
              alt="weather"
              className="weather-icon"
              src={`icons/${currentWeather.weather[0].icon}.png`}
            />
          </div>
          <div className="weather-tempreture">
            <div className="weather-degree">
              {Math.round(currentWeather.main.temp)}°C
            </div>
            <div>{currentWeather.weather[0].description}</div>
          </div>
        </div>
        <div className="weather-bottom">
          <div className="weather-bottom-first">
            <span className="weather-feels-like">
              <b>Feels like</b>: {Math.round(currentWeather.main.feels_like)}°C
            </span>
            <span className="weather-humidity">
              <b>Humidity</b>: {Math.round(currentWeather.main.humidity)}%
            </span>
            <span className="weather-min-temp">
              <b>Min</b>: {Math.round(currentWeather.main.temp_min)}°C
            </span>
          </div>
          <div className="weather-bottom-second">
            <span className="weather-visibility">
              <b>Visibility</b>: {Math.round(currentWeather.visibility)}mi
            </span>
            <span className="weather-pressure">
              <b>Pressure</b>: {Math.round(currentWeather.main.pressure)}hPa
            </span>
            <span className="weather-max-temp">
              <b>Max</b>: {Math.round(currentWeather.main.temp_max)}°C
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Weather;
