import React, { useState } from 'react'
import { BrowserRouter} from 'react-router-dom';
import { AppContextProvider } from './context'
import Aside from './Aside';
import Map from './Map'
import Information from './Information'

function App() {
  const [lat, setLat] =  useState(77.08496980000001)
  const [lng, setLng] =  useState(28.644934149999997)
  const [styleIndex,setStyleIndex] = useState(3)
  const [zoom, setZoom] = useState(7)
  const [map, setMap] = useState({})


  const states = {
    lat,lng,styleIndex,zoom,map,
  } 

  const setState = {
    setLat,setLng,setStyleIndex,setZoom,setMap
  }
  const props = {...states, ...setState} 

  return (
    <AppContextProvider value={props} >
      <BrowserRouter>
        <Map 
          aside={() => <Aside />} 
          information={() => <Information />} 
        />
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
