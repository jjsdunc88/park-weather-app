// $(document).ready(function(){ 
//     console.log("hello")

//     var apikey = "fa8a706fcf011be6955a40353b9e2226"

    
//     function search (alchol){
//         console.log("clicked")
//         fetch(
//             `https://beermapping.com/api/request/=${alcohol}&units=imperial&appid=${apikey}`
//         ).then(function(response){
//             return response.json()
//         }).then(function(data){
//     console.log(data)
//     // var beer = 


console.log("howdy");

// National Park Service API Key: 8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM

document.querySelector("#applyButton").addEventListener("click", getCity);

function getCity () {
    var searchBar = document.querySelector("#searchBar").value;
    var url = "https://developer.nps.gov/api/v1/parks?q=" + searchBar + "&api_key=8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM"
        fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
        })       
};

// variable declarations
var apiKey = "69550612ac9d43328d7234409232504";
var weatherCard = document.getElementById("weatherCard");
var searchBar = document.getElementById("searchBar");
var applyButton = document.getElementById("applyButton");

// search form
applyButton.addEventListener("click", function() {
    var city = searchBar.value;

//   Create API fetch
    fetch("https://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=" + city + "&days=3")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var forecast = data.forecast.forecastday;
  
        var cardContent = city + "Weather Forecast";
//   Modify
        for ( var i= 0; i < forecast.length; i++) {
          var date = forecast[i].date;
          var weatherIcon = forecast[i].day.condition.icon;
          var weatherDescription = forecast[i].day.condition.text;
          var highTemp = forecast[i].day.maxtemp_f;
          var lowTemp = forecast[i].day.mintemp_f;
//  Append 
          cardContent += "<div class='forecastDay'>" +
            "<p><strong>" + date + "</strong></p>" +
            "<img src='" + weatherIcon + "' alt='" + weatherDescription + "'/>" +
            "<p><strong>Weather:</strong> " + weatherDescription + "</p>" +
            "<p><strong>High Temp:</strong> " + highTemp + "°F</p>" +
            "<p><strong>Low Temp:</strong> " + lowTemp + "°F</p>" +
            "</div>";
        }
  
        weatherCard.innerHTML = cardContent;
      })
    //   .catch(function(error) {
    //     console.error(error);
    //     weatherCard.innerHTML = "<h2>Error loading weather forecast</h2>";
    //   });
  });


