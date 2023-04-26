$(document).ready(function(){ 
    console.log("hello")

    const apikey = "fa8a706fcf011be6955a40353b9e2226"

    
    function search (alchol){
        console.log("clicked")
        fetch(
            `https://beermapping.com/api/request/=${alcohol}&units=imperial&appid=${apikey}`
        ).then(function(response){
            return response.json()
        }).then(function(data){
    console.log(data)
    // var beer = 