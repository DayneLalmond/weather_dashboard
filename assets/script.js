// my key is required to use the API 
const key = "d83d9f6051a8ec040d1c4db0b4a4f22d";

var weatherCard = document.getElementById("weather-card");

// the submit button is the variable to initialize the function chaining above
var submit = document.getElementById('submit');

submit.addEventListener("click", function (event) {
  event.preventDefault()
  // prevent default is required for the submit button to continue without refreshing the page
  var input = document.getElementById('userInput').value;
  getCoordinates(input)
  //getCoordinates is called by clicking 'submit' with the 'input' variable to be searched
});

// getcoordinates will find the information about the searched city
function getCoordinates(city) {
  var geoRequestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + key
  fetch(geoRequestUrl)
    .then(function (response) {
      return response.json()
      // fetching the url, then converting 'response' to json format
    })
    .then(function (data) {
      var lat = data[0].lat
      var lon = data[0].lon
      var cityName = data[0].name
      getApi(lat, lon, cityName)
      // 'response' is converted to 'data' where additional parameters of the API are included per variable
      // getApi function is called with the previously created variables
    })
};

function getApi(lat, lon, cityName) {
  // variable for requesting url with inserted variables when called by the fetch
  var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly&appid=" + key;
  fetch(requestUrl)
    // two .then functions to recieve and convert, and next to use the converted information as 'data'
    .then(function (response) {
      return response.json()
    })
    // the json converts response and is used as 'data'

    .then(function (data) {
      showWeatherData(data, cityName)
      // calling showWeatherData function with 'data' and 'cityname'
      // passing cityname from geoRequest to getapi to showweatherdata
    })
};


// function is called in the order of variable 'submit' being clicked -> getCoordinates() -> getApi() = showWeatherData()
function showWeatherData(data, cityName) {

  var tempurature = data.current.temp;
  var humidity = data.current.humidity;
  var wind = data.current.wind_speed;
  var uvi = data.current.uvi;

  // variables are used to manipulate the text of the below elements to the specified data from the API
  document.querySelector("#city").innerText = cityName;
  document.querySelector("#date").innerText = moment().calendar();
  document.querySelector("#temp").innerText = "Temp: " + tempurature + "°F ❚";
  document.querySelector("#humidity").innerText = "Humidity: " + humidity + "% ❚";
  document.querySelector("#wind").innerText = "Wind: " + wind + " MPH ❚";
  document.querySelector("#uvi").innerText = "UV: " + uvi;
  forecast(data)
};

function forecast(data) {
  // for loop adds the day of the week to each iteration, creates new elements for each and appends to the div
  for (let i = 0; i < 5; i++) {
    var daily = data.daily[i].temp.day;
    var humidity = data.daily[i].humidity;
    var wind = data.daily[i].wind_speed;
    var uvi = data.daily[i].uvi;

    const dotw = document.createElement("p");
    dotw.innerText = moment().add([i], 'days').calendar('L');

    const card = document.createElement("span");
    card.innerText = "Temp: " + daily + "°F ❚" + " Humidity: " + humidity + "% ❚ " + "Wind: " + wind + " MPH ❚ " + "UV: " + uvi;

    const select = document.querySelector(".week");
    select.append(dotw)
    select.append(card);
  }
};

