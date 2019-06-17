let grass = document.getElementById("grassdata");
showData(grass);


function showData(grass){
 
  const flip1 = document.getElementById("flip1");
    var x = document.getElementById("grassdata");
    if (x.style.display === "none") {
      x.style.display = "block";
      flip1.setAttribute("class", "open");
    } else {
      x.style.display = "none";
      flip1.setAttribute("class", "normal");
    }
    
  }
 let fire = document.getElementById("firedata");
  showData(fire);

  function showData(fire){
   
    const flip2 = document.getElementById("flip2");
      var x = document.getElementById("firedata");
      if (x.style.display === "none") {
        x.style.display = "block";
        flip2.setAttribute("class", "open");
      } else {
        x.style.display = "none";
        flip2.setAttribute("class", "normal");
      }
      
    }
