let dataCards = document.getElementById("dataCards")

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
    var url = "https://developer.nps.gov/api/v1/parks?stateCode=" + searchBar + "&api_key=8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM"
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            randomPark = data.data[Math.floor(Math.random() * data.data.length)];
            lat = parseInt(randomPark.latitude);
            lon = parseInt(randomPark.longitude);
            console.log(randomPark);
            updateCard(randomPark);
            displayWeather(randomPark.weatherInfo);
            getBeer(lat, lon);
        })
};

var beerData= []
// Returns Brewery locations by latitude & longitude.
function getBeer() {
    var url = `https://api.openbrewerydb.org/v1/breweries?by_dist=${lat},${lon}&per_page=2`
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            beerData.push(data)
            renderBeerOne()
            renderBeerTwo()
            return beerData;
        })
};


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




function renderBeerOne (){
let beerNameOne = document.querySelector("#cardTwo p")
beerNameOne.textContent=beerData[0][0].name
console.log(beerData[0][0].name)
}

function renderBeerTwo () {
    let beerNameTwo = document.querySelector("#cardThree p")
    beerNameTwo.textContent=beerData[0][1].name
    console.log(beerData[0][1].name)
}
