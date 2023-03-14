import React, {useState, useEffect} from 'react'

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

function addSource_fromGeojson(map) {
  // https://geojson.io/
  map.on('load', () => {
    map.addSource('routeFromGeoJson', {
    'type': 'geojson',
    'data': {
      'type': 'Feature',
      'properties': {},
      'geometry': {
      'type': 'LineString',
      'coordinates': [
          [
            77.13036481534817,
            28.636150039381945
          ],
          [
            77.13706001149444,
            28.61781455366885
          ],
          [
            77.13706001149444,
            28.612407324720337
          ],
          [
            77.14268397625665,
            28.606999817388683
          ],
          [
            77.1560743685493,
            28.60323790898849
          ],
          [
            77.23186398892358,
            28.628628176280145
          ]
        ],
      }
    }
  });

    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': 'routeFromGeoJson',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
    'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });
  })
}

function App() {
  const [lat, setLat] =  useState(77.08496980000001)
  const [lng, setLng] =  useState(28.644934149999997)
  const [zoom, setZoom] = useState(8)

  useEffect(() => {
    const mapObj = initMap(lat, lng, zoom)
    addSource_fromShapeFile(mapObj)
    addSource_fromGeojson(mapObj)
  },[])



  return (
        <main id="main" style={{width: "100vw", height: "100vh"}}>
            <div id="map" style={{width: "100%", height: "100%"}}></div>
        </main>
  );
}

export default App;