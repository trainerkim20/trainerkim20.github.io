//these functions will work together to get weather informaton for the current location and populate a web page with the data.
'use strict';

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - fre16008@byui.edu"
    }
  };

  // Call the function to get our location
    getGeoLocation();

// Setup localStorage
var storage = window.localStorage;
//storage.clear();



// Gets longitude and latitude of current location
 function getGeoLocation() {
     const status = document.getElementById('status');
     status.innerHTML = 'Getting Location...';

     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {          
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
      
          // Combine the values
          const locale = lat + "," + long;
          console.log(`Lat and Long are: ${locale}.`);

          document.getElementById("long").innerHTML = lat;
          document.getElementById("lat").innerHTML = long;

          // Call getLocation function, send locale
          getLocation(locale);
         })

        } else {
         status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
        } // end else
} // end getGeoLocation

function getHourly(hoursURL) {
  fetch(hoursURL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('Json object from getHourly function:'); 
    console.log(data);

    //Store Hourly Forecast
    // let hourlyforecast =[data.properties.periods[1].temperature, data.properties.periods[2].temperature, data.properties.periods[3].temperature, 
    // data.properties.periods[4].temperature, data.properties.periods[5].temperature, data.properties.periods[6].temperature, 
    // data.properties.periods[7].temperature, data.properties.periods[8].temperature, data.properties.periods[9].temperature, 
    // data.properties.periods[10].temperature, data.properties.periods[11].temperature, 
    // data.properties.periods[12].temperature, data.properties.periods[13].temperature];

    
    let hourlyforecast = new Array(0);
    for (let i = 1, x = 13; i < x; i++) {

      hourlyforecast.push(data.properties.periods[i].temperature);
    }
    console.log('Hourly Forcast is ' + hourlyforecast);


    storage.setItem("Hourly Forecast", JSON.stringify(hourlyforecast));

    let windDirection = data.properties.periods[0].windDirection;
    let windSpeed = data.properties.periods[0].windSpeed;
    let tempNow = data.properties.periods[0].temperature;

    storage.setItem("Wind Direction", windDirection);
    storage.setItem("Wind Speed", windSpeed);
    storage.setItem("Current Temp", tempNow);

    let wd = storage.getItem("Wind Direction")
    document.getElementById("winddirection").innerHTML = wd;
}) 
.catch(error => console.log('There was a getHourly error: ', error)) 
} // end getHourly function

 
 
 /*A function that will convert and format hours to a 12 hour format*/
 function format_time(hour) {
   if(hour > 23){ 
     hour -= 24; 
    } 
    let amPM = (hour > 11) ? "pm" : "am"; 
    if(hour > 12) { 
     hour -= 12; 
    } 
    if(hour == 0) { 
     hour = "12"; 
    } 
    return hour + amPM;
   }
 
   //

// Get the next hour based on the current time
let date = new Date(); 
let nextHour = date.getHours() + 1;
   let hourlyTemps = JSON.parse(storage.getItem("Hourly Forecast"));
   buildHourlyData(nextHour,hourlyTemps);
 
   // Build the hourly temperature list
 function buildHourlyData(nextHour,hourlyTemps) {
   // Data comes from a JavaScript object of hourly temp name - value pairs
   // Next hour should have a value between 0-23
   // The hourlyTemps variable holds an array of temperatures
   // Line 8 builds a list item showing the time for the next hour 
   // and then the first element (value in index 0) from the hourly temps array
    let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = 12; i < x; i++) {
     hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
    }
    console.log('HourlyList is: ' + hourlyListItems);
    return hourlyListItems;
   }

   document.getElementById("hourlyforecast").innerHTML = buildHourlyData(nextHour,hourlyTemps);
 

// Gets location information from the NWS API
// function getLocation(locale) {
//     const URL = "https://api.weather.gov/points/" + locale; 
//      // NWS User-Agent header (built above) will be the second parameter 
//     fetch(URL, idHeader) 
//      .then(function(response){
//        if(response.ok){ 
//         return response.json(); 
//        } 
//        throw new ERROR('Response not OK.');
//      })
//      .then(function (data) { 
//        // Let's see what we got back
//        console.log('Json object from getLocation function:'); 
//        console.log(data);
//        // Store data to localstorage 
//        storage.setItem("locName", data.properties.relativeLocation.properties.city); 
//        storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
//        // Next, get the weather station ID before requesting current conditions 
//        // URL for station list is in the data object 
//        let stationsURL = data.properties.observationStations; 
//        // Call the function to get the list of weather stations
//        getStationId(stationsURL); 
//       }) 
//      .catch(error => console.log('There was a getLocation error: ', error)) 
    //} // end getLocation function

//    // Gets weather station list and the nearest weather station ID from the NWS API
// function getStationId(stationsURL) { 
//     // NWS User-Agent header (built above) will be the second parameter 
//     fetch(stationsURL, idHeader) 
//     .then(function(response){
//       if(response.ok){ 
//        return response.json(); 
//       } 
//       throw new ERROR('Response not OK.');
//     })
//     .then(function (data) { 
//       // Let's see what we got back
//       console.log('From getStationId function:'); 
//       console.log(data);
    
//       // Store station ID and elevation (in meters - will need to be converted to feet) 
//       let stationId = data.features[0].properties.stationIdentifier; 
//       let stationElevation = data.features[0].properties.elevation.value; 
//       console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
//       // Store data to localstorage 
//       storage.setItem("stationId", stationId); 
//       storage.setItem("stationElevation", stationElevation); 
   
//       // Request the Current Weather for this station 
//       getWeather(stationId);
//      }) 
//     .catch(error => console.log('There was a getStationId error: ', error)) 
//    } // end getStationId function

//    // Gets current weather information for a specific weather station from the NWS API
// function getWeather(stationId) { 
//     // This is the URL for current observation data 
//     const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
//     // NWS User-Agent header (built above) will be the second parameter 
//     fetch(URL, idHeader) 
//     .then(function(response){
//       if(response.ok){ 
//        return response.json(); 
//       } 
//       throw new ERROR('Response not OK.');
//     })
//     .then(function (data) { 
//       // Let's see what we got back
//       console.log('From getWeather function:'); 
//       console.log(data);
    
//       // Store weather information to localStorage 

//             //storage.setItem('weatherinfo', data);
   
//       // Build the page for viewing 
      
//      }) 
//     .catch(error => console.log('There was a getWeather error: ', error)) 
//    } // end getWeather function