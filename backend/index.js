const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5001;

/* ================= MIDDLEWARE ================= */

app.use(express.json());
app.use(cors());

/* ================= MONGODB ================= */

mongoose
  .connect("mongodb://127.0.0.1:27017/weather")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(err));

/* ================= HOME ================= */

app.get("/", (req, res) => {
  res.send("🌤 Weather Backend Running");
});

/* ================= WEATHER ROUTE ================= */

app.get("/weather/:city", async (req, res) => {
  try {

    const city = req.params.city;

    const API_KEY = process.env.WEATHER_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({
        error: "Missing WEATHER_API_KEY in .env"
      });
    }

    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`
    );

    const data = response.data;

    res.json({
  location: data.location.name,
  region: data.location.region,
  country: data.location.country,
  localtime: data.location.localtime,

  current: {
    temperature: data.current.temp_c,
    feelslike: data.current.feelslike_c,
    humidity: data.current.humidity,
    wind: data.current.wind_kph,
    wind_dir: data.current.wind_dir,
    gust: data.current.gust_kph,
    pressure: data.current.pressure_mb,
    uv: data.current.uv,
    visibility: data.current.vis_km,
    cloud: data.current.cloud,
    dewpoint: data.current.dewpoint_c,
    heatindex: data.current.heatindex_c,
    precip: data.current.precip_mm,
    is_day: data.current.is_day,
    condition: data.current.condition.text,
    icon: `https:${data.current.condition.icon}`,
    chance_rain: data.forecast.forecastday[0].day.daily_chance_of_rain,

    aqi: data.current.air_quality ? {
      co:           data.current.air_quality.co,
      no2:          data.current.air_quality.no2,
      o3:           data.current.air_quality.o3,
      pm2_5:        data.current.air_quality.pm2_5,
      pm10:         data.current.air_quality.pm10,
      us_epa_index: data.current.air_quality["us-epa-index"],
    } : null,
  },

  today: {
    max_temp:      data.forecast.forecastday[0].day.maxtemp_c,
    min_temp:      data.forecast.forecastday[0].day.mintemp_c,
    avg_temp:      data.forecast.forecastday[0].day.avgtemp_c,
    max_wind:      data.forecast.forecastday[0].day.maxwind_kph,
    total_precip:  data.forecast.forecastday[0].day.totalprecip_mm,
    avg_humidity:  data.forecast.forecastday[0].day.avghumidity,
    chance_rain:   data.forecast.forecastday[0].day.daily_chance_of_rain,
    uv:            data.forecast.forecastday[0].day.uv,
  },

  astro: {
    sunrise:            data.forecast.forecastday[0].astro.sunrise,
    sunset:             data.forecast.forecastday[0].astro.sunset,
    moonrise:           data.forecast.forecastday[0].astro.moonrise,
    moonset:            data.forecast.forecastday[0].astro.moonset,
    moon_phase:         data.forecast.forecastday[0].astro.moon_phase,
    moon_illumination:  data.forecast.forecastday[0].astro.moon_illumination,
  },

  alerts: data.alerts?.alert ?? [],
  forecast: data.forecast.forecastday,
});

  } catch (error) {

    console.log("❌ WEATHER API ERROR");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(500).json({
      error: "Failed to fetch weather data"
    });
  }
});

/* ================= SERVER ================= */

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});