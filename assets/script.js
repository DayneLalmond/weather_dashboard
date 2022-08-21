// my key is required to use the API 
const key = "d83d9f6051a8ec040d1c4db0b4a4f22d";

var weatherCard = document.getElementById("weather-card");

function getApi(lat, lon, cityName) {
  // variable for requesting url with inserted variables when called by the fetch
  var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly&appid=" + key;
  fetch(requestUrl)
// two .then functions to recieve and convert, and next to use the converted information as 'data'
    .then(function(response) {
      return response.json()
    })
// the json converts response and is used as 'data'

    .then(function (data) {
      showWeatherData(data, cityName)
      // calling showWeatherData function with 'data' and 'cityname'
      // passing cityname from geoRequest to getapi to showweatherdata
    })
}


// function is called in the order of variable 'submit' being clicked -> getCoordinates() -> getApi() = showWeatherData()
function showWeatherData(data, cityName) {

  var temp = data.current.temp;
  var humidity = data.current.humidity;
  var wind = data.current.wind_speed;
  // variables are used to manipulate the text of the below elements to the specified data from the API
document.querySelector("#city").innerText = cityName;
document.querySelector("#temp").innerText = temp + "°F"
document.querySelector("#wind").innerText = "Wind " + wind + " MPH"
document.querySelector("#humidity").innerText = humidity + "%  Humidity";
addClass()
// calling addClass function
}

// addclass changes the display and adds animation
function addClass() { 
  weatherCard.classList.add("toggler");
  // adds a class to the 'weatherCard'
  document.querySelector(".called-weather").style.display = 'block';
  // changes the CSS style of the class '.called-weather'
}

// getcoordinates will find the information about the searched city
function getCoordinates(city) {
  var geoRequestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + key
  fetch(geoRequestUrl)
      .then(function(response) {
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
}


// the submit button is the variable to initialize the function chaining above
var submit = document.getElementById('submit');

submit.addEventListener("click", function(event) {
  event.preventDefault()
  // prevent default is required for the submit button to continue without refreshing the page
  var input = document.getElementById('userInput').value;
  getCoordinates(input)
  //getCoordinates is called by clicking 'submit' with the 'input' variable to be searched
})


