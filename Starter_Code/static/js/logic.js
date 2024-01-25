let myMap = L.map("map", {
    center: [37.15, -95.37],
    zoom: 3
});


// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create a function to do different colors then call function on line 35 
d3.json(url).then(function(response) {
    function getcolor(depth){
        if(depth > 90 )
        return 'red'
        if(depth >70 )
        return 'orange'
        if(depth > 50)
        return 'yellow'
        
        return 'green'
        

    }
    features = response.features;
    L.geoJson(response,{
        pointToLayer:function(feature, latlng){
            return L.circleMarker(latlng)
        },
        style:function(feature) {
            return {radius: feature.properties.mag * 4, fillColor:  getcolor(feature.geometry.coordinates[2])}}
    }).addTo(myMap);

    // for (let i = 0; i < features.length; i++) {
    //     let geometry = features[i].geometry.coordinates;
    //     let mag = features[i].properties.mag * 12000;
    //     console.log(geometry);
    //     console.log(features[i])
    //     L.CircleMarker([geometry[0], geometry[1]], {radius: mag, color: 'green'}).addTo(myMap);
    // }



});


