import React, { useCallback, useEffect, useState } from "react";
import "./App.css";

/* ── EPA index → human label ── */
const EPA_LABELS = ["Good", "Moderate", "Unhealthy (Sensitive)", "Unhealthy", "Very Unhealthy", "Hazardous"];
const epaLabel = (idx) => EPA_LABELS[(idx ?? 1) - 1] ?? "—";

function App() {
  const [city, setCity]       = useState("Durgapur");
  const [search, setSearch]   = useState("Durgapur");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  /* ================= FETCH ================= */

  const fetchWeather = useCallback(async () => {
  try {
    setLoading(true);
    setError("");

    const response = await fetch(`https://weather-3p1m.onrender.com/weather/${city}`);
    const data = await response.json();

    if (data.error) {
      setError(data.error);
      setWeather(null);
    } else {
      setWeather(data);
    }

    setLoading(false);
  } catch (err) {
    console.log(err);
    setError("Failed to fetch weather data");
    setLoading(false);
  }
}, [city]);

useEffect(() => { fetchWeather(); }, [fetchWeather]);

  const handleSearch = () => {
    if (search.trim()) setCity(search.trim());
  };

  const handleKey = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  /* ================= RENDER ================= */

  return (
    <div className="container">

      {/* ── SEARCH ── */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <h2 className="status-text">Loading...</h2>}
      {error   && <h2 className="status-text error">{error}</h2>}

      {weather?.current && (
        <>

          {/* ── ALERTS ── */}
          {weather.alerts?.length > 0 && (
            <div className="alert-banner">
              ⚠ {weather.alerts[0].headline}
            </div>
          )}

          {/* ── MAIN CARD ── */}
          <div className="weather-card">
            <div className="weather-card__left">
              <p className="location-region">{weather.region}, {weather.country}</p>
              <h1>{weather.location}</h1>
              <p className="localtime">{weather.localtime}</p>
              <h2>{weather.current.temperature}°C</h2>
              <p className="condition-text">{weather.current.condition}</p>
              <div className="today-range">
                <span>↑ {weather.today?.max_temp}°</span>
                <span>↓ {weather.today?.min_temp}°</span>
              </div>
            </div>
            <div className="weather-card__right">
              <img src={weather.current.icon} alt="weather icon" />
              <span className="day-night-badge">
                {weather.current.is_day ? "☀ Day" : "🌙 Night"}
              </span>
            </div>
          </div>

          {/* ── QUICK STATS ── */}
          <div className="details-grid">
            <div className="card">
              <h3>Feels Like</h3>
              <p>{weather.current.feelslike}°C</p>
            </div>
            <div className="card">
              <h3>Humidity</h3>
              <p>{weather.current.humidity}%</p>
            </div>
            <div className="card">
              <h3>Wind</h3>
              <p>{weather.current.wind} <span>km/h {weather.current.wind_dir}</span></p>
            </div>
            <div className="card">
              <h3>Gust</h3>
              <p>{weather.current.gust} km/h</p>
            </div>
            <div className="card">
              <h3>UV Index</h3>
              <p>{weather.current.uv}</p>
            </div>
            <div className="card">
              <h3>Visibility</h3>
              <p>{weather.current.visibility} km</p>
            </div>
            <div className="card">
              <h3>Pressure</h3>
              <p>{weather.current.pressure} mb</p>
            </div>
            <div className="card">
              <h3>Cloud Cover</h3>
              <p>{weather.current.cloud}%</p>
            </div>
            <div className="card">
              <h3>Dew Point</h3>
              <p>{weather.current.dewpoint}°C</p>
            </div>
            <div className="card">
              <h3>Heat Index</h3>
              <p>{weather.current.heatindex}°C</p>
            </div>
            <div className="card">
              <h3>Precipitation</h3>
              <p>{weather.current.precip} mm</p>
            </div>
            <div className="card">
              <h3>Rain Chance</h3>
              <p>{weather.current.chance_rain}%</p>
            </div>
          </div>

          {/* ── TODAY SUMMARY ── */}
          <div className="today-summary">
            <h2 className="section-title">Today's Summary</h2>
            <div className="today-grid">
              <div className="today-item">
                <span>Avg Temp</span>
                <strong>{weather.today?.avg_temp}°C</strong>
              </div>
              <div className="today-item">
                <span>Max Wind</span>
                <strong>{weather.today?.max_wind} km/h</strong>
              </div>
              <div className="today-item">
                <span>Total Precip</span>
                <strong>{weather.today?.total_precip} mm</strong>
              </div>
              <div className="today-item">
                <span>Avg Humidity</span>
                <strong>{weather.today?.avg_humidity}%</strong>
              </div>
              <div className="today-item">
                <span>Rain Chance</span>
                <strong>{weather.today?.chance_rain}%</strong>
              </div>
              <div className="today-item">
                <span>UV Index</span>
                <strong>{weather.today?.uv}</strong>
              </div>
            </div>
          </div>

          {/* ── AQI ── */}
          {weather.current.aqi && (
            <div className="aqi-card">
              <h2 className="section-title">Air Quality</h2>
              <div className="aqi-badge">
                <span className="aqi-label">{epaLabel(weather.current.aqi.us_epa_index)}</span>
                <span className="aqi-index">EPA {weather.current.aqi.us_epa_index}</span>
              </div>
              <div className="aqi-grid">
                <div className="aqi-item"><span>CO</span><strong>{weather.current.aqi.co} μg/m³</strong></div>
                <div className="aqi-item"><span>NO₂</span><strong>{weather.current.aqi.no2} μg/m³</strong></div>
                <div className="aqi-item"><span>O₃</span><strong>{weather.current.aqi.o3} μg/m³</strong></div>
                <div className="aqi-item"><span>PM2.5</span><strong>{weather.current.aqi.pm2_5} μg/m³</strong></div>
                <div className="aqi-item"><span>PM10</span><strong>{weather.current.aqi.pm10} μg/m³</strong></div>
              </div>
            </div>
          )}

          {/* ── ASTRO ── */}
          <div className="sun-card">
            <div>
              <h3>Sunrise</h3>
              <p>{weather.astro?.sunrise}</p>
            </div>
            <div>
              <h3>Sunset</h3>
              <p>{weather.astro?.sunset}</p>
            </div>
            <div>
              <h3>Moonrise</h3>
              <p>{weather.astro?.moonrise}</p>
            </div>
            <div>
              <h3>Moonset</h3>
              <p>{weather.astro?.moonset}</p>
            </div>
            <div>
              <h3>Moon Phase</h3>
              <p>{weather.astro?.moon_phase}</p>
            </div>
            <div>
              <h3>Moon Light</h3>
              <p>{weather.astro?.moon_illumination}%</p>
            </div>
          </div>

          {/* ── 7-DAY FORECAST ── */}
          <h2 className="section-title forecast-title">7-Day Forecast</h2>
          <div className="forecast-container">
            {weather.forecast?.map((day, index) => (
              <div className="forecast-card" key={index}>
                <p>{day.date}</p>
                <img src={`https:${day.day.condition.icon}`} alt="" />
                <h3>{day.day.avgtemp_c}°C</h3>
                <p className="fc-range">↑{day.day.maxtemp_c}° ↓{day.day.mintemp_c}°</p>
                <p>{day.day.condition.text}</p>
                <p className="fc-rain">🌧 {day.day.daily_chance_of_rain}%</p>
              </div>
            ))}
          </div>

        </>
      )}
    </div>
  );
}

export default App;