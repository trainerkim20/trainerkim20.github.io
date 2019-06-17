function showData(){
  /*document.getElementById("grassdata").style.display = "block";*/
    var x = document.getElementById("grassdata");
    if (x.style.display === "none") {
      x.style.display = "block";
      flip.setAttribute("class", "open");
    } else {
      x.style.display = "none";
      flip.setAttribute("class", "normal");
    }
    
  }
