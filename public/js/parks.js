const findParksBtn = document.querySelector('#find-parks-btn');
const findStoresBtn = document.querySelector('#find-stores-btn');
const findAdoptionBtn = document.querySelector('#find-adoption-btn');

let googleName = 'dog park';

findParksBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'dog park';
  codeAddress()
  initMap()
});

findStoresBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'pet store';
  collectZip()
  initMap()
});

findAdoptionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  googleName = 'dog adoption';
  collectZip()
  initMap()
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

// var geocoder;

// function initialize() {
//   geocoder = new google.maps.Geocoder();
//   var latlng = new google.maps.LatLng(-34.397, 150.644);
//   var mapOptions = {
//     zoom: 8,
//     center: latlng
//   }
//   map = new google.maps.Map(document.getElementById('map'), mapOptions);
// }

// function codeAddress() {
//   let zipCode = document.querySelector('#zipcode-input').value;
//   geocoder.geocode( { 'address': zipCode}, function(results, status) {
//     if (status == 'OK') {
//       map.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//           map: map,
//           position: results[0].geometry.location
//       });
//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }




// var address;

// function collectZip() {
//   let zipCode = document.querySelector('#zipcode-input').value;
//   console.log(zipCode);
//   address.push(zipCode)
// }

// console.log(address)

// Geocoder.geocode(results, status) {
//   address: string,
//   location: LatLng,
//   placeId: string,
//   bounds: LatLngBounds,
//   componentRestrictions: GeocoderComponentRestrictions,
//   region: string
//  }


fetch("https://google-maps-geocoding.p.rapidapi.com/geocode/json?address=94158&language=en", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "89214c67b8msh8e994452432b20bp1e9df8jsne2fa5de2365c",
		"x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com"
	}
})
.then(function (response) {
  console.log(response);
  console.log(response.status);
  return response.json();
})
.catch(err => {
	console.error(err);
});
