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

//
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
    console.log(stationsURL);
    //URL for Hours
    let hoursURL = data.properties.forecastHourly;
    console.log(hoursURL);
    //URL for Forecast
  //let forecastURL = data.properties.forecast;

 
    // Call the function to get the list of weather stations
    getStationId(stationsURL); 
    //Call Hour
    getHourly(hoursURL);
    console.log(hoursURL);
    //Call Build
    //getForecast(forecastURL);
    //console.log(forecastURL);
   }) 
  .catch(error => console.log('There was a getLocation error: ', error)) 
 } // end getLocation function

 


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
      storage.setItem("Wind Gust", windgust);

      let highTemp = data.properties.maxTemperatureLast24Hours.value;
        storage.setItem("Max Temp", highTemp);
      let lowTemp = data.properties.minTemperatureLast24Hours.value;
        storage.setItem("Min Temp", lowTemp);

        //let summary = data.properties.textDescription;
        storage.setItem("Summary", data.properties.textDescription);

        
    // Build the page for viewing 
    
   }) 
  .catch(error => console.log('There was a getWeather error: ', error)) 
 } // end getWeather function

//  function getForecast(forecastURL); {
//   fetch(forecastURL, idHeader) 
//   .then(function(response){
//     if(response.ok){ 
//      return response.json(); 
//     } 
//     throw new ERROR('Response not OK.');
//   })
//   .then(function (data) { 
//     // Let's see what we got back
//     console.log('Json object from getForecast function:'); 
//     console.log(data);
//     // Store data to localstorage
//     let highTemp2 = data.properties.periods.number[1].temperature;
//         storage.setItem("Max Temp2", highTemp2);
//         let lowTemp2 = data.properties.periods.number[2].temperature;
//         storage.setItem("Min Temp2", lowTemp2);
//  }

 
 buildPage();
      // Populate the current location weather page
function buildPage(){

  //Store more Forecast Data
  


      // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
           
      //Wind Dial 
      let direction = storage.getItem("Wind Direction");
      console.log(direction);
      windDial(direction);

        //Wind Chill
        let speed = parseFloat(storage.getItem("Wind Speed"));
        document.getElementById("poiterspeed").innerHTML = speed;
        let temp = storage.getItem("Current Temp");
        console.log(speed, temp);
        buildWC(speed, temp);

         

        // Task 2 - Populate location information
        //State Name and Loc Name
        let locName = storage.getItem("locName");
        let locState = storage.getItem("locState");
        document.getElementById("locName").innerHTML = locName;
        document.getElementById("locState").innerHTML = locState;
        //Elevation
        //let stationID = storage.getItem("stationId");
        let elevation = storage.getItem("stationElevation"); 
        convertMeters(elevation);
        //document.getElementById("elevation").innerHTML = elevation;

        
        // Task 3 - Populate weather information

        //Current Temp
        let currentTemp = storage.getItem("Current Temp");
        document.getElementById("curTemp").innerHTML = currentTemp;
        //Wind Gusts
        let gust = storage.getItem("Wind Gust");
      console.log(gust);
      document.getElementById("gust").innerHTML = gust;

      if(gust == "null") {
        document.getElementById("gust").innerHTML = speed;
      }
      //High and Low Temp
      let bigTemp = storage.getItem("Max Temp");
      let smallTemp = storage.getItem("Min Temp");
      console.log(bigTemp, smallTemp);
      document.getElementById("bigTemp").innerHTML = bigTemp;
      document.getElementById("smallTemp").innerHTML = smallTemp;

      if(bigTemp == "null") {  
        document.getElementById("bigTemp").innerHTML = "No Data";
      }
      if(smallTemp == "null") {
        // let smallTemp = storage.getItem("Min Temp2");  
        document.getElementById("smallTemp").innerHTML = "No Data";
      }

      //Image Switch
      let textDescription = storage.getItem("Summary");
      let condition = textDescription.toLowerCase();
      console.log(textDescription);
      getCondition(condition);

      let image = getCondition(condition);
      console.log(image);
      changeSummaryImage(image);
      

      //Hourly Forecast
      let hours = storage.getItem("Hourly Forecast");
      buildHourlyData(nextHour,hours);
      console.log(nextHour,hours);

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
          summary.innerHTML = "Rain";
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
          //let summary = document.getElementById("summary").innerHTML;
          
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
        
       
         

console.log('My javascript is being read.')