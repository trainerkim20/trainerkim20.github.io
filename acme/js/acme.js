'use strict';
// Set global variable for custom header required by NWS API
// var idHeader = {
//     headers: {
//       "User-Agent": "Student Learning Project - fre16008@byui.edu"
//     }
//   };

  // Call the function to get our location
    //getGeoLocation();

// Setup localStorage
var storage = window.localStorage;
//storage.clear();
let pageTitle = document.getElementById('page-title');
let acmeURL = "/acme/js/acme.json";
let pageNav = document.getElementById('pagenav');
var home = document.getElementById('homepage');
let contentContainer = document.getElementById('content');
getData();
let productData = JSON.parse(storage.getItem("Object Name"));

navigationBar(productData);
function navigationBar(productData) {
    
let navListItems = "<li>" + "<a>" + "Home" + "</a>" + "</li>";
//'<li><a href="https://trainerkim20.github.io/acme/index.html">Home</a></li>';


    for (let i = 0, x = 4; i < x; i++) {
   
        navListItems += '<li>' + "<a>" + productData[i] + "</a>" + '</li>';
       }
       return navListItems;
}
// getData();
function getData() {
    fetch(acmeURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            else {
            throw new ERROR('Network response was not OK.');
        }
        })
        .then(function (data) {
            // Check the data object that was retrieved
            console.log(data);

let objectNames = Object.keys(data);
console.log(objectNames);
storage.setItem("Object Name", JSON.stringify(objectNames));

            let g = data[objectNames[1]];
            storage.setItem("JSON", JSON.stringify(g));

            let productname = g.name;
            console.log(productname);
            document.getElementById("heading").innerHTML = productname;
            document.getElementById("page-title").innerHTML = "ACME | " + productname;

            let image = g.path;
            document.getElementById("image").src = image;

            let description = g.description;
            document.getElementById("description").innerHTML = description;

            let manufacturer = g.manufacturer;
            document.getElementById("manufacturer").innerHTML = manufacturer;

            let review = g.reviews;
            document.getElementById("rating").innerHTML = review;

            let price = g.price;
            document.getElementById("price").innerHTML = price;

        })
}
document.getElementById("pageNavItems").innerHTML = navigationBar(productData);
pageNav.addEventListener('click', function (evt) {
    home.setAttribute('class', 'hide'); // hides the home container   

    let pageName = evt.target.innerHTML;
    console.log(pageName);
    // Get the city name
    switch (pageName) {
        case "Home":
                contentContainer.getAttribute('class', 'hide');
                home.setAttribute('class', '');
                document.getElementById("page-title").innerHTML = "ACME | Home" ;
                break;
        case "Anvils":
                evt.preventDefault();
                contentContainer.setAttribute('class', ''); // removes the hide class 
                break;
        case "Explosives":
                evt.preventDefault();
                contentContainer.setAttribute('class', ''); // removes the hide class 
                break;
        case "Decoys":
                evt.preventDefault();
                contentContainer.setAttribute('class', ''); // removes the hide class 
                break;
        case "Traps":
                evt.preventDefault();
                contentContainer.setAttribute('class', ''); // removes the hide class 
            break;
    }



    // fetch(acmeURL)
    //     .then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //         throw new ERROR('Network response was not OK.');
    //     })
    //     .then(function (data) {
    //         // Check the data object that was retrieved
    //         console.log(data);

    //         let g = data;

    //         let testname = g.name;
    //         console.log(testname);
    //     })
        // .catch(function(error){
        //     console.log('There was a fetch problem', error.message);
        //     home.innerHTML = 'Sorry, the data could not be processed.';
        // })
        
    })
