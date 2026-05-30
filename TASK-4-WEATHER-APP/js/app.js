/**
 * ==========================================================================
 * SKYLINE WEATHER CONTROLLER
 * Vanilla Client-Side Architecture for REST API Integrations (Async/Await)
 * ==========================================================================
 */

// Global constant configuration
const CACHE_KEY = "skyline_weather_search_cache_v1";
const LAST_SEARCH_KEY = "skyline_weather_last_query_v1";
const DEFAULT_CITY = "Mumbai";

// Select elements for DOM manipulation
const bodyEl = document.body;
const announcerEl = document.getElementById("aria-announcer");
const clockTimeEl = document.getElementById("live-time");
const clockDayEl = document.getElementById("live-day");
const clockDateEl = document.getElementById("live-date");

const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const formFeedback = document.getElementById("form-validation-feedback");
const historySection = document.getElementById("history-section");
const historyContainer = document.getElementById("history-container");
const clearCacheBtn = document.getElementById("clear-cache-btn");

const weatherDisplaySec = document.getElementById("weather-display-section");
const skeletonLoader = document.getElementById("skeleton-loader");
const errorCard = document.getElementById("error-card");
const weatherContent = document.getElementById("weather-stats-content");

// Weather Stats Display Fields
const txtCity = document.getElementById("txt-city");
const txtCountry = document.getElementById("txt-country");
const txtLastUpdated = document.getElementById("txt-last-updated");
const weatherIcon = document.getElementById("weather-main-icon");
const txtTemp = document.getElementById("txt-temp");
const txtCondition = document.getElementById("txt-condition");
const txtDesc = document.getElementById("txt-desc");
const txtFeelsLike = document.getElementById("txt-feels-like");

const txtHumidity = document.getElementById("txt-humidity");
const txtWind = document.getElementById("txt-wind");
const txtPressure = document.getElementById("txt-pressure");
const txtVisibility = document.getElementById("txt-visibility");
const txtSunrise = document.getElementById("txt-sunrise");
const txtSunset = document.getElementById("txt-sunset");

const summaryHumidity = document.getElementById("summary-humidity");
const summaryWind = document.getElementById("summary-wind");
const summaryPressure = document.getElementById("summary-pressure");
const summaryVisibility = document.getElementById("summary-visibility");

const retryDefaultBtn = document.getElementById("retry-default-btn");

/* ==========================================================================
   WMO WEATHER CODE GRAPHICAL MAPPING (Open-Meteo Schema)
   ========================================================================== */
function mapWmoToCondition(code) {
    if (code === 0) {
        return {
            main: "Clear",
            description: "clear sky",
            icon: "sun"
        };
    } else if ([1, 2, 3].includes(code)) {
        return {
            main: "Clouds",
            description: code === 1 ? "mainly clear" : code === 2 ? "partly cloudy" : "overcast",
            icon: "cloud"
        };
    } else if ([45, 48].includes(code)) {
        return {
            main: "Fog",
            description: "foggy weather",
            icon: "cloud-fog"
        };
    } else if ([51, 53, 55, 56, 57, 80, 81, 82].includes(code)) {
        return {
            main: "Rain",
            description: "showering rain",
            icon: "cloud-rain"
        };
    } else if ([61, 63, 65, 66, 67].includes(code)) {
        return {
            main: "Rain",
            description: "heavy precipitation",
            icon: "cloud-drizzle"
        };
    } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return {
            main: "Snow",
            description: "icy snow flurries",
            icon: "snowflake"
        };
    } else if ([95, 96, 99].includes(code)) {
        return {
            main: "Thunderstorm",
            description: "thunderstorms with optional hail",
            icon: "cloud-lightning"
        };
    } else {
        return {
            main: "Clouds",
            description: "atmospheric overcast",
            icon: "cloud-sun"
        };
    }
}

/* ==========================================================================
   METEOROLOGICAL TEXT SUMMARIES (Aesthetic context details)
   ========================================================================== */
function setMetricDescriptions(humidity, wind, pressure, visibility) {
    // Humidity representation
    if (humidity < 35) {
        summaryHumidity.textContent = "Dry, comfortable atmosphere";
    } else if (humidity <= 65) {
        summaryHumidity.textContent = "Optimal moisture levels";
    } else {
        summaryHumidity.textContent = "High humidity sticky air";
    }

    // Wind representation
    if (wind < 3.5) {
        summaryWind.textContent = "Calm near-motionless draft";
    } else if (wind < 10) {
        summaryWind.textContent = "Aesthetic refreshing breeze";
    } else {
        summaryWind.textContent = "Intense gusting wind alert";
    }

    // Pressure representation
    if (pressure < 1010) {
        summaryPressure.textContent = "Low pressure cyclone cells";
    } else if (pressure <= 1020) {
        summaryPressure.textContent = "Normal ambient air balance";
    } else {
        summaryPressure.textContent = "Anticyclone clear high pressure";
    }

    // Visibility representation
    if (visibility < 5) {
        summaryVisibility.textContent = "Slightly blurred visibility";
    } else {
        summaryVisibility.textContent = "Excellent panoramic sightlines";
    }
}

/* ==========================================================================
   UTC & REGIONAL REAL-TIME CLOCK ENGINE
   ========================================================================== */
function initializeClock() {
    function updateClock() {
        const now = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const dayName = days[now.getUTCDay()];
        const monthName = months[now.getUTCMonth()];
        const dateVal = String(now.getUTCDate()).padStart(2, '0');
        const yearVal = now.getUTCFullYear();

        const hh = String(now.getUTCHours()).padStart(2, '0');
        const mm = String(now.getUTCMinutes()).padStart(2, '0');
        const ss = String(now.getUTCSeconds()).padStart(2, '0');

        clockDayEl.textContent = dayName;
        clockDateEl.textContent = `${monthName} ${dateVal}, ${yearVal}`;
        clockTimeEl.textContent = `${hh}:${mm}:${ss} UTC`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

/* ==========================================================================
   ACCESSIBLE ANNOUNCITIONS
   ========================================================================== */
function announceForScreenReaders(text) {
    if (announcerEl) {
        announcerEl.textContent = text;
    }
}

/* ==========================================================================
   SKELETON LOADER STATE CONTROLLER
   ========================================================================== */
function setLoaderState(isLoading) {
    if (isLoading) {
        weatherDisplaySec.setAttribute("aria-busy", "true");
        skeletonLoader.classList.remove("hidden");
        errorCard.classList.add("hidden");
        weatherContent.classList.add("hidden");
    } else {
        weatherDisplaySec.setAttribute("aria-busy", "false");
        skeletonLoader.classList.add("hidden");
    }
}

/* ==========================================================================
   ERROR PRESENTATION PORTAL
   ========================================================================== */
function displayError(hl, msg) {
    setLoaderState(false);
    document.getElementById("error-headline").textContent = hl;
    document.getElementById("error-message").textContent = msg;
    errorCard.classList.remove("hidden");
    weatherContent.classList.add("hidden");
    announceForScreenReaders(`Error: ${hl}. ${msg}`);
}

/* ==========================================================================
   SEARCH CACHE & PERSISTENT DEEP CACHE
   ========================================================================== */
function getSearchHistory() {
    try {
        const json = localStorage.getItem(CACHE_KEY);
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
}

function saveSearchToHistory(city) {
    if (!city) return;
    const sanitized = city.trim();
    let list = getSearchHistory();
    
    // De-duplicate: filter existing occurrences
    list = list.filter(item => item.toLowerCase() !== sanitized.toLowerCase());
    
    // Add to top of the stack
    list.unshift(sanitized);
    
    // Limit to exactly 5 results
    if (list.length > 5) {
        list.pop();
    }
    
    localStorage.setItem(CACHE_KEY, JSON.stringify(list));
    renderHistoryUI();
}

function renderHistoryUI() {
    const list = getSearchHistory();
    historyContainer.innerHTML = "";

    if (list.length === 0) {
        historySection.classList.add("hidden");
        return;
    }

    historySection.classList.remove("hidden");
    list.forEach(city => {
        const li = document.createElement("li");
        
        const button = document.createElement("button");
        button.type = "button";
        button.className = "history-btn";
        button.textContent = city;
        button.setAttribute("aria-label", `Query weather for ${city}`);
        
        button.addEventListener("click", () => {
            fetchWeatherData(city);
        });

        li.appendChild(button);
        historyContainer.appendChild(li);
    });
}

// Clear Search history cache
clearCacheBtn.addEventListener("click", () => {
    localStorage.removeItem(CACHE_KEY);
    renderHistoryUI();
    announceForScreenReaders("Search history cache successfully cleared.");
});

/* ==========================================================================
   CORE METEOROLOGICAL QUERY CONTROLLER (Fetch API with Async/Await)
   ========================================================================== */
async function fetchWeatherData(cityQuery) {
    if (!cityQuery || cityQuery.trim() === "") return;
    const city = cityQuery.trim();

    setLoaderState(true);
    formFeedback.classList.add("hidden");

    try {
        // Step 1: Geocoding Fetch from Open-Meteo Geocoding
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
            throw new Error("Server communication failure. Geolocation provider offline.");
        }

        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            displayError(
                "Unrecognized Coordinate Node", 
                `The city "${city}" yielded zero geographic positions. Please check spelling.`
            );
            return;
        }

        const node = geoData.results[0];
        const { latitude, longitude, name, country_code, country, timezone } = node;

        // Step 2: Meteorological Parameters Fetch using node coordinates
        const weatherParams = `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,wind_speed_10m,visibility&daily=sunrise,sunset&timezone=${encodeURIComponent(timezone)}`;
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${weatherParams}`;
        
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
            throw new Error("Meteorological gateway failure. Weather telemetry offline.");
        }

        const weatherData = await weatherResponse.json();

        // Step 3: Render results
        renderSuccessWeather(name, country_code, country, weatherData);
        
        // Save searches
        saveSearchToHistory(name);
        localStorage.setItem(LAST_SEARCH_KEY, name);

    } catch (err) {
        console.error("Query weather routing failed:", err);
        displayError(
            "Service Telemetry Suspended", 
            err.message || "Establishing connection with meteorological stations aborted. Inspect connection lines."
        );
    }
}

/* ==========================================================================
   SUCCESSFUL SCHEDULING & ELEMENT RENDER
   ========================================================================== */
function renderSuccessWeather(cityName, countryCode, countryName, data) {
    setLoaderState(false);

    const current = data.current;
    const daily = data.daily;
    
    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = current.relative_humidity_2m;
    const wind = current.wind_speed_10m;
    const pressure = Math.round(current.pressure_msl);
    const wCode = current.weather_code;
    
    // Geocode returns raw visibility in meters
    const visibilityKm = (current.visibility / 1000).toFixed(1);

    // Weather mapping
    const condition = mapWmoToCondition(wCode);

    // Modern client-side body dynamic style transition mapping
    bodyEl.className = "theme-" + condition.main.toLowerCase();

    // Text formatting updating
    txtCity.textContent = cityName.toUpperCase();
    txtCountry.textContent = countryCode ? countryCode.toUpperCase() : "INT";
    
    // Clock last updated timestamp
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    txtLastUpdated.textContent = `UPDATED ${hh}:${mm} UTC`;

    txtTemp.textContent = temp;
    txtCondition.textContent = condition.main;
    txtDesc.textContent = condition.description;
    txtFeelsLike.textContent = feelsLike;

    txtHumidity.textContent = humidity;
    txtWind.textContent = wind;
    txtPressure.textContent = pressure;
    txtVisibility.textContent = visibilityKm;

    // Sunrise & Sunset Formatting
    const sunrTime = daily.sunrise && daily.sunrise[0] ? daily.sunrise[0].split('T')[1] : "--:--";
    const sunsTime = daily.sunset && daily.sunset[0] ? daily.sunset[0].split('T')[1] : "--:--";
    txtSunrise.textContent = sunrTime;
    txtSunset.textContent = sunsTime;

    // Update aesthetic description details
    setMetricDescriptions(humidity, wind, pressure, parseFloat(visibilityKm));

    // Lucide dynamic icons redraw
    if (weatherIcon) {
        weatherIcon.setAttribute("data-lucide", condition.icon);
    }
    
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Unhide panels
    weatherContent.classList.remove("hidden");
    errorCard.classList.add("hidden");

    // Live Voice/Adisory Screen Reader update
    announceForScreenReaders(`Atmospheric data for ${cityName} successfully retrieved. Sky is currently ${condition.description} with a temperature of ${temp} degrees Celsius.`);
}

/* ==========================================================================
   INPUT CLIENT-SIDE SANITIZATION & FORM SUBMIT
   ========================================================================== */
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const rawVal = cityInput.value;
    
    if (!rawVal || rawVal.trim() === "") {
        formFeedback.textContent = "Please input a city location.";
        formFeedback.classList.remove("hidden");
        announceForScreenReaders("Validation warning: Please enter a city location.");
        return;
    }

    // Standard client input cleansing
    const sanitized = rawVal.replace(/[<>]/g, "").trim();
    if (sanitized.length < 2) {
        formFeedback.textContent = "Minimum character query length is 2 letters.";
        formFeedback.classList.remove("hidden");
        announceForScreenReaders("Validation warning: City search queries must be 2 characters or longer.");
        return;
    }

    formFeedback.classList.add("hidden");
    fetchWeatherData(sanitized);
    cityInput.value = "";
});

// Configure default retry point
if (retryDefaultBtn) {
    retryDefaultBtn.addEventListener("click", () => {
        fetchWeatherData(DEFAULT_CITY);
    });
}

/* ==========================================================================
   APPLICATION ENTRY POINT INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Fire Clock Engine
    initializeClock();

    // 2. Load History Sidebar
    renderHistoryUI();

    // 3. Resolve persistent last searching point or defaults
    const saved = localStorage.getItem(LAST_SEARCH_KEY);
    if (saved) {
        fetchWeatherData(saved);
    } else {
        fetchWeatherData(DEFAULT_CITY);
    }

    // 4. Initial trigger of icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
});
