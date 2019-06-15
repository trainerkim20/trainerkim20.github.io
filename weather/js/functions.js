/* *************************************
*  Weather Site JavaScript Functions
************************************* */




/*Variables for Function Use*/
const temp = 31;
const speed = 5;
buildWC(speed, temp);



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

const direction = "S"; /*Set your own value*/
windDial(direction);

/*Wind Dial Function*/
function windDial(direction){

// Get the wind dial container
const dial = document.getElementById("dial");

    /*Determine the dial class*/
    switch (direction){
    case "North":
    case "N":
     dial.setAttribute("class", "n"); //"n" is the CSS rule selector
     break;
    case "NE":
    case "NNE":
    case "ENE":
     dial.setAttribute("class", "ne");
     break;
    case "NW":
    case "NNW":
    case "WNW":
     dial.setAttribute("class", "nw");
     break;
    case "South":
    case "S":
     dial.setAttribute("class", "s");
     break;
    case "SE":
    case "SSE":
    case "ESE":
     dial.setAttribute("class", "se");
     break;
    case "SW":
    case "SSW":
    case "WSW":
     dial.setAttribute("class", "sw");
     break;
    case "East":
    case "E":
     dial.setAttribute("class", "e");
     break;
    case "West":
    case "W":
     dial.setAttribute("class", "w");
     break;
   }
}

/*const cr = 'Sunny';
const cd = 'Partly Cloudy';
const fg = 'Foggy';
const rn = 'Wet';
const sow = 'Snowy';
getCondition(cr, cd, fg, rn, sow);*/ 

function getCondition(condition){
  const summary = document.getElementById("summary");
switch (condition){
  case "sunny":
    return "Clear";
        case "Partly cloudy":
       return "Cloudy";
           case "wet":
      return "Rain";
       case "snowy":
      return "Snow";
}
}

function changeSummaryImage(image){

  const forecast = document.getElementById("forecast");

  switch (image){
    case "sunny":
   squares.setAttribute("class", "clear");
   break;
   case "cloudy":
  squares.setAttribute("class", "cloud");
  break;
  case "cloudy":
      squares.setAttribute("class", "fog");
      break;
      case "wet":
  squares.setAttribute("class", "rain");
  break;
  case "snowy":
  squares.setAttribute("class", "snow");
  break;
  }
  


}








console.log('My javascript is being read.');