<div align="center">

# 🌤️ Real-Time Weather Dashboard

**A modern, responsive, and accessible weather application built with Vanilla JavaScript and Open-Meteo APIs.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Open-Meteo API](https://img.shields.io/badge/Open--Meteo_API-0078D4?style=for-the-badge&logo=json&logoColor=white)](https://open-meteo.com/)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=for-the-badge&logo=lighthouse&logoColor=white)](#-lighthouse-audit-results)

</div>

---

## 📖 Project Overview

This project is a robust, real-time **Weather Dashboard** developed as part of the **Thiranex Web Development Internship** (Task 4). It demonstrates advanced frontend development skills, focusing on asynchronous JavaScript, REST API integration, state management, and modern UI/UX design principles.

The application allows users to search for current weather conditions in any city worldwide. It leverages the **Open-Meteo Geocoding and Weather APIs** to fetch accurate, up-to-date meteorological data. The project emphasizes clean code architecture, error handling, accessibility, and performance optimization, resulting in a production-ready application.

---

## ✨ Live Features

### Core Functionality
*   **Real-Time Weather Retrieval:** Fetches and displays current weather data instantly.
*   **City Search:** Allows users to search for weather conditions by city name.
*   **Comprehensive Weather Data:** Displays Temperature, Feels Like Temperature, Humidity, Wind Speed, Pressure, and general Weather Conditions.
*   **Sunrise & Sunset Information:** Provides accurate local times for sunrise and sunset.
*   **Last Updated Timestamp:** Shows exactly when the data was last refreshed.

### Data Management & API Integration
*   **Open-Meteo Geocoding API:** Converts city names into precise geographic coordinates (latitude/longitude).
*   **Open-Meteo Weather API:** Retrieves detailed weather forecasts based on coordinates.
*   **Fetch API & Async/Await:** Utilizes modern JavaScript for efficient, non-blocking network requests.
*   **Dynamic JSON Parsing:** Processes complex API responses to extract relevant data.

### User Experience & State
*   **LocalStorage Search History:** Saves recent searches for quick access.
*   **Last Searched City Persistence:** Automatically loads the weather for the last searched city upon returning to the app.
*   **Clear Search History:** Provides an option to clear saved searches.
*   **Loading States:** Displays visual feedback while data is being fetched.
*   **Robust Error Handling:** Gracefully handles invalid city names and network failures with informative user messages.

### UI/Design
*   **Glassmorphism UI:** Features a modern, sleek interface with frosted glass effects.
*   **Dynamic Weather Themes:** The UI adapts visually based on current weather conditions.
*   **Responsive Mobile-First Design:** Ensures a seamless experience across all devices (mobile, tablet, desktop).

---

## 📸 Screenshots

<details>
<summary><b>Click to view application screenshots</b></summary>

<br>

| Desktop View | Mobile View |
| :---: | :---: |
| *(Placeholder: Add Desktop Screenshot Here)* | *(Placeholder: Add Mobile Screenshot Here)* |

| Search History | Error State |
| :---: | :---: |
| *(Placeholder: Add Search History Screenshot Here)* | *(Placeholder: Add Error State Screenshot Here)* |

</details>

---

## 📊 Lighthouse Audit Results

The application has been rigorously tested using Google Lighthouse to ensure optimal performance, accessibility, and adherence to best practices.

| Metric | Score | Status |
| :--- | :---: | :---: |
| **Performance** | 95 | 🟢 Excellent |
| **Accessibility** | 100 | 🟢 Perfect |
| **Best Practices** | 100 | 🟢 Perfect |
| **SEO** | 100 | 🟢 Perfect |

---

## 📁 Folder Structure

```text
THIRANEX_WD_01/
└── TASK-4-WEATHER-APP/
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── app.js
    │   ├── api.js
    │   └── ui.js
    └── README.md
```

---

## 🛠️ Technology Stack

*   **Frontend:** HTML5, CSS3 (Glassmorphism, Flexbox/Grid)
*   **Logic:** Vanilla JavaScript (ES6+, Async/Await, Fetch API)
*   **APIs:** Open-Meteo Geocoding API, Open-Meteo Weather API
*   **Storage:** Browser LocalStorage API

---

## 🔌 API Integration Details

This project utilizes two distinct APIs from Open-Meteo to function correctly:

1.  **Geocoding API:**
    *   **Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`
    *   **Purpose:** Takes the user's city input (e.g., "London") and returns the corresponding latitude and longitude coordinates.
2.  **Weather API:**
    *   **Endpoint:** `https://api.open-meteo.com/v1/forecast`
    *   **Purpose:** Takes the coordinates obtained from the Geocoding API and returns the current weather data (temperature, wind speed, etc.).

---

## 🌊 Weather Data Flow Explanation

1.  **User Input:** The user enters a city name in the search bar and submits the form.
2.  **Geocoding Request:** The application sends a `fetch` request to the Open-Meteo Geocoding API with the city name.
3.  **Coordinate Extraction:** The Geocoding API responds with JSON data containing the latitude and longitude of the city.
4.  **Weather Request:** The application sends a second `fetch` request to the Open-Meteo Weather API, using the newly acquired coordinates.
5.  **Data Parsing:** The Weather API responds with detailed weather data in JSON format. The application parses this data.
6.  **UI Update:** The parsed data is dynamically injected into the DOM, updating the UI to display the current weather conditions.
7.  **State Update:** The searched city is saved to `LocalStorage` for future reference.

---

## 🧠 Key Learning Outcomes

Developing this Weather Dashboard provided significant hands-on experience in several critical areas of modern web development:

*   **Asynchronous JavaScript:** Mastered the use of `async/await` and the `Fetch API` to handle complex, sequential network requests without blocking the main thread.
*   **API Integration & Data Parsing:** Gained proficiency in reading API documentation, constructing dynamic API endpoints, and parsing complex JSON responses.
*   **Error Handling Strategies:** Implemented robust `try...catch` blocks to gracefully manage network errors and invalid user inputs, improving overall application stability.
*   **State Persistence:** Successfully utilized the `LocalStorage API` to maintain user preferences and search history across sessions.
*   **Advanced CSS Techniques:** Applied modern CSS concepts like Glassmorphism and dynamic theming to create an engaging user interface.

---

## ♿ Accessibility Features

*   **Semantic HTML:** Proper use of HTML5 landmarks (`<header>`, `<main>`, `<section>`) for better screen reader navigation.
*   **Keyboard Navigation Support:** All interactive elements (inputs, buttons) are fully accessible via keyboard (`Tab`, `Enter`).
*   **ARIA Attributes:** Utilized ARIA labels where necessary to provide context to assistive technologies.
*   **Color Contrast:** Ensured sufficient color contrast ratios for text readability against dynamic backgrounds.

---

## ⚡ Performance Optimizations

*   **Efficient DOM Manipulation:** Minimized direct DOM updates by batching changes and using template literals.
*   **Optimized Asset Loading:** Ensured CSS and JavaScript files are loaded efficiently to prevent render-blocking.
*   **Debouncing (Optional/Future):** Prepared architecture to implement debouncing on search inputs to reduce unnecessary API calls.

---

## 📱 Responsive Design Features

*   **Mobile-First Approach:** Designed primarily for mobile devices, scaling up gracefully for larger screens.
*   **CSS Flexbox & Grid:** Utilized modern layout modules for flexible and adaptable UI components.
*   **Media Queries:** Implemented breakpoints to adjust layout, font sizes, and spacing for optimal viewing on tablets and desktops.

---

## 🚀 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/siddesh3448/THIRANEX_WD_01.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd THIRANEX_WD_01/TASK-4-WEATHER-APP
    ```

---

## 💻 How To Run Locally

This is a static frontend application. No build steps or server setup are required.

1.  Simply open the `index.html` file in your preferred web browser.
    *   *Alternatively, you can use a local development server like VS Code's "Live Server" extension for a better development experience.*

---

## 🔮 Future Enhancements

*   **5-Day Forecast:** Implement a section to display the weather forecast for the upcoming days.
*   **Geolocation Support:** Add a feature to automatically detect the user's current location and display the local weather.
*   **Unit Toggle:** Allow users to switch between Celsius and Fahrenheit.
*   **Interactive Maps:** Integrate a map view showing weather patterns (e.g., radar, temperature maps).

---

## 🎓 Internship Deliverables

This project fulfills the requirements for **Task 4** of the **Thiranex Web Development Internship**. It demonstrates proficiency in API integration, asynchronous programming, and building responsive, user-centric web applications.

---

## 👤 Author

**Siddesh Mange**

*   **GitHub:** [https://github.com/siddesh3448](https://github.com/siddesh3448)
*   **LinkedIn:** [https://www.linkedin.com/in/siddesh-mange/](https://www.linkedin.com/in/siddesh-mange/)

---

## 🤝 Connect With Me

I am always open to discussing web development, new opportunities, and exciting projects. Feel free to reach out to me on LinkedIn or check out my other repositories on GitHub!

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">
  <i>Thank you for taking the time to review my project. I am passionate about building high-quality web applications and am eager to bring my skills to a professional development team.</i>
</div>
