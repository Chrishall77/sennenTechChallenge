// prototype IIFE for NodeJS
;(function (global) { // ; in case the file is concatenated with a non ; line ending
    'use strict'
  
    //import axios
    const axios = require('axios');

    //initialise locations array
    let locations = [];

    //create Location constructor
    class Location {
        constructor(lat, long) {
            this.lat = lat;
            this.long = long;
        }

        getLat() {
            return this.lat;
        }

        getLong() {
            return this.long;
        }
    }

    //axios GET request
    axios.get('https://api.sunrise-sunset.org/json?lat=36.232&lng=-4.420')
        .then(response => {
            let sunrise = response.data.results.sunrise;
            let sunset = response.data.results.sunset;
            console.log(sunrise);
            console.log(sunset);

    })
    .catch(error => {
        console.log(error);
    });

    //call and simply 100 random locations
    generateLocations();
    console.log(locations);

    //loop 100 times populating locations with a new instance of Location
    function generateLocations() {
        for ( let i = 0; i < 100 ; i ++ ) {
            let newLat = generateCoord(90);
            let newLong = generateCoord(180);
            let newLocation = new Location(
                newLat,
                newLong,
            );
            locations.push(newLocation);
        }
    }

    //function that generates random latitude/longitude to 3 fixed decimal places
    function generateCoord(limit) {
        let num = ( Math.random() * limit ).toFixed(3);
        let posorneg = Math.floor( Math.random() );
        if ( posorneg == 0 ) {
            num = num * -1;
        }
        return num;
    }

   }(typeof global !== 'undefined' ? global : this)) // `this`doesn't refer to global in Node.js module


  