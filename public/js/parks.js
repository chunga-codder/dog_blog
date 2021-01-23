let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.7686, lng: -122.387 },
    zoom: 8,
  });
}

