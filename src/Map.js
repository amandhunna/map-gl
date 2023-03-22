import React, { useContext, useEffect } from 'react';
import AppContext from './context';
import { mapStyles,bounds, initMap, addSource_fromShapeFile, addSource_fromGeojson } from './mapUtils'

function Map({aside, information}) {
    const context = useContext(AppContext)
    const {lat, lng, zoom, styleIndex, setBoundingBox, setMap, map } =  context

    useEffect(() => {
      const mapObj = initMap(lat, lng, zoom, mapStyles[styleIndex])
      setMap(mapObj)
      addSource_fromShapeFile(mapObj)
      addSource_fromGeojson(mapObj)
    },[styleIndex, zoom]) // here we have the problem that we reinitialize the map object so we use react-map-gl-js so we use bounding box
  

   
    return <>
        <main id="main" style={{width: "100vw", height: "100vh", position: 'relative'}}>
          {aside()}
          <div id="map" style={{width: "100%", height: "100%"}}></div>
          {information()}
        </main> 
      </>
}

export default Map