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
    // 1. Получаем координаты
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const lang = document.getElementById("langSelect").value;
    const { latitude, longitude } = position.coords;
    // 2. Делаем запрос в погоду по координатам
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
    wind: {speed},
  } = data;
  weatherInfo.innerHTML = `
        <p style="text-transform: uppercase;">${name}</p>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="iconWeatherDescription">
        <p><strong>Температура: </strong>${Math.round(
          temp
        )}°C</p><small>Ощущается как: ${Math.round(feels_like)}°C</small>
        <p><strong>Описание: </strong>${description}</p>
        <p><strong>Влажность:</strong> ${humidity}%</p>
        <p><strong>Скорость ветра:</strong> ${speed} m/s</p>`;
}
