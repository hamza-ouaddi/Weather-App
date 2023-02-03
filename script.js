//Input Section
const wrapper = document.querySelector(".wrapper");
const inputSection = wrapper.querySelector(".input-section");
const inputTitle = inputSection.querySelector(".input-title");
const inputBar = inputSection.querySelector("input");
const searchBtn = inputSection.querySelector("#submit-btn");
const locationBtn = inputSection.querySelector("#location-btn");

//Weather Section
let api;
const weatherIcon = wrapper.querySelector("img");
const backIcon = wrapper.querySelector(".back-icon");
const body = document.querySelector("body");
///////////////////////////////////////////////////////////////////////////////////

//Enter the city name
////In case if the user clicks on Enter to search
inputBar.addEventListener("keyup", function (event) {
  if (event.key === "Enter" && inputBar.value != "") {
    requestApi(inputBar.value);
  }
});

////In case if the user clicks on the Search Button to search
searchBtn.addEventListener("click", function () {
  if (inputBar.value != "") {
    requestApi(inputBar.value);
  }
});

//If the user uses current location button
locationBtn.addEventListener("click", function () {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      succesCallback,
      failureCallback
    );
  } else {
    alert = "Your browser doesn't support Geolocation";
  }
});

//Requesting the response from Api by City name
function requestApi(city) {
  const apiKey = "d860141b8dd27eee7d374c849222f32d";
  api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;

  dataSearch();
}

//Requesting the response from Api by Geolocation
function succesCallback(position) {
  const { latitude, longitude } = position.coords;
  const apiKey = "d860141b8dd27eee7d374c849222f32d";
  api =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=metric&appid=" +
    apiKey;

  dataSearch();
}

////If the requesting failed
function failureCallback(error) {
  inputTitle.innerText = error.message;
  inputTitle.classList.add("error");
}

//Api response
function dataSearch() {
  inputTitle.innerText = "Searching...";
  inputTitle.classList.add("pending");

  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

//Loading
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    weatherIcon.style.visibility = "hidden";
    document.querySelector(".lds-ring").style.display = "inline-block";
  } else {
    weatherIcon.style.visibility = "visible";
    document.querySelector(".lds-ring").style.display = "none";
  }
};

//Getting the information from Api
function weatherDetails(info) {
  if (info.cod == 404) {
    inputTitle.innerText = inputBar.value + " not found.";
    inputTitle.classList.replace("pending", "error");
  } else {
    const cityName = info.name;
    const countryName = info.sys.country;
    const weatherDescription = info.weather[0].description;
    const weatherId = info.weather[0].id;
    const temp = info.main.temp;
    const feelsLike = info.main.feels_like;
    const humidity = info.main.humidity;

    //Weather icon
    if (weatherId == 800) {
      weatherIcon.src = "/icons/clear.svg";
      body.style.backgroundImage = "url('/wallpapers/clear.jpg')";
    } else if (weatherId >= 200 && weatherId <= 232) {
      weatherIcon.src = "/icons/storm.svg";
      body.style.backgroundImage = "url('/wallpapers/storm.jpg')";
    } else if (weatherId >= 300 && weatherId <= 321) {
      weatherIcon.src = "/icons/shower-rain.svg";
      body.style.backgroundImage = "url('/wallpapers/rain.jpg')";
    } else if (weatherId >= 500 && weatherId <= 504) {
      weatherIcon.src = "/icons/haze.svg";
      body.style.backgroundImage = "url('/wallpapers/haze.jpg')";
    } else if (weatherId == 511) {
      weatherIcon.src = "/icons/snow.svg";
      body.style.backgroundImage = "url('/wallpapers/snow.jpg')";
    } else if (weatherId >= 520 && weatherId <= 531) {
      weatherIcon.src = "/icons/shower-rain.svg";
      body.style.backgroundImage = "url('/wallpapers/shower-rain.jpg')";
    } else if (weatherId >= 600 && weatherId <= 622) {
      weatherIcon.src = "/icons/snow.svg";
      body.style.backgroundImage = "url('/wallpapers/snow.jpg')";
    } else if (weatherId >= 701 && weatherId <= 781) {
      weatherIcon.src = "/icons/rain.svg";
      body.style.backgroundImage = "url('/wallpapers/rain.jpg')";
    } else if (weatherId >= 801 && weatherId <= 804) {
      weatherIcon.src = "/icons/cloud.svg";
      body.style.backgroundImage = "url('/wallpapers/cloud.jpg')";
    }
    //Weather infos
    wrapper.querySelector(".temp .number").innerText = Math.floor(temp);
    wrapper.querySelector(".weather-description").innerText =
      weatherDescription;
    wrapper.querySelector(".location span").innerText =
      cityName + ", " + countryName;

    //More details in the bottom
    wrapper.querySelector(".more-details .feels-like .number-2").innerText =
      Math.floor(feelsLike);
    wrapper.querySelector(".more-details .humidity .details span").innerText =
      humidity + "%";

    inputTitle.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }
}

backIcon.addEventListener("click", function () {
  wrapper.classList.remove("active");
  body.style.backgroundImage =
    "linear-gradient(109.6deg,rgba(156, 252, 248, 1) 11.2%,rgba(110, 123, 251, 1) 91.1%)";
});
