// National Park Service API Key: 8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM
// Beer Mapping API Key: f82c35d11ba2db8be445456f47487b12

console.log("howdy");


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
            console.log(randomPark);
            updateCard(randomPark);
            displayWeather(randomPark.weatherInfo);
            getBeer(randomPark.addresses[0].city);

            // updateCard(data);
        })
};

// Returns Brewery locations by city.
function getBeer(searchBar) {
    var url = "http://beermapping.com/webservice/loccity/f82c35d11ba2db8be445456f47487b12/" + searchBar + "&s=json"
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
            return data;
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



