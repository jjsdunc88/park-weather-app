// $(document).ready(function(){ 
//     console.log("hello")

//     const apikey = "fa8a706fcf011be6955a40353b9e2226"

    
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


console.log("howdy");
var randomPark;
var lat;
var lon;

// Targets "Apply" button, runs getCity function on click.
document.querySelector("#applyButton").addEventListener("click", getCity);


// Returns a National Park based on State intials input and intiates other functions.
function getCity() {
    var searchBar = document.querySelector("#searchBar").value;
    var url = "https://developer.nps.gov/api/v1/parks?q=" + searchBar + "&api_key=8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM"
        fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            return data;
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
  
// Renders Park & Brewery data on display cards.
function updateCard(randomPark) {
    var parkName = randomPark.fullName;
    var parkDescription = randomPark.description;

    var cardImage = document.querySelector("#cardOne .card-image img");
    var cardContent = document.querySelector("#cardOne .card-content");

    cardImage.src = randomPark.images[0].url;
    cardContent.innerHTML = `
    <div class = "content">
        <h3>${parkName}</h3>
        <p>${parkDescription}</p>
        <button class = "button is-focused">Details</button>
    </div>
    `;
}

// Displays general weather information for chosen park.
function displayWeather(weatherData) {
    var weatherCard = document.querySelector("#weatherCard");
    var content = weatherCard.querySelector(".content");
    content.innerHTML = "<p>" + weatherData + "</p>";
}


// Reset Button clears search bar field.
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function () {
    const inputField = document.querySelector(".input");
    inputField.value = "";

    const cardContent = document.querySelector("#cardOne .content");
    cardContent.innerHTML = "Search Somethin :)";

    const weatherContent = document.querySelector("#weatherCard .content");
    weatherContent.innerHTML = "Search Somethin :)";

    const cardImage = document.querySelector(".card-image img");
    cardImage.src = "https://64.media.tumblr.com/tumblr_lvgbgeaoff1r03kk7o1_500.jpg";
});

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


// Reset Button clears search bar field.
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function () {
    const inputField = document.querySelector(".input");
    inputField.value = "";

    const cardContent = document.querySelector("#cardOne .content");
    cardContent.innerHTML = "Search Somethin :)";

    const weatherContent = document.querySelector("#weatherCard .content");
    weatherContent.innerHTML = "Search Somethin :)";

    const cardImage = document.querySelector(".card-image img");
    cardImage.src = "https://64.media.tumblr.com/tumblr_lvgbgeaoff1r03kk7o1_500.jpg";
});

});
