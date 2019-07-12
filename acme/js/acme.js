function navigationBar() {
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

            let g = data[pageName];

        })
}

let acmeURL = "js/acme.json";
let pageNav = document.getElementById('pagenav');

pageNav.addEventListener('click', function (evt) {

    let pageName = evt.target.innerHTML;
    console.log(pageName);
    console.log(pageName);
    // Get the city name
    switch (pageName) {
        case "Anvils":
        case "Explosives":
        case "Decoys":
        case "Traps":
            evt.preventDefault();
            break;
    }



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

            let g = data[pageName];

            let testname = g.name;
            console.log(testname);
        })
})