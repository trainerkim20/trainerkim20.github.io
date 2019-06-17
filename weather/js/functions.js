/* *************************************
*  Weather Site JavaScript Functions
************************************* */




/*Variables for Function Use*/
const temp = 31;
const speed = 5;
buildWC(speed, temp);
console.log(speed,temp);

const direction = "N"; /*Set your own value*/
windDial(direction);
console.log(direction);

const summary = document.getElementById("summary");
const condition = "snow";
getCondition(condition);
console.log(condition);

let image= getCondition(condition);
changeSummaryImage(image);
console.log(image);





let meters= document.getElementById("elevation").innerHTML;
convertMeters(meters);



/* Calculate the Windchill*/
function buildWC(speed, temp) {

    const feelTemp = document.getElementById('feelTemp');

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
const dial = document.getElementById("dial");

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

/*const cr = 'Sunny';
const cd = 'Partly Cloudy';
const fg = 'Foggy';
const rn = 'Wet';
const sow = 'Snowy';*/


function getCondition(condition){
  
if (condition.includes('sunny') || condition.includes('clear') || condition.includes('warm')) {
  return "clear"; 
}
if (condition.includes('partly cloudy') || condition.includes('shady') || condition.includes('cloud')) {
  return "cloud";
}

if (condition.includes('wet') || condition.includes('rain') || condition.includes('Rainstorm')) {
  return "rain";
}

if (condition.includes('fog') || condition.includes('misty') || condition.includes('hazzy')) {
  return "fog";
}
if (condition.includes('snowstorm') || condition.includes('snow') || condition.includes('freezing')) {
  return "snow";
}
}

 


function changeSummaryImage(image) {

  const rectangles = document.getElementById("rectangles");
  const imagesummary = document.getElementById("imagesummary");
  const summary = document.getElementById("summary").innerHTML;
  
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