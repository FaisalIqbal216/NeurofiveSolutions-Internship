# Task 5 — Skyline: Weather Dashboard with Fetch

Week 3 · Frontend Web Development · Neurofive Solutions Internship

A weather dashboard that talks to a live public API. Search any city, see
current conditions, and get a 3-day forecast — with proper loading and error
states along the way.

**Live demo:** https://neurofive-solutions-internship-njcb.vercel.app/
**Video walkthrough:** _add your LinkedIn video link here_

## Features

- 🔍 Search any city worldwide (geocoded through Open-Meteo's Geocoding API)
- 🌡️ Current temperature, "feels like", humidity, and wind speed
- 📅 3-day forecast with condition icons and high/low temps
- ⏳ Loading state while requests are in flight
- ⚠️ Friendly error state for typos, unknown cities, or network failures — with a Try Again button
- 🏙️ Loads Islamabad by default on first visit
- ♿ Accessible: semantic landmarks, `aria-live` status region, labeled form, keyboard-friendly
- 📱 Fully responsive, from small phones to desktop

## How the async loading/error states are handled

Every lookup runs through one `async` function (`lookupCity`) that first
shows the loading state, then `await`s the geocoding call and the forecast
call in sequence, wrapped in a single `try/catch`. If the city can't be
geocoded, the `catch` block shows a specific "couldn't find that city"
message; if the network call itself fails, it falls back to a generic
connection-error message. Either way the loading spinner is hidden the
moment the promise settles, and the error state includes a retry button that
re-runs the last search instead of forcing the user to retype it.

## Tech stack

Plain HTML5, CSS (custom properties, Flexbox + Grid), and vanilla JavaScript
(`fetch` + `async/await`) — no frameworks, no build step. Weather data and
geocoding from [Open-Meteo](https://open-meteo.com/) (free, no API key
required). Fonts: Sora (headings) + Inter (body).

## File structure

```
Task5_Weather-Dashboard/
├── index.html
├── style.css
├── script.js
└── README.md
```

HTML, styles, and behavior are kept in separate files/folders on purpose —
easier to navigate and matches how a real production frontend is organized.

## Running it locally

No build tools needed — it's static HTML/CSS/JS.

1. Clone or download the folder
2. Open `index.html` directly in a browser, or serve it with any static
   server (e.g. the VS Code "Live Server" extension) so the fetch requests
   run over `http://` rather than `file://`

## Deploying

1. Push this folder to the internship repo alongside the other tasks
2. On Vercel: **New Project → same GitHub repo → Root Directory =
   `Task5_Weather-Dashboard`** → Deploy
3. Add the live link to the root README's task table and to this file

## API reference

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={city}`
- Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...&daily=...`

Both are free and don't require an API key or authentication.