/* *************************************
*  Weather Site JavaScript Functions
************************************* */




/*Variables for Function Use*/
/*let temp = 31;
let speed = 5;
buildWC(speed, temp);
console.log(speed,temp);*/

/*let direction = "N"; /*Set your own value
windDial(direction);
console.log(direction);*/

/*let summary = document.getElementById("summary");*/
//let condition = "Thunderstorms";
//getCondition(condition);
//console.log(condition);

//let image= getCondition(condition);
//changeSummaryImage(image);
//console.log(image);

//these functions will work together to get weather informaton for the current location and populate a web page with the data.
'use strict';

// Set global variable for custom header required by NWS API
var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - fre16008@byui.edu"
    }
  };

  // Call the function to get our location
    //getGeoLocation();

// Setup localStorage
var storage = window.localStorage;
//storage.clear();





// Gets location information from the NWS API
function getLocation(locale) {
  const URL = "https://api.weather.gov/points/" + locale; 
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(URL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('Json object from getLocation function:'); 
    console.log(data);
    // Store data to localstorage 
    storage.setItem("locName", data.properties.relativeLocation.properties.city); 
    storage.setItem("locState", data.properties.relativeLocation.properties.state); 
 
    // Next, get the weather station ID before requesting current conditions 
    // URL for station list is in the data object 
    let stationsURL = data.properties.observationStations; 
    //URL for Hours
    let hoursURL = data.properties.forecastHourly;
    // Call the function to get the list of weather stations
    getStationId(stationsURL); 
    //Call Hour
    getHourly(hoursURL);
    console.log(hoursURL);
   }) 
  .catch(error => console.log('There was a getLocation error: ', error)) 
 } // end getLocation function

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
    let hourlyforecast =[data.properties.periods[1].temperature, data.properties.periods[2].temperature, data.properties.periods[3].temperature, 
    data.properties.periods[4].temperature, data.properties.periods[5].temperature, data.properties.periods[6].temperature, 
    data.properties.periods[7].temperature, data.properties.periods[8].temperature, data.properties.periods[9].temperature, 
    data.properties.periods[10].temperature, data.properties.periods[11].temperature, 
    data.properties.periods[12].temperature, data.properties.periods[13].temperature];

    storage.setItem("Hourly Forecast", hourlyforecast);

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
// }

 // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(stationsURL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getStationId function:'); 
    console.log(data);
  
    // Store station ID and elevation (in meters - will need to be converted to feet) 
    let stationId = data.features[0].properties.stationIdentifier; 
    let stationElevation = data.features[0].properties.elevation.value; 
    console.log('Station and Elevation are: ' + stationId, stationElevation); 
 
    // Store data to localstorage 
    storage.setItem("stationId", stationId); 
    storage.setItem("stationElevation", stationElevation); 
 
    // Request the Current Weather for this station 
    getWeather(stationId);
   }) 
  .catch(error => console.log('There was a getStationId error: ', error)) 
 } // end getStationId function

 // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
  // This is the URL for current observation data 
  const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(URL, idHeader) 
  .then(function(response){
    if(response.ok){ 
     return response.json(); 
    } 
    throw new ERROR('Response not OK.');
  })
  .then(function (data) { 
    // Let's see what we got back
    console.log('From getWeather function:'); 
    console.log(data);
  
    // Store weather information to localStorage 
      let windgust = data.properties.windGust.value;
      storage.setItem('Wind Gust', windgust);
 
    // Build the page for viewing 
    
   }) 
  .catch(error => console.log('There was a getWeather error: ', error)) 
 } // end getWeather function

 buildPage();
      // Populate the current location weather page
function buildPage(){
      // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
           
      //Wind Dial
         
         //windDial(direction);
         //winddirection.innerHTML = direction;

        //Wind Chill
           // let WC = storage.getItem()

        // Task 2 - Populate location information
        // Task 3 - Populate weather information
        // Task 4 - Hide status and show main
        }

        let meters= document.getElementById("elevation").innerHTML;
        convertMeters(meters);
        
        
        
        /* Calculate the Windchill*/
        function buildWC(speed, temp) {
        
            let feelTemp = document.getElementById('feelTemp');
        
            /*Compute the windchill*/
            let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
            console.log(wc);
        
          
        
            /*Round the answer down to integer*/
            wc = Math.floor(wc);
        
            /*If chill is greater than temp, return the temp*/
            wc = (wc > temp)?temp:wc;
        
              // Display the windchill
              console.log(wc);
              feelTemp.innerHTML = wc;
        }
        
        let direction = storage.getItem("Wind Direction");
        console.log(direction);
        windDial(direction);

/*Wind Dial Function*/
function windDial(direction){
        
        // Get the wind dial container
        let dial = document.getElementById("dial");
        
            /*Determine the dial class*/
            switch (direction){
            case "North":
            case "N":
            
             dial.setAttribute("class", "n"); //"n" is the CSS rule selector
             winddirection.innerHTML = "N";
             break;
            case "NE":
            case "NNE":
            case "ENE":
             dial.setAttribute("class", "ne");
             winddirection.innerHTML = "NE";
             break;
            case "NW":
            case "NNW":
            case "WNW":
             dial.setAttribute("class", "nw");
             winddirection.innerHTML = "NW";
             break;
            case "South":
            case "S":
             dial.setAttribute("class", "s");
             winddirection.innerHTML = "S";
             break;
            case "SE":
            case "SSE":
            case "ESE":
             dial.setAttribute("class", "se");
             winddirection.innerHTML = "SE";
             break;
            case "SW":
            case "SSW":
            case "WSW":
             dial.setAttribute("class", "sw");
             winddirection.innerHTML = "SW";
             break;
            case "East":
            case "E":
             dial.setAttribute("class", "e");
             winddirection.innerHTML = "E";
             break;
            case "West":
            case "W":
             dial.setAttribute("class", "w");
             winddirection.innerHTML = "W";
             break;
           }
        }
        
        /*let cr = 'Sunny';
        let cd = 'Partly Cloudy';
        let fg = 'Foggy';
        let rn = 'Wet';
        let sow = 'Snowy';*/
        
        
        function getCondition(condition){
        
          let summary = document.getElementById('summary');
          
        if (condition.includes('sunny') || condition.includes('clear') || condition.includes('warm')) {
            
          
              summary.innerHTML = "Clear";
              return "clear";
        }
        if (condition.includes('partly cloudy') || condition.includes('shady') || condition.includes('cloud')) {
          summary.innerHTML = "Cloud";
          return "cloud";
        }
        
        if (condition.includes('wet') || condition.includes('rain') || condition.includes('Rainstorm') || condition.includes('Thunderstorms')) {
          //summary.innerHTML = "Rain";
          return "rain";
        }
        
        if (condition.includes('fog') || condition.includes('misty') || condition.includes('hazzy')) {
          summary.innerHTML = "Fog";
          return "fog";
        }
        if (condition.includes('snowstorm') || condition.includes('snow') || condition.includes('freezing')) {
          summary.innerHTML = "Snow";
          return "snow";
        }
        }
        
         
        function changeSummaryImage(image) {
        
          let rectangles = document.getElementById("rectangles");
          let imagesummary = document.getElementById("imagesummary");
          let summary = document.getElementById("summary").innerHTML;
          
          if (image == 'clear'){
                rectangles.setAttribute("class", "clear");
                imagesummary.setAttribute("class", "clear");
          }
          if (image == 'cloud'){
              rectangles.setAttribute("class", "cloud");
              imagesummary.setAttribute("class", "cloud");
          }
          if (image == 'fog'){
              rectangles.setAttribute("class", "fog");
              imagesummary.setAttribute("class", "fog");
          }
          if (image == 'rain'){
                  rectangles.setAttribute("class", "rain");
                  imagesummary.setAttribute("class", "rain");
          }
          if (image == 'snow'){
              rectangles.setAttribute("class", "snow");
              imagesummary.setAttribute("class", "snow");
          }
        }
        
        
        function convertMeters(meters){
        
          let feet= meters*3.281;
          console.log(feet);
        
          feet=Math.floor(feet);
          console.log(feet);
        
          elevation.innerHTML= feet;
        
        }
        
        // Get the next hour based on the current time
        let date = new Date(); 
        let nextHour = date.getHours() + 1;
        
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
        
        let hourlyTemps = [55, 55, 56, 57, 57, 57, 59, 59, 59, 60, 61, 63, 64];
        
          // Build the hourly temperature list
        function buildHourlyData(nextHour,hourlyTemps) {
          // Data comes from a JavaScript object of hourly temp name - value pairs
          // Next hour should have a value between 0-23
          // The hourlyTemps variable holds an array of temperatures
          // Line 8 builds a list item showing the time for the next hour 
          // and then the first element (value in index 0) from the hourly temps array
           let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
           // Build the remaining list items using a for loop
           for (let i = 1, x = hourlyTemps.length; i < x; i++) {
            hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
           }
           console.log('HourlyList is: ' +hourlyListItems);
           return hourlyListItems;
          }
        
         

console.log('My javascript is being read.');