// prototype IIFE for NodeJS
;(function (global) { // ; in case the file is concatenated with a non ; line ending
    'use strict'
  
    //import fetch
    const fetch = require('node-fetch');

    //initialise urls and daylightTimes arrays
    let urls = [];
    let daylightTimes = [];

    //use urls to fetch sunrise and sunset times
    function fetchData() {
        const allRequests = urls.map(url =>
            fetch(url)
            .then(response => response.json())
        );

        return Promise.all(allRequests);
    };
    
     //call and display 5 random locations
    generateLocations();

    //call data from api
    //map sunrise, sunset and day length to new array
    //filter to return day length
    fetchData().then(arrayOfResponses => {
        let batchTimes = arrayOfResponses.map(x =>({sunrise: x.results.sunrise, sunset: x.results.sunset, day_length: x.results.day_length}));
        let minTime = findMin(batchTimes);
        let result = batchTimes.filter(x => x.sunrise == minTime );
        console.log("Hours of daylight: " + result[0].day_length);
        } 
    );

    //findMin(daylightTimes);
    function findMin(array) {
        return array.reduce((min, val) => val.sunrise < min ? val.sunrise : min, array[0].sunrise);
    }
   
    //loop 5 times populating urls with a new url
    function generateLocations() {
        for ( let i = 0; i < 5 ; i ++ ) {
            let newLat = generateCoord(90);
            let newLong = generateCoord(180);
            urls.push("https://api.sunrise-sunset.org/json?lat=" + newLat + "&lng=" + newLong)
        }
    };

    //function that generates random latitude/longitude to 7 fixed decimal places
    function generateCoord(limit) {
        let num = ( Math.random() * limit ).toFixed(7);
        let posorneg = Math.floor( Math.random() );
        if ( posorneg == 0 ) {
            num = num * -1;
        }
        return num;
    }

   }(typeof global !== 'undefined' ? global : this)) // `this`doesn't refer to global in Node.js module


  