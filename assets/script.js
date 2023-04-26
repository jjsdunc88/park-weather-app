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
        })       
};





console.log("test");