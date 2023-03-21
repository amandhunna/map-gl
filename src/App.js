import React, {useState, useEffect} from 'react'

const mapStyles = [
  'mapbox://styles/mapbox/streets-v12',
  'mapbox://styles/mapbox/outdoors-v12',
  'mapbox://styles/mapbox/light-v11',
  'mapbox://styles/mapbox/dark-v11',
  'mapbox://styles/mapbox/satellite-v9',
  'mapbox://styles/mapbox/satellite-streets-v12',
  'mapbox://styles/mapbox/navigation-day-v1',
  'mapbox://styles/mapbox/navigation-day-v1',
  'mapbox://styles/mapbox/navigation-night-v1'  
]

function initMap(lat, lng, zoom, style) {
  window.mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
    const map = new window.mapboxgl.Map({
  container: 'map',
  center: [lat, lng],
  zoom: zoom,
  style: style
  });
// https://docs.mapbox.com/help/tutorials/add-points-pt-3/#part-3-add-interactivity
  map.on('click', (event) => {
    // If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['highway-data'] // replace with your layer.id (not source.id)
    });
    if (!features.length) {
      return;
    }
    const feature = features[0];
    console.log("mmm", feature.properties)
  
  /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */

    const popup = new window.mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates[0])
    .setHTML(
      `<h3>${feature.properties.TYPE}</h3><p>${feature.properties.TYPE}</p>`
    )
    .addTo(map);
  })
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

    map.addLayer({
    'id': 'highway-data', // any name
    'type': 'line',
    'source': 'anyNameButSameAsSource', //  map.addSource('anyNameButSameAsSource'... is referring here
    'source-layer': 'delhi_highway-329dkv', // uploaded shape-file name
    'layout': {
    'line-join': 'round',
    'line-cap': 'round'
    },
    'paint': {
      'line-width': 3,
      'line-color':   [
          'case',

            ['in', ['get', 'TYPE'],'primary'],
            '#F2921D',
            ['in', ['get', 'TYPE'],'secondary'],
            '#FFD966',
            ['in', ['get', 'TYPE'],'tertiary'],
            '#F4B183',
            ['==', ['get', 'TYPE'],'residential'],
            '#FFF2CC',
            ['in', ['get', 'TYPE'],'trunk'],
            '#DFA67B',
            ['in', ['get', 'TYPE'],'construction'],
            'red',
            'black'
            ]
      }
    });
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

const bounds =  [
  [ 
  [32.958984, -5.353521], // southwestern corner of the bounds
  [43.50585, 15.615985]// northeastern corner of the bounds
  ],  [ 
  [12.958984, -5.353521], // southwestern corner of the bounds
  [43.50585, 45.615985]// northeastern corner of the bounds
  ],
  [ 
  [22.958984, -5.353521], // southwestern corner of the bounds
  [3.50585, 25.615985]// northeastern corner of the bounds
  ],
  [ 
  [42.958984, -55.353521], // southwestern corner of the bounds
  [43.50585, 15.615985]// northeastern corner of the bounds
  ], [
  [20.958984, 78.353521], // southwestern corner of the bounds
  [20.50585, 78.615985]// northeastern corner of the bounds
  ], 
  [[7.798000, 68.14712], [37.090000, 97.34466]],
]
let count = 0;

function setBoundingBox(map,index){
  map.fitBounds(bounds[index]);
}

function App() {
  const [lat, setLat] =  useState(77.08496980000001)
  const [lng, setLng] =  useState(28.644934149999997)
  const [styleIndex,setStyleIndex] = useState(3)
  const [zoom, setZoom] = useState(7)
  const [map, setMap] = useState({})

  useEffect(() => {
    const mapObj = initMap(lat, lng, zoom, mapStyles[styleIndex])
    setMap(mapObj)
    addSource_fromShapeFile(mapObj)
    addSource_fromGeojson(mapObj)
  },[styleIndex, zoom]) // here we have the problem that we reinitialize the map object so we use react-map-gl-js so we use bounding box

  const nextBoundingBox = () => {
    if(bounds.length -1 < count) {
      count = 0;  
    } else {
      ++count;
    }
    setBoundingBox(map,count)
  }

  return (
        <main id="main" style={{width: "100vw", height: "100vh"}}>
          <section>
            <div className='interaction'>
              <div className='interactionItem'>
                <button onClick={() => setZoom(prev => prev - 1)}>-</button>
                <span>zoom</span>
                <button onClick={() => setZoom(prev => prev + 1)}>+</button>
              </div>
            </div>
            <div className='interaction'>
              <div className='interactionItem'>
                <button onClick={() => nextBoundingBox()}>Set next bounding box</button>
              </div>
            </div>
            <div className='interaction'>
              <div className='interactionItem'>
                <button onClick={() => setStyleIndex(prev => prev === 0? 0:prev - 1)}>Previous style</button>
                <span>{styleIndex}</span>
                <button onClick={() => setStyleIndex(prev => mapStyles.length-1 === prev ?0: prev + 1)}>Next style</button>
              </div>
            </div>
          </section>
            <div id="map" style={{width: "100%", height: "100%"}}></div>
        </main>
  );
}

export default App;