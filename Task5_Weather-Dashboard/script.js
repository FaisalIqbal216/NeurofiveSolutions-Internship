/* ============================================
   SKYLINE — Weather Dashboard
   Task 5: API Integration (Open-Meteo)
   ============================================ */

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const DEFAULT_CITY = 'Islamabad';

// DOM references
const searchForm = document.getElementById('searchForm');
const citySearch = document.getElementById('citySearch');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const weatherCard = document.getElementById('weatherCard');

const cityNameEl = document.getElementById('cityName');
const weatherDescEl = document.getElementById('weatherDesc');
const currentIconEl = document.getElementById('currentIcon');
const currentTempEl = document.getElementById('currentTemp');
const feelsLikeEl = document.getElementById('feelsLike');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const forecastListEl = document.getElementById('forecastList');

let lastQuery = DEFAULT_CITY;

/* ============================================
   WMO WEATHER CODE -> ICON + LABEL
   https://open-meteo.com/en/docs (WMO Weather interpretation codes)
   ============================================ */
function getWeatherInfo(code) {
    const map = {
        0: { icon: '☀️', label: 'Clear sky' },
        1: { icon: '🌤️', label: 'Mostly clear' },
        2: { icon: '⛅', label: 'Partly cloudy' },
        3: { icon: '☁️', label: 'Overcast' },
        45: { icon: '🌫️', label: 'Foggy' },
        48: { icon: '🌫️', label: 'Depositing rime fog' },
        51: { icon: '🌦️', label: 'Light drizzle' },
        53: { icon: '🌦️', label: 'Drizzle' },
        55: { icon: '🌦️', label: 'Dense drizzle' },
        61: { icon: '🌧️', label: 'Light rain' },
        63: { icon: '🌧️', label: 'Rain' },
        65: { icon: '🌧️', label: 'Heavy rain' },
        71: { icon: '❄️', label: 'Light snow' },
        73: { icon: '❄️', label: 'Snow' },
        75: { icon: '❄️', label: 'Heavy snow' },
        80: { icon: '🌦️', label: 'Rain showers' },
        81: { icon: '🌧️', label: 'Heavy showers' },
        82: { icon: '⛈️', label: 'Violent showers' },
        95: { icon: '⛈️', label: 'Thunderstorm' },
        96: { icon: '⛈️', label: 'Thunderstorm with hail' },
        99: { icon: '⛈️', label: 'Severe thunderstorm' }
    };
    return map[code] || { icon: '🌡️', label: 'Unknown' };
}

/* ============================================
   UI STATE HELPERS
   ============================================ */
function showLoading() {
    loadingState.hidden = false;
    errorState.hidden = true;
    weatherCard.hidden = true;
}

function showError(message) {
    loadingState.hidden = true;
    errorState.hidden = false;
    weatherCard.hidden = true;
    errorMessage.textContent = message;
}

function showWeather() {
    loadingState.hidden = true;
    errorState.hidden = true;
    weatherCard.hidden = false;
}

/* ============================================
   FETCH HELPERS (async/await)
   ============================================ */
async function geocodeCity(city) {
    const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('geocode-failed');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error('city-not-found');
    }

    const place = data.results[0];
    return {
        name: place.name,
        country: place.country,
        latitude: place.latitude,
        longitude: place.longitude
    };
}

async function fetchWeather(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        forecast_days: 4,
        timezone: 'auto'
    });

    const response = await fetch(`${FORECAST_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error('weather-failed');
    }

    return response.json();
}

/* ============================================
   RENDER
   ============================================ */
function renderCurrent(place, data) {
    const current = data.current;
    const info = getWeatherInfo(current.weather_code);

    cityNameEl.textContent = `${place.name}${place.country ? ', ' + place.country : ''}`;
    weatherDescEl.textContent = info.label;
    currentIconEl.textContent = info.icon;
    currentTempEl.textContent = `${Math.round(current.temperature_2m)}°`;
    feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)}°`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    windSpeedEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
}

function renderForecast(data) {
    const { time, weather_code, temperature_2m_max, temperature_2m_min } = data.daily;
    const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

    forecastListEl.innerHTML = '';

    // Skip index 0 (today) — show the next 3 days
    for (let i = 1; i <= 3 && i < time.length; i++) {
        const date = new Date(time[i]);
        const info = getWeatherInfo(weather_code[i]);

        const li = document.createElement('li');
        li.className = 'forecast-card';
        li.innerHTML = `
            <p class="forecast-day">${dayFormatter.format(date)}</p>
            <span class="forecast-icon" aria-hidden="true">${info.icon}</span>
            <p class="forecast-temps">
                <span class="forecast-high">${Math.round(temperature_2m_max[i])}°</span>
                <span class="forecast-low">${Math.round(temperature_2m_min[i])}°</span>
            </p>
        `;
        forecastListEl.appendChild(li);
    }
}

/* ============================================
   MAIN LOOKUP FLOW
   ============================================ */
async function lookupCity(city) {
    lastQuery = city;
    showLoading();

    try {
        const place = await geocodeCity(city);
        const data = await fetchWeather(place.latitude, place.longitude);

        renderCurrent(place, data);
        renderForecast(data);
        showWeather();
    } catch (err) {
        if (err.message === 'city-not-found') {
            showError(`Couldn't find "${city}". Check the spelling or try a bigger nearby city.`);
        } else {
            showError('Something went wrong reaching the weather service. Check your connection and try again.');
        }
    }
}

/* ============================================
   EVENTS
   ============================================ */
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = citySearch.value.trim();
    if (!city) return;
    lookupCity(city);
});

retryBtn.addEventListener('click', () => {
    lookupCity(lastQuery);
});

// Load a default city on first visit
document.addEventListener('DOMContentLoaded', () => {
    lookupCity(DEFAULT_CITY);
});