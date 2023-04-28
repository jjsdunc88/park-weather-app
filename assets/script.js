
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

        })       
};
// reset button
const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function(){
    const inputField = document.querySelector(".input");
    inputField.value = "";
})

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




console.log("test");