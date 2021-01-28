const findParksBtn = document.querySelector('#find-parks-btn');
const findStoresBtn = document.querySelector('#find-stores-btn');
const findAdoptionBtn = document.querySelector('#find-adoption-btn');

// Blank array for address (in this case just zip code, but could expand later for finer location granularity)
let address = [];
console.log(address);

// Default marker type
let googleName = 'dog park';


findParksBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'dog park';
  collectZip();
});

findStoresBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'pet store';
  collectZip();
});

findAdoptionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'dog adoption';
  collectZip();
});

// Collect and store zip code from user input
function collectZip() {
  let zipCode = document.querySelector('#zip-input').value;
  // Clear address array
  clearAddress()
  // Populate address array
  address.push(zipCode);
  zipConnection();
}

// Clear address function used to keep one single zipcode in address array
function clearAddress() {
  address = [];
}

// Clear latitude function used to keep one single latitude in lat array
function clearLat() {
  lat = [];
}

// Clear longitude function used to keep one single longitude in lat array
function clearLon() {
  lon = [];
}


// Connect to Geocoder API
function zipConnection() {
var requestUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyAKe_ZW4SBBlRchQCJD_fzo23X_TmA1Rvg`
console.log(requestUrl);

function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
        return response.json();
        
    })
    .then(function (data) {
      // collect and store latitude from geocoder
      let localLat = parseFloat(data.results[0].geometry.location.lat)
      // clear global latitude array
      clearLat();
      // populate global latitude array
      lat.push(localLat)

      // collect and store longitude goecoder
      let localLon = parseFloat(data.results[0].geometry.location.lng)
      // clear global longitude array
      clearLon();
      // populate global longitude array
      lon.push(localLon)

      return (localLat, localLon)
    })
  }
  getApi(requestUrl);

  let lat = [];
  console.log(lat);
  let lon = [];
  console.log(lon);
  // let coordinates = {
  //   lat: lat,
  //   lon: lon,
  // }
  // console.log(coordinates)

  // Connect to Places API
let map;
let service;
let infowindow;

function initMap() {
  // console.log(typeof(lat));
  // console.log(lat);
  // localLat2 = parseFloat(lat)
  // console.log(localLat2)
  // console.log(typeof(localLat2))

  let coordinates = {
    lat: lat,
    lon: lon
  }
  console.log(coordinates)

  var userLocation = new google.maps.LatLng(coordinates.lat[0], coordinates.lon[0])
  console.log(userLocation);
  console.log(typeof(userLocation))

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(document.getElementById("map"), {
    center: userLocation,
    zoom: 13,
  });

  const request = {
    location: userLocation,
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

  initMap();
  
}

