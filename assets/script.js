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
            updateCard(data);
            displayWeather(data.data[0].weatherInfo);

        })       
};
// reset button
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function(){
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


console.log("test");