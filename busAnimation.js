mapboxgl.accessToken = 'pk.eyJ1Ijoia2d1ZWRlIiwiYSI6ImNreTgwa3B4ZTB6bGEybmt5cmp0ODR6bWwifQ.uN1QE6oCUsmyuQvZJfSD9A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 13
});

const buses = {};

//Starting markers at each school
var mitMarker = new mapboxgl.Marker({"color": "red"})
  .setLngLat([-71.09242, 42.3601])
  .addTo(map);

var harvardMarker = new mapboxgl.Marker({"color": "red"})
  .setLngLat([-71.1167, 42.3770])
  .addTo(map);

//Make the markers
const newMarker = function (lng, lat) {
  return new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
};

const updateMarker = function (marker, lng, lat) {
  marker.setLngLat([lng, lat]);
};
  
async function run(){   
	const locations = await getBusLocations(); //get bus info.
	locations.forEach((bus) => {
  if (buses[bus.attributes.label]) {
    updateMarker(buses[bus.attributes.label], bus.attributes.longitude, bus.attributes.latitude); //change position of marker
    } else {
    buses[bus.attributes.label] = newMarker(bus.attributes.longitude, bus.attributes.latitude); // add new marker 
    }; 
});
	// timer
	setTimeout(run, 15000); //don't hit too often
};
run();

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
  return json.data};


  
