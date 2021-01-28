const findParksBtn = document.querySelector('#find-parks-btn');
const findStoresBtn = document.querySelector('#find-stores-btn');
const findAdoptionBtn = document.querySelector('#find-adoption-btn');

let address = [];
let googleName = 'dog park';
let lat = [];
console.log(lat);
let lon = [];

findParksBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'dog park';
  collectZip();
  zipConnection();
  initMap();
});

findStoresBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'pet store';
  collectZip();
  zipConnection();
  initMap();
});

findAdoptionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'dog adoption';
  collectZip();
  zipConnection();
  initMap();
});


let map;
let service;
let infowindow;

function initMap() {
  var sanfran = new google.maps.LatLng(37.7749, -122.4194)

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: sanfran,
    zoom: 13,
  });

  const request = {
    location: sanfran,
    radius: '5000',
    name: googleName,
    fields: ["name", "geometry"],
  };
  
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}

function collectZip() {
  let zipCode = document.querySelector('#zip-input').value;
  address.push(zipCode);
  console.log(address) 
}

function zipConnection() {
var requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAKe_ZW4SBBlRchQCJD_fzo23X_TmA1Rvg`
console.log(requestUrl);

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
        return response.json();
        
    })
    .then(function (data) {
      let localLat = data.results[0].geometry.location.lat
      console.log(localLat)
      lat.push(localLat)
      let localLon = data.results[0].geometry.location.lng
      console.log(localLon)
      lon.push(localLon)
    })
  }
  getApi(requestUrl);
  
}

  