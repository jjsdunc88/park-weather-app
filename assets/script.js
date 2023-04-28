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
        })
};

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", function () {
    const inputField = document.querySelector(".input");
    inputField.value = "";
})


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