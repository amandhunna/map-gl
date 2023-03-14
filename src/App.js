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

function App() {
  const [lat, setLat] =  useState(77.08496980000001)
  const [lng, setLng] =  useState(28.644934149999997)
  const [zoom, setZoom] = useState(8)

  useEffect(() => {
    const mapObj = initMap(lat, lng, zoom)
  },[])



  return (
        <main id="main" style={{width: "100vw", height: "100vh"}}>
            <div id="map" style={{width: "100%", height: "100%"}}></div>
        </main>
  );
}

export default App;