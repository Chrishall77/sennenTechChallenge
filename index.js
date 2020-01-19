// prototype IIFE for NodeJS
;(function (global) { // ; in case the file is concatenated with a non ; line ending
    'use strict'
  
    //import axios
    const axios = require('axios');

    //initialise locations array
    let urls = [];

    function fetchData() {
        const allRequests = urls.map(url =>
            axios(url).then(response => console.log(url + " returns sunrise: " + response.data.results.sunrise + " and sunset: " + response.data.results.sunset))
        );

        return Promise.all(allRequests);
    };
    
     //call and display 5 random locations
    generateLocations();
    fetchData().then(arrayOfResponses =>
        console.log("We got: ", arrayOfResponses.length)
    );

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
        console.log(num);
        return num;
    }

   }(typeof global !== 'undefined' ? global : this)) // `this`doesn't refer to global in Node.js module


  