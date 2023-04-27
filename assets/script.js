
console.log("howdy");

// National Park Service API Key: 8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM

document.querySelector("#applyButton").addEventListener("click", getCity);

// document.querySelector("#applyButton").addEventListener("click", getBeer);

function getCity() {
    var searchBar = document.querySelector("#searchBar").value;
    var url = "https://developer.nps.gov/api/v1/parks?q=" + searchBar + "&api_key=8fzgFBy23bOctVVOvssIxHSKu8vDZPKnUKcTNKfM"
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data);
        })
};

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function () {
    const inputField = document.querySelector(".input");
    inputField.value = "";
})



// Beer Mapping API Key: f82c35d11ba2db8be445456f47487b12



// function getBeer() {
//     var searchBar = document.querySelector("#searchBar").value;
//     var url = "http://beermapping.com/webservice/locquery/f82c35d11ba2db8be445456f47487b12/" + searchBar + "&s=json"
//     fetch(url)
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (data) {
//             console.log(data);
//         })
// };