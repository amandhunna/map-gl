import React, {useState, useEffect} from 'react'

 /**
  * STEP 2.1: load static data i.e tile-set or shape-file data 
  * Go to https://studio.mapbox.com/tilesets/
  * Click on "New tileSet" button and upload an tile set (shape-file) "refer screenshot src/screenshot/tile-set.png"
  * 
  * once map is loaded add a "source" to the map, A "source" is a shape-file which can have multiple layers
  * If want to do some interactions over map then add those events to "source" (not on layer). A layer is a part of source.
  */

function initMap(lat, lng, zoom) {
  window.mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    const map = new window.mapboxgl.Map({
  container: 'map',
  center: [lat, lng],
  zoom: zoom,
  // https://docs.mapbox.com/api/maps/styles/
  style: 'mapbox://styles/mapbox/dark-v11'
  });

  return map
}

function addSource_fromShapeFile(map) {
  map.on('load', () => {
    map.addSource('anyNameButSameAsSource', { // other wise layer will not be visible
    type: 'vector',
    url: 'mapbox://asaman.0wyn6aet', // map id from mapbox
    "minzoom": 0,
    "maxzoom": 14
    });

    map.addLayer(
    {
    'id': 'highway-data', // any name
    'type': 'line',
    'source': 'anyNameButSameAsSource', //  map.addSource('anyNameButSameAsSource'... is referring here
    'source-layer': 'delhi_highway-329dkv', // uploaded shape-file name
    'layout': {
    'line-join': 'round',
    'line-cap': 'round'
    },
    'paint': {
    'line-color': '#F5EA5A',
    'line-width': 3
    }
    },
    );
    });
}


function App() {
  const [lat, setLat] =  useState(77.08496980000001)
  const [lng, setLng] =  useState(28.644934149999997)
  const [zoom, setZoom] = useState(8)

  useEffect(() => {
    const mapObj = initMap(lat, lng, zoom)
    addSource_fromShapeFile(mapObj)
  },[])



  return (
        <main id="main" style={{width: "100vw", height: "100vh"}}>
            <div id="map" style={{width: "100%", height: "100%"}}></div>
        </main>
  );
}

export default App;