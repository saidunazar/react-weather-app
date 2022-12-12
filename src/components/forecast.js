import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ weatherForecast }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <div>
        {weatherForecast &&
          weatherForecast.list.splice(0, 7).map((item, idx) => (
            <Accordion key={idx}>
              <AccordionSummary
                expandIcon={
                  <Typography>
                    {Math.round(item.main.temp_max)}°C/
                    {Math.round(item.main.temp_min)}°C
                  </Typography>
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{forecastDays[idx]}</Typography>{" "}
                <img
                  src={`icons/${item.weather[0].icon}.png`}
                  className="icon-small"
                  alt="weather"
                />
              </AccordionSummary>
            </Accordion>
          ))}
      </div>
    </>
  );
};

export default Forecast;
