/* *************************************
*  Weather Site JavaScript Functions
************************************* */


const feelTemp = document.getElementById('feelTemp');
/* Calculate the Windchill*/
function buildWC(speed, temp) {
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
}








console.log('My javascript is being read.');