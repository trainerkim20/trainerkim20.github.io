

let pageNav = document.getElementById('bignav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');

let weatherURL = "/weather/js/weather.json";
fetchData(weatherURL);

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get Zip Data
    let zip = g.Zip;
    console.log(zip);

    // Get Lat and Long Data
    let long = g.Longitude;
    let lat = g.Latitude;
    console.log(long);
    console.log(lat);

    // Get the temperature data
    let locTemp= g.Temp;
    console.log(locTemp);

    // Get the wind data 
    let wind = g.Wind;
    console.log(wind);

    // Get Dial Data 
    let direct = g.Direction;
    let gusts = g.Gusts;
    console.log(direct);
    console.log(gusts);

    // Get the current conditions
    let condition = g.Summary;
    console.log(condition);

    // Get the hourly data 
    let hours = g.Hourly;
    console.log(hours);

    // Get Elevation data 
    let elv = g.Elevation;
    console.log(elv); 

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('page-title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"


    // Set Zip code
    document.getElementById("zipper").innerHTML = zip;

    //Set Long and Lat
    document.getElementById("long").innerHTML = long;
    document.getElementById("lat").innerHTML = lat;

    // Set the temperature information
    document.getElementById("curTemp").innerHTML = locTemp;

    // Set the wind information
    document.getElementById("poiterspeed").innerHTML = wind;

    // Set the dial information 
    document.getElementById("winddirection").innerHTML = direct; 
    document.getElementById("gust").innerHTML = gusts;

    // Set dial direction
    windDial(direct);
    console.log(direct);

    // Set the current conditions information
    buildWC(wind,locTemp);
    console.log(wind,locTemp);

    // Set the current conditions
    getCondition(condition);
    console.log(condition);
    document.getElementById("summary").innerHTML = condition;
    let image = getCondition(condition);
    changeSummaryImage(image);
    console.log(image);


    // Set the hourly temperature information
    //document.getElementById("forecastlist").innerHTML = hours;

    // set Elevation data
    convertMeters(elv); 
    console.log(elv);

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}