// var badRequestUrl = "http://api.openweathermap.org/data";

const key = "d83d9f6051a8ec040d1c4db0b4a4f22d";

var now = moment();


function getApi(lat, lon, cityName) {
  var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=hourly&appid=" + key;
  fetch(requestUrl)
// two .then functions to recieve and convert, and use the data
    .then(function(response) {
      return response.json()
    })
// the json converts response and is used as 'data'

    .then(function (data) {
      showWeatherData(data, cityName)
      // passing cityname from geoRequest to getapi to showweatherdata
    })
}


// showweatherdata is part of a function chaining where i add a function at the end of another function
function showWeatherData(data, cityName) {

  // var city = data.
  var temp = data.current.temp;
  var humidity = data.current.humidity;
  var wind = data.current.wind_speed;
document.querySelector(".called-weather").style.display = 'block';
document.querySelector("#city").innerText = cityName;
document.querySelector("#temp").innerText = temp + "°F"
document.querySelector("#wind").innerText = "Wind " + wind + " MPH"
document.querySelector("#humidity").innerText = humidity + "%  Humidity";

}




function getCoordinates(city) {
  var geoRequestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + key
  fetch(geoRequestUrl)
      .then(function(response) {
        return response.json()
      })
      .then(function (data) {
        var lat = data[0].lat
        var lon = data[0].lon
        var cityName = data[0].name
        getApi(lat, lon, cityName)
      })
}
// getcoordinates uses the actual cityname


var submit = document.getElementById('submit');

submit.addEventListener("click", function(event) {
  event.preventDefault()
  var input = document.getElementById('userInput').value;
  getCoordinates(input)
})









// $("#weather-card" ).animate({
//   width: [ "toggle", "swing" ],
//   opacity: "toggle"
//  }, 1000, "linear", function() {
//   $( this ).after();
//  });
