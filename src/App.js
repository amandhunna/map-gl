import React, {useEffect, useMemo, useState, useCallback } from 'react'
import * as turf from '@turf/turf'
import './App.css';


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
  [[7.798000, 68.14712], [37.090000, 97.34466]]
]

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


function addDrawing(map) {
  const draw = new window.MapboxDraw({
    displayControlsDefault: false,
    // Select which mapbox-gl-draw control buttons to add to the map.
    controls: {
    polygon: true,
    trash: true
    },
    // Set mapbox-gl-draw to draw by default.
    // The user does not have to click the polygon control button first.
    defaultMode: 'draw_polygon'
    });
    map.addControl(draw);
     
    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);
     
    function updateArea(e) {
    const data = draw.getAll();
    const answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
    const area = turf.area(data);
    // Restrict the area to 2 decimal points.
    const rounded_area = Math.round(area * 100) / 100;
    answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
    } else {
    answer.innerHTML = '';
    if (e.type !== 'draw.delete')
    alert('Click the map to draw a polygon.');
    }
    }
}

function addSearch(map) {
  map.addControl(
      new window.MapboxGeocoder({
      accessToken: window.mapboxgl.accessToken,
      mapboxgl: window.mapboxgl
    })
  );
}

function setBoundingBox(map,index){
  map.fitBounds(bounds[index]);
}

function addRoute(map) {
  
// https://geojson.io/
  map.on('load', () => {
    map.addSource('route', {
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
    'source': 'route',
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
function addTile(map) {
  map.on('load', () => {
    map.addSource('anyNameButSame', {
    type: 'vector',
    url: 'mapbox://asaman.0wyn6aet', // map id from mapbox
    "minzoom": 0,
    "maxzoom": 14
    });

    map.addLayer(
    {
    'id': 'highway-data', // any name
    'type': 'line',
    'source': 'anyNameButSame',
    'source-layer': 'delhi_highway-329dkv', // uploaded file name
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



let count = 0

function App() {

  const [lat, setLat] =  useState(77.08496980000001)
  const [lng, setLng] =  useState(28.644934149999997)
  const [zoom, setZoom] = useState(8)
  const [map, setMap] = useState({})


  
  useEffect(() => {
    const mapObj = initMap(lat, lng, zoom)
    setMap(mapObj)
    
    // Search
    addSearch(mapObj)
    // added drawing
    addDrawing(mapObj)
    // added geoj
    // base layer
    addTile(mapObj)
    addRoute(mapObj)
  },[])


  const nextBoundingBox = () => {
    if(bounds.length -1 < count) {
      count = 0;  
    } else {
      ++count;
    }
    setBoundingBox(map,count)
  }



  return (
        <main id="main">
          <header>
           <div>
            <span>Lat</span>:{lat}:
             <button onClick={() => setLat(prev => prev - 1)}>-</button>
             <button onClick={() => setLat(prev => prev + 1)}>+</button>
           </div>
           <div>
            <span>Lng</span>:{lng}:
            <button onClick={() => setLng(prev => prev - 1)}>-</button>
            <button onClick={() => setLng(prev => prev + 1)}>+</button>
           </div>
           <div>
            <span>Zoom</span>:{zoom}:
            <button onClick={() => setZoom(prev => prev - 1)}>-</button>
            <button onClick={() => setZoom(prev => prev + 1)}>+</button>
           </div>
           <div>
            <span>Set bounding box</span>
            <button onClick={() => nextBoundingBox()}>Set box</button>
           </div>
          </header>
          <section style={{position: 'relative', height: 'calc(100vh - 80px)'}} >
          <div id="map"></div>
          <div class="calculation-box">
          <p>Click the map to draw a polygon.</p>
              <div id="calculated-area"></div>
          </div>              
          </section>

        </main>
  );
}

export default App;
