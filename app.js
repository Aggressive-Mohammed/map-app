let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [6.700442893312847, -1.6824256841338396],
    zoom: 12
});

function runDirection(start, end){

//Recreating the map

 map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [6.700442893312847, -1.6824256841338396],
    zoom: 12
});

var dir = MQ.routing.directions();

dir.route({
    locations: [
       start,
       end
    ]
});

CustomRouteLayer = MQ.Routing.RouteLayer.extend({
    createStartMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
            iconUrl: 'https://www.mapquestapi.com/staticmap/geticon?uri=poi-red_1.png',
            iconSize: [20, 29],
            iconAnchor: [10, 29],
            popupAnchor: [0, -29]
        });

        marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

        return marker;
    },

    createEndMarker: (location) => {
        var custom_icon;
        var marker;

        custom_icon = L.icon({
            iconUrl: 'https://www.mapquestapi.com/staticmap/geticon?uri=poi-blue_1.png',
            iconSize: [20, 29],
            iconAnchor: [10, 29],
            popupAnchor: [0, -29]
        });

        marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

        return marker;
    }
});

map.addLayer(new CustomRouteLayer({
    directions: dir,
    fitBounds: true
}));

}

//Function that runs when the form is submitted

function submitForm(event){
 event.preventDefault();

 // Delete current map layer
 map.remove();
 
//getting form Data

start = document.getElementById("start").value;
end = document.getElementById("Destination").value;

//run destination function
runDirection(start, end);

//reset the form after submistion

document.getElementById('form').reset();

}

//Asign the form to a variable

const form = document.getElementById('form')

//Call the submitForm function when the summitting the form

form.addEventListener('submit', submitForm);