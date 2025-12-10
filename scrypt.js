// Option 1.

/* const API_KEY = "74812cec17b6622b78c3a3feb9c3714f";
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const cityValueInput = document.getElementById("cityValueInput");
const weatherBtn = document.getElementById("weatherBtn");
const geolocationBtn = document.getElementById("geolocationBtn");
const weatherInfo = document.getElementById("weatherInfo");

const weatherJson = localStorage.getItem("weather");
const data = JSON.parse(weatherJson);

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("weather")) {
    const data = JSON.parse(localStorage.getItem("weather"));
    displayWeather(data);
  }
});

weatherBtn.onclick = async () => {
  const city = cityValueInput.value.trim();
  const lang = document.getElementById("langSelect").value;

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`
    );

    if (!res.ok) {
    }
    const data = await res.json();
    localStorage.setItem("weather", JSON.stringify(data));
    cityValueInput.value = "";
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = "<p>Error loading weather data.</p>";
    console.error(error);
  }
};

geolocationBtn.onclick = async () => {
  const lang = document.getElementById("langSelect").value;

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`
    );
    if (!res.ok) {
      if (res.status === 404) {
        weatherInfo.innerHTML = "<p>City not found. Please check the name.</p>";
        return;
      }
      throw new Error(`${res.status}`);
    }
    const data = await res.json();
    localStorage.setItem("weather", JSON.stringify(data));
    cityValueInput.value = "";
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = "<p>Error loading weather data.</p>";
    console.error(error);
  }
};

const displayWeather = (data) => {
weatherInfo.innerHTML = `
        <h1>${data.name}</h1>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="iconWeatherDescription">
        <p><strong>Температура: </strong>${Math.round(
          data.main.temp
        )}°C</p><small><strong>Ощущается как: </strong>${Math.round(
      data.main.feels_like
    )}°C</small>
        <p><strong>Описание: </strong>${data.weather[0].description}</p>
        <p><strong>Влажность:</strong> ${data.main.humidity}%</p>
        <p><strong>Скорость ветра:</strong> ${data.wind.speed} m/s</p>
    `;
}
*/

// Option 2.

/*
const API_KEY = "74812cec17b6622b78c3a3feb9c3714f";
const cityValueInput = document.getElementById("cityValueInput");
const weatherBtn = document.getElementById("weatherBtn");
const weatherInfo = document.getElementById("weatherInfo");

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("weather")) {
    const data = JSON.parse(localStorage.getItem("weather"));
    displayWeather(data);
  }
});

async function fetchWeather(url) {
  try {
    weatherInfo.innerHTML = `
  <img src="./Image20251208190348.gif" alt="Loading"/>`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    const data = await res.json();
    localStorage.setItem("weather", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
  }
}

weatherBtn.onclick = async () => {
  const city = cityValueInput.value.trim();
  const lang = document.getElementById("langSelect").value;
  displayWeather(
    await fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`
    )
  );
};

const geoWeatherBtn = document.getElementById("geolocationBtn");
geoWeatherBtn.onclick = async () => {
  try {
    // 1. We get the coordinates
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const lang = document.getElementById("langSelect").value;
    
    const { latitude, longitude } = position.coords;
    // 2. We make a weather request using coordinates
    displayWeather(
      await fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=${lang}`
      )
    );
  } catch (err) {
    weatherInfo.innerHTML = `<p>Не удалось получить геолокацию</p>`;
  }
};

function displayWeather(data) {
  cityValueInput.value = "";
  const {
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
  } = data;
  weatherInfo.innerHTML = `
        <p style="text-transform: uppercase;">${name}</p>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="iconWeatherDescription">
        <p><strong>Temperature: </strong>${Math.round(
          temp
        )}°C</p><small>\Feels like: ${Math.round(feels_like)}°C</small>
        <p><strong>Description: </strong>${description}</p>
        <p><strong>Humidity: </strong> ${humidity}%</p>
        <p><strong>Wind speed: </strong> ${speed} m/s</p>`;
}

document.addEventListener("DOMContentLoaded", function () {
  const themeSwitch = document.getElementById("switchCheckDefault");
  const htmlElement = document.documentElement;

  // Checking the saved theme
  const savedTheme = localStorage.getItem("weatherAppTheme") || "light";
  htmlElement.setAttribute("data-bs-theme", savedTheme);
  themeSwitch.checked = savedTheme === "dark";

  // Theme switch handler
  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      htmlElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("weatherAppTheme", "dark");
    } else {
      htmlElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("weatherAppTheme", "light");
    }
  });
});
*/

// Option 3.
const API_KEY = "74812cec17b6622b78c3a3feb9c3714f";
const cityValueInput = document.getElementById("cityValueInput");
const weatherBtn = document.getElementById("weatherBtn");
const weatherInfo = document.getElementById("weatherInfo");

// Object with translations
const translations = {
  en: {
    appTitle: "Weather App",
    themeSwitch: "Dark theme",
    cityName: "City Name",
    cityPlaceholder: "Enter city name...",
    language: "Language",
    getWeather: "Get Weather",
    getWeatherGeo: "Get Weather by geolocation",
    temperature: "Temperature",
    feelsLike: "Feels like",
    description: "Description",
    humidity: "Humidity",
    windSpeed: "Wind speed",
    loading: "Loading weather data...",
    errorCity: "Please enter a city name.",
    errorGeolocation: "Failed to get geolocation",
    errorNotFound: "City not found. Please check the name.",
    errorGeneric: "Error loading weather data.",
    errorNetwork: "Network error. Please try again."
  },
  ru: {
    appTitle: "Погодное приложение",
    themeSwitch: "Тёмная тема",
    cityName: "Название города",
    cityPlaceholder: "Введите название города...",
    language: "Язык",
    getWeather: "Получить погоду",
    getWeatherGeo: "Получить погоду по геолокации",
    temperature: "Температура",
    feelsLike: "Ощущается как",
    description: "Описание",
    humidity: "Влажность",
    windSpeed: "Скорость ветра",
    loading: "Загрузка данных о погоде...",
    errorCity: "Пожалуйста, введите название города.",
    errorGeolocation: "Не удалось получить геолокацию",
    errorNotFound: "Город не найден. Пожалуйста, проверьте название.",
    errorGeneric: "Ошибка загрузки данных о погоде.",
    errorNetwork: "Ошибка сети. Пожалуйста, попробуйте снова."
  },
  de: {
    appTitle: "Wetter App",
    themeSwitch: "Dunkles Thema",
    cityName: "Stadtname",
    cityPlaceholder: "Stadtnamen eingeben...",
    language: "Sprache",
    getWeather: "Wetter abrufen",
    getWeatherGeo: "Wetter nach Geolocation",
    temperature: "Temperatur",
    feelsLike: "Fühlt sich an wie",
    description: "Beschreibung",
    humidity: "Luftfeuchtigkeit",
    windSpeed: "Windgeschwindigkeit",
    loading: "Wetterdaten werden geladen...",
    errorCity: "Bitte geben Sie den Stadtnamen ein.",
    errorGeolocation: "Geolokalisierung fehlgeschlagen",
    errorNotFound: "Stadt nicht gefunden. Bitte überprüfen Sie den Namen.",
    errorGeneric: "Fehler beim Laden der Wetterdaten.",
    errorNetwork: "Netzwerkfehler. Bitte versuchen Sie es erneut."
  },
  uk: {
    appTitle: "Погодний додаток",
    themeSwitch: "Темна тема",
    cityName: "Назва міста",
    cityPlaceholder: "Введіть назву міста...",
    language: "Мова",
    getWeather: "Отримати погоду",
    getWeatherGeo: "Отримати погоду за геолокацією",
    temperature: "Температура",
    feelsLike: "Відчувається як",
    description: "Опис",
    humidity: "Вологість",
    windSpeed: "Швидкість вітру",
    loading: "Завантаження даних про погоду...",
    errorCity: "Будь ласка, введіть назву міста.",
    errorGeolocation: "Не вдалося отримати геолокацію",
    errorNotFound: "Місто не знайдено. Будь ласка, перевірте назву.",
    errorGeneric: "Помилка завантаження даних про погоду.",
    errorNetwork: "Помилка мережі. Будь ласка, спробуйте ще раз."
  }
};

// Current language (default Russian)
let currentLang = 'ru';

// Function to update all texts on a page
function updatePageTexts(lang) {
  const t = translations[lang];
  
  // Updating static elements
  document.querySelector('h1').textContent = t.appTitle;
  document.querySelector('label[for="switchCheckDefault"]').textContent = t.themeSwitch;
  document.querySelector('label[for="cityValueInput"]').textContent = t.cityName;
  document.querySelector('label[for="langSelect"]').textContent = t.language;
  document.getElementById('cityValueInput').placeholder = t.cityPlaceholder;
  document.getElementById('weatherBtn').textContent = t.getWeather;
  document.getElementById('geolocationBtn').textContent = t.getWeatherGeo;
  
  // Updating the current language
  currentLang = lang;
  
  // Saving the language to localStorage
  localStorage.setItem('weatherAppLang', lang);
}

// Function for translating error messages
function getTranslatedError(errorType, lang) {
  return translations[lang][errorType] || translations[lang].errorGeneric;
}

async function fetchWeather(url) {
  try {
    const t = translations[currentLang];
    weatherInfo.innerHTML = `<p>${t.loading}</p>`;
    
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('errorNotFound');
      }
      throw new Error('errorNetwork');
    }
    const data = await res.json();
    localStorage.setItem("weather", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(error);
    const errorMessage = error.message.startsWith('error') 
      ? getTranslatedError(error.message, currentLang)
      : getTranslatedError('errorGeneric', currentLang);
    
    weatherInfo.innerHTML = `<p class="text-danger">${errorMessage}</p>`;
    return null;
  }
}

function displayWeather(data) {
  if (!data) return;
  
  cityValueInput.value = "";
  const {
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
  } = data;
  
  const t = translations[currentLang];
  
  weatherInfo.innerHTML = `
        <div class="weather-card">
          <h3 class="city-name" style="text-transform: uppercase;">${name}</h3>
          <img class="weather-icon img-fluid d-block mx-auto" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
          <div class="weather-details mt-3">
            <p><strong>${t.temperature}: </strong>${Math.round(temp)}°C</p>
            <p><small><strong>${t.feelsLike}:</strong> ${Math.round(feels_like)}°C</small></p>
            <p><strong>${t.description}: </strong>${description}</p>
            <p><strong>${t.humidity}: </strong> ${humidity}%</p>
            <p><strong>${t.windSpeed}: </strong> ${speed} m/s</p>
          </div>
        </div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Restore the language from localStorage or use Russian as the default.
  const savedLang = localStorage.getItem("weatherAppLang") || "ru";
  document.getElementById("langSelect").value = savedLang;
  currentLang = savedLang;
  
  // Updating the texts on the page
  updatePageTexts(savedLang);
  
  // Loading saved weather
  if (localStorage.getItem("weather")) {
    const data = JSON.parse(localStorage.getItem("weather"));
    displayWeather(data);
  }
  
  // Language change handler
  document.getElementById("langSelect").addEventListener("change", function () {
    const selectedLang = this.value;
    updatePageTexts(selectedLang);
    
    // If there is saved weather data, we update its display
    if (localStorage.getItem("weather")) {
      const data = JSON.parse(localStorage.getItem("weather"));
      displayWeather(data);
    }
  });
  
  // Setting up a theme
  const themeSwitch = document.getElementById("switchCheckDefault");
  const htmlElement = document.documentElement;
  const savedTheme = localStorage.getItem("weatherAppTheme") || "light";
  htmlElement.setAttribute("data-bs-theme", savedTheme);
  themeSwitch.checked = savedTheme === "dark";
  
  themeSwitch.addEventListener("change", function () {
    if (this.checked) {
      htmlElement.setAttribute("data-bs-theme", "dark");
      localStorage.setItem("weatherAppTheme", "dark");
    } else {
      htmlElement.setAttribute("data-bs-theme", "light");
      localStorage.setItem("weatherAppTheme", "light");
    }
  });
});

weatherBtn.onclick = async () => {
  const city = cityValueInput.value.trim();
  const lang = document.getElementById("langSelect").value;
  
  if (!city) {
    const t = translations[lang];
    weatherInfo.innerHTML = `<p class="text-danger">${t.errorCity}</p>`;
    return;
  }
  
  const data = await fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`
  );
  displayWeather(data);
};

const geoWeatherBtn = document.getElementById("geolocationBtn");
geoWeatherBtn.onclick = async () => {
  const lang = document.getElementById("langSelect").value;
  const t = translations[lang];
  
  try {
    // 1. We get the coordinates
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    
    const { latitude, longitude } = position.coords;
    // 2. We make a weather request using coordinates
    const data = await fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=${lang}`
    );
    displayWeather(data);
  } catch (err) {
    console.error(err);
    weatherInfo.innerHTML = `<p class="text-danger">${t.errorGeolocation}</p>`;
  }
};