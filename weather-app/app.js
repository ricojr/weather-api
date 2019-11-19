

//select elements
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


// App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// App consts and vars
const Kelvin = 273;
// Api key
const key = "d0ccd0415c9da9dd949601c2ebdb84fb";

// check if browser supports geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setLocation, showError);

} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// set user's position
function setLocation(location) {
    

    let location = cityname
    getWeather(cityname);
}

// show error when there is an issue with geolocation service
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get weather from api provider
function getWeather(cityname
    ) {
    let api = `https://api.openweathermap.org/data/2.5/forecast?q=]${cityname},us&mode=xml&appid=b6907d289e10d714a6e88b30761fae22`;
   
    // console.log(api);
    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - Kelvin);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

        })
        .then(function() {
            displayWeather();
        });

}

// Dislay weather to UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}