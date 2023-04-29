// National Park Service API Key: 8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM
// Beer Mapping API Key: f82c35d11ba2db8be445456f47487b12

console.log("howdy");




document.querySelector("#applyButton").addEventListener("click", getCity);

function getCity() {
    var searchBar = document.querySelector("#searchBar").value;
    var url = "https://developer.nps.gov/api/v1/parks?stateCode=" + searchBar + "&api_key=8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM"
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);

            updateCard(data);
            displayWeather(data.data[0].weatherInfo);


            // var myParks = [];
            // for(var i=0; i < data.data.length;i++) {
            //     var breweries = getBeer(data.data[i].addresses[0].city)
            //     if(breweries.length === 0) {}
            //     else{
            //         myParks.push(data.data[i].name)
            //     }
            // }
            // console.log(myParks);
            getBeer(data.data[2].addresses[0].city);

            updateCard(data);
        })
                      
};

// reset button
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

function updateCard(data) {
    var parkName = data.data[0].fullName;
    var parkDescription = data.data[0].description;

    var cardImage = document.querySelector("#cardOne .card-image img");
    var cardContent = document.querySelector("#cardOne .card-content");

    cardImage.src = data.data[0].images[0].url;
    cardContent.innerHTML = `
    <div class = "content">
        <h3>${parkName}</h3>
        <p>${parkDescription}</p>
        <button class = "button is-focused">Details</button>
    </div>
    `;
}


function displayWeather(weatherData) {
    var weatherCard = document.querySelector("#weatherCard");
    var content = weatherCard.querySelector(".content");
    content.innerHTML = "<p>" + weatherData + "</p>";
}


// document.querySelector("#applyButton").addEventListener("click", getBeer);


function getBeer(searchBar) {
    // var searchBar = document.querySelector("#searchBar").value;
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