// Global variables
let dataCards = document.getElementById("dataCards")
var randomPark;
var lat;
var lon;
const btnContainer = document.getElementById("statusBar");
var beerData = []

// Local Storage Array
var historyArr = [];
if (localStorage.getItem("history")) {
    historyArr = JSON.parse(localStorage.getItem("history"))
}

// Renders State searches on page as re-searchable buttons
renderButtons(historyArr);


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


// Returns Brewery locations by latitude & longitude, runs Beer Card render functions.
function getBeer() {
    beerData = [];
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


// Renders Park info on Card.
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

// Loads a random picture onto beer cards.
const picArray = ["./assets/brewimages/brewone.jpg", "./assets/brewimages/brewtwo.jpg", "./assets/brewimages/brewthree.jpg", "./assets/brewimages/brewfour.jpg", "./assets/brewimages/brewfive.jpg", "./assets/brewimages/brewsix.jpg"];

let randomPicture = document.querySelector("#imgTwo");
let randomIndex = Math.floor(Math.random() * picArray.length);
randomPicture.src = `${picArray[randomIndex]}`;

let randomPictureTwo = document.querySelector("#imgThree");
let randomIndexTwo = Math.floor(Math.random() * picArray.length);
randomPictureTwo.src = `${picArray[randomIndexTwo]}`;


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
    cardContent.innerHTML = "Search something!";

    const weatherContent = document.querySelector("#weatherCard .content");
    weatherContent.innerHTML = "It's a beautiful day!";

    const cardImage = document.querySelector(".card-image img");
    cardImage.src = "https://64.media.tumblr.com/tumblr_lvgbgeaoff1r03kk7o1_500.jpg";

    localStorage.removeItem("history")
    localStorage.clear();
    historyArr = [];
    btnContainer.innerHTML = "";
});


// Creates buttons based on search history.
function renderButtons(arr) {

    btnContainer.innerHTML = "";

    for (i = 0; i < arr.length; i++) {
        const newBtn = document.createElement("button");
        newBtn.textContent = arr[i]
        newBtn.addEventListener("click", function (e) {
            e.preventDefault()

            var cityIn = e.target.textContent;
            getCity(cityIn)
        })
        btnContainer.appendChild(newBtn);
    }
}

// Selects random beer image from asset library     
function getRandomImg() {
    let myImgSrc;

    const myImageLibraryPath = 'assets/img/';
    const myImageLibrary = ['beer1.jpg', 'beer2.jpg', 'beer3.jpg', 'beer4.jpg', 'beer5.jpg', 'beer6.jpg', 'beer7.jpg', 'beer8.jpg', 'beer9.jpg', 'beer10.jpg'];
    let myImage = myImageLibrary[Math.floor(Math.random() * myImageLibrary.length)];
    myImgSrc = `${myImageLibraryPath}${myImage}`;
    return myImgSrc;
}

// Renders randomly generated beer image on card
function renderBeerOne() {

    const beerNameOne = document.querySelector("#cardTwo p")
    beerNameOne.textContent = "";
    const myImgSrc = document.querySelector('#cardTwo figure')
    myImage = getRandomImg();
    console.log(myImage)
    myImgSrc.innerHTML = `<img src="${myImage}" alt="Card 2">`;
    beerNameOne.textContent = `${beerData[0][0].name}, 
    ${beerData[0][0].street},
    ${beerData[0][0].city},
    ${beerData[0][0].state},
    `
    document.querySelector("#cardTwo a").setAttribute("href", `${beerData[0][0].website_url}`)

    console.log(beerData[0][0])
}

// Renders randomly generated beer image on card
function renderBeerTwo() {

    let beerNameTwo = document.querySelector("#cardThree p")
    beerNameTwo.textContent = "";
    const myImgSrc = document.querySelector('#cardThree figure')
    myImage = getRandomImg();
    myImgSrc.innerHTML = `<img src="${myImage}" alt="Card 3">`;
    beerNameTwo.textContent = `${beerData[0][1].name}, 
    ${beerData[0][1].street},
    ${beerData[0][1].city},
    ${beerData[0][1].state},

    `
    document.querySelector("#cardThree a").setAttribute("href", `${beerData[0][1].website_url}`)

}


// Event Listener for State Initals input form, sets local storage.
document.getElementById("applyButton").addEventListener("click", function (e) {
    e.preventDefault();

    var cityIn = document.getElementById("searchBar").value;
    historyArr.push(cityIn)
    localStorage.setItem("history", JSON.stringify(historyArr));
    renderButtons(historyArr)
    getCity(cityIn)
})


