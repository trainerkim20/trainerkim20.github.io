/* *************************************
*  Weather Site JavaScript Functions
************************************* */




/*Variables for Function Use*/
let temp = 31;
let speed = 5;
buildWC(speed, temp);
console.log(speed,temp);

let direction = "N"; /*Set your own value*/
windDial(direction);
console.log(direction);

/*let summary = document.getElementById("summary");*/
let condition = "wet";
getCondition(condition);
console.log(condition);

let image= getCondition(condition);
changeSummaryImage(image);
console.log(image);





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

if (condition.includes('wet') || condition.includes('rain') || condition.includes('Rainstorm')) {
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

console.log('My javascript is being read.');