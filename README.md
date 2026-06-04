# 🌤 Weather App — Full-Stack MERN

A full-stack weather application built with **React** (frontend) and **Express + Node.js** (backend), powered by the **WeatherAPI.com** forecast API. Features a deep-sky glassmorphism UI with aurora gradient accents, real-time weather data, 7-day forecasts, air quality index, and astronomical data.

🔗 Live Backend: [weather-3p1m.onrender.com](https://weather-3p1m.onrender.com/)

---

## ✨ Features

- 🔍 **City Search** — search any city by name with Enter key or button
- 🌡 **Current Conditions** — temperature, feels like, humidity, wind, pressure, UV, visibility, dew point, heat index, precipitation, cloud cover
- 📅 **Today's Summary** — avg temp, max wind, total precipitation, avg humidity, rain chance, UV index
- 🌬 **Air Quality Index** — CO, NO₂, O₃, PM2.5, PM10 with US EPA label
- 🌅 **Astronomical Data** — sunrise, sunset, moonrise, moonset, moon phase, moon illumination
- 📆 **7-Day Forecast** — scrollable cards with daily condition, temp range, rain chance
- ⚠ **Weather Alerts** — banner shown when active alerts exist for the city
- 🌙 **Day / Night badge** — dynamically shown based on current time
- 🎨 **Deep Sky UI** — glassmorphism cards, aurora gradient background, animated weather icon, grain overlay

---

## 🛠 Tech Stack

| Layer     | Technology                               |
|-----------|------------------------------------------|
| Frontend  | React 19 (CRA), CSS3                     |
| Backend   | Node.js, Express.js 5                    |
| Database  | MongoDB Atlas (Mongoose) — future use    |
| Weather   | WeatherAPI.com (forecast + AQI + alerts) |
| HTTP      | Axios (backend → WeatherAPI)             |
| Fonts     | Instrument Serif · DM Mono               |
| Deployment| Render                                   |

---

## 📁 Project Structure

```
weather/
├── backend/
│   ├── index.js          # Express server — weather proxy route
│   └── package.json
│
└── frontend/
    └── src/
        ├── App.js        # Main component — all UI & fetch logic
        ├── App.css       # Deep Sky theme — glassmorphism, aurora, tokens
        └── index.js      # React DOM entry
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- A free [WeatherAPI.com](https://www.weatherapi.com/) API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/sayan234-py/weather.git
cd weather
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5001
WEATHER_API_KEY=your_weatherapi_key_here
MONGODB_URI=your_mongodb_atlas_uri   # optional, reserved for future features
```

Start the backend:

```bash
npm start
```

API runs at `http://localhost:5001`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

> The frontend is hardcoded to use the deployed backend. To point it to your local backend, open `src/App.js` and change:
> ```js
> const response = await fetch(`https://weather-3p1m.onrender.com/weather/${city}`);
> ```
> to:
> ```js
> const response = await fetch(`http://localhost:5001/weather/${city}`);
> ```

---

## 🔌 API Endpoints

| Method | Endpoint           | Description                                 |
|--------|--------------------|---------------------------------------------|
| GET    | `/`                | Health check — returns server status        |
| GET    | `/weather/:city`   | Full weather data for the given city name   |

### Sample Response — `/weather/Durgapur`

```json
{
  "location": "Durgapur",
  "region": "West Bengal",
  "country": "India",
  "localtime": "2025-06-05 14:30",
  "current": {
    "temperature": 34,
    "feelslike": 40,
    "humidity": 65,
    "wind": 12,
    "wind_dir": "SW",
    "uv": 7,
    "condition": "Partly Cloudy",
    "icon": "https://cdn.weatherapi.com/...",
    "aqi": {
      "co": 233.4,
      "pm2_5": 18.2,
      "us_epa_index": 2
    }
  },
  "today": { "max_temp": 37, "min_temp": 28, ... },
  "astro": { "sunrise": "05:02 AM", "sunset": "06:24 PM", ... },
  "forecast": [ ... ],
  "alerts": []
}
```

---

## 🎨 UI Design

The frontend uses a custom **"Deep Sky"** dark theme:

- **Background** — animated aurora gradient with noise grain overlay
- **Cards** — glassmorphism (`backdrop-filter: blur(18px)`) with subtle borders
- **Typography** — `Instrument Serif` (italic display) + `DM Mono` (data)
- **Accents** — three aurora colors: teal `#4af0c8`, violet `#7b6ff0`, rose `#f06292`
- **Animations** — fade-up entry, floating weather icon, pulsing loader

---

## 📬 Contact

**Sayan Nandi**
- 📧 [nsayan520@gmail.com](mailto:nsayan520@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/sayan-nandi-152581359)
- 🐙 [GitHub](https://github.com/sayan234-py)
- 📍 Durgapur, West Bengal, India

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with 💙 by Sayan Nandi — BCA Student & MERN Stack Developer
