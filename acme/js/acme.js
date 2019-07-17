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

let acmeURL = "../js/acme.json";
let pageNav = document.getElementById('pagenav');
let home = document.getElementById('homepage');
let contentContainer = document.getElementById('content');

let productData = JSON.parse(storage.getItem("Object Name"));
navigationBar(productData);
function navigationBar(productData) {
    
let navListItems = "<li>" + "<a>" + "Home" + "</a>" + "</li>";

    for (let i = 0, x = 4; i < x; i++) {
   
        navListItems += '<li>' + "<a>" + productData[i] + "</a>" + '</li>';
       }
       return navListItems;
}

document.getElementById("pageNavItems").innerHTML = navigationBar(productData);
pageNav.addEventListener('click', function (evt) {
    home.setAttribute('class', 'hide'); // hides the home container   

    let pageName = evt.target.innerHTML;
    console.log(pageName);
    console.log(pageName);
    // Get the city name
    switch (pageName) {
        case "Home":
                contentContainer.setAttribute('class', 'hide'); // removes the hide class 
                home.setAttribute('class', '');
                break;
        case "Anvils":
                contentContainer.setAttribute('class', ''); // removes the hide class 
                break;
        case "Explosives":
                contentContainer.setAttribute('class', ''); // removes the hide class 
                break;
        case "Decoys":
                contentContainer.setAttribute('class', ''); // removes the hide class 
                break;
        case "Traps":
                contentContainer.setAttribute('class', ''); // removes the hide class 
            evt.preventDefault();
            break;
    }

getData();
function getData() {
    fetch(acmeURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            // Check the data object that was retrieved
            console.log(data);

let objectNames = Object.keys(data);
storage.setItem("Object Name", JSON.stringify(objectNames));

            let g = data[pageName];
            storage.setItem("JSON", JSON.stringify(g));

            let productname = g.name;
            document.getElementById("heading").innerHTML = productname;

            let image = g.path;
            document.getElementById("image").src = image;

            let description = g.description;
            document.getElementById("description").innerHTML = description;

            let manufacturer = g.manufacturer;
            document.getElementById("manufacturer").innerHTML = manufacturer;

            let review = g.reviews;
            document.getElementById("review").innerHTML = review;

            let price = g.price;
            document.getElementById("price").innerHTML = price;

        })
}
// let home = document.getElementById('home');
//     home.innerHTML= "Home";
    //, url("template.html");




    fetch(acmeURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new ERROR('Network response was not OK.');
        })
        .then(function (data) {
            // Check the data object that was retrieved
            console.log(data);

            let g = data;

            let testname = g.name;
            console.log(testname);
        })
        
    })
