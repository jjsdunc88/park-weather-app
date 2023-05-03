// Global variables
let dataCards = document.getElementById("dataCards")
var randomPark;
var lat;
var lon;



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

// Array to hold brewery data for each search.
var beerData  = []


// Returns Brewery locations by latitude & longitude, runs Beer Card render functions.
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


// Renders Park info on Card One.
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


// // Renders Brewery One info on Card One
// function renderBeerOne() {
//     let beerNameOne = document.querySelector("#cardTwo p")
//     beerNameOne.textContent = beerData[0][0].name
//     console.log(beerData[0][0].name)
// }

// // Renders Brewery Two info on Card Two
// function renderBeerTwo() {
//     let beerNameTwo = document.querySelector("#cardThree p")
//     beerNameTwo.textContent = beerData[0][1].name
//     console.log(beerData[0][1].name)
// }



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
    cardContent.innerHTML = "Search Something :)";

    const weatherContent = document.querySelector("#weatherCard .content");
    weatherContent.innerHTML = "Search Something :)";

    const cardImage = document.querySelector(".card-image img");
    cardImage.src = "https://64.media.tumblr.com/tumblr_lvgbgeaoff1r03kk7o1_500.jpg";
});




// Creates buttons based on search history.
function renderButtons(arr) {
    const btnContainer = document.getElementById("statusBar");
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
    }}

function getRandomImg() {
    let myImgSrc;
    
    const myImageLibraryPath = 'assets/img/';
    const myImageLibrary = ['beer1.jpg','beer2.jpg','beer3.jpg','beer4.jpg','beer5.jpg','beer6.jpg','beer7.jpg','beer8.jpg','beer9.jpg','beer10.jpg'];
    let myImage = myImageLibrary[Math.floor(Math.random() * myImageLibrary.length)];
    myImgSrc = `${myImageLibraryPath}${myImage}`;
    return myImgSrc;
}

function renderBeerOne() {
    const beerNameOne = document.querySelector("#cardTwo p")
    const myImgSrc = document.querySelector('#cardTwo figure')
    myImage = getRandomImg();
    console.log(myImage)
    myImgSrc.innerHTML= `<img src="${myImage}" alt="Card 2">`;
    beerNameOne.textContent = `${beerData[0][0].name}, apples
    ${beerData[0][0].street},
    ${beerData[0][0].city},
    ${beerData[0][0].state},
    `
    document.querySelector("#cardTwo a").setAttribute("href",`${beerData[0][0].website_url}`)
    
    console.log(beerData[0][0])
}

function renderBeerTwo() {
    let beerNameTwo = document.querySelector("#cardThree p")
    const myImgSrc = document.querySelector('#cardThree figure')
    myImage = getRandomImg();
    myImgSrc.innerHTML= `<img src="${myImage}" alt="Card 3">`;
    beerNameTwo.textContent = `${beerData[0][1].name}, 
    ${beerData[0][0].street},
    ${beerData[0][0].city},
    ${beerData[0][0].state},

    `
    document.querySelector("#cardThree a").setAttribute("href",`${beerData[0][1].website_url}`)

    console.log(beerData[0][1])
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


