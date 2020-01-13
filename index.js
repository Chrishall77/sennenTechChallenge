// global will refer to global for Node.js and window for browsers
;(function (global) { // ; in case the file is concatenated with a non ; line ending
    'use strict'
  
    const axios = require('axios');
    let locations = [];

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

    generateLocations();
    console.log(locations);

    function generateLocations() {
        for ( let i = 0; i < 100 ; i ++ ) {
            let newLat = generateLat();
            let newLong = generateLong();
            let newLocation = new Location(
                newLat,
                newLong,
            );
            locations.push(newLocation);
        }
    }

    
    function generateLong() {
        var num = (Math.random()*180).toFixed(3);
        var posorneg = Math.floor(Math.random());
        if (posorneg == 0) {
            num = num * -1;
        }
        return num;
    }
  
    function generateLat() {
        var num = (Math.random()*90).toFixed(3);
        var posorneg = Math.floor(Math.random());
        if (posorneg == 0) {
            num = num * -1;
        }
        return num;
    }

   }(typeof global !== 'undefined' ? global : this)) // `this`doesn't refer to global in Node.js module


  