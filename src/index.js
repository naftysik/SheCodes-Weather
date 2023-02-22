let currentDate = new Date();

function formatDate(currentDate) {
  let year = currentDate.getFullYear();
  let date = currentDate.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDate.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];

  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${month} ${date}, ${year}, ${day}, ${hours}:${minutes}`;
}

let dateNow = document.querySelector("#current-date");
dateNow.innerHTML = formatDate(currentDate);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "46fac47dd8b8fa26d1b6852218ad3dfe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
//head cities

function changeFirstCity(event) {
  event.preventDefault();
  const city = event.target.innerText;
  let shownCity = document.querySelector("#user-inputed-city");
  shownCity.innerHTML = `${city}`;
  searchCity(city);
}

let firstCity = document.querySelector("#firstCity");
firstCity.addEventListener("click", changeFirstCity);

let secondCity = document.querySelector("#secondtCity");
secondCity.addEventListener("click", changeFirstCity);

let thirdCity = document.querySelector("#thurdCity");
thirdCity.addEventListener("click", changeFirstCity);

let fourthCity = document.querySelector("#fourthCity");
fourthCity.addEventListener("click", changeFirstCity);

//1

function showTemperature(response) {
  document.querySelector("#user-inputed-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#emoji");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function retrievePosition(position) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
function getCurrentLatitudeLongitude(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLatitudeLongitude);

function searchCity(city) {
  let apiKey = "ed238469f9b5e9d801834270e65449bc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputed-city").value;
  searchCity(city);
}

//temp
function seeFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");

  let cityFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(cityFahrenheit);
}
let celsiusTemperature = null;

function seeCelcius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  let temperature = currentTemp.innerHTML;
  let cityCelcius = Math.round((temperature - 32) * (5 / 9));
  currentTemp.innerHTML = cityCelcius;
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", seeCelcius);
let fahrenhait = document.querySelector("#fahrenheit");
fahrenhait.addEventListener("click", seeFahrenheit);

searchCity("Kherson");
displayForecast();
