let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        center: { lat: 13.79446, lng: 100.324738 },
        zoom: 15,
        mapId: "DEMO_MAP_ID",
    });

    // Create a marker at the specified location with customization options
    const doraemon_marker = document.createElement("img");
    doraemon_marker.src = "/images/doraemon_marker.png";
    doraemon_marker.width = 200; // Set the desired width
    doraemon_marker.height = 200; // Set the desired height

    // A marker with a with a URL pointing to a PNG.

    const doraemon_markerView = new AdvancedMarkerElement({
    map,
    position: {lat: 13.79446, lng: 100.324738},
    content: doraemon_marker,
    title: "A marker using a custom PNG Image",
    });
    
}

initMap();
