mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10', // stylesheet location
    center: field.geometry.coordinates, // starting position [lng, lat]
    zoom: 6 // starting zoom
});

//Adding navigation controls on to the map
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
    .setLngLat(field.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${field.title}</h3>`
            )
    )
    .addTo(map)

