import React, { useEffect, useContext } from 'react'
import AppContext from './context';
import { Routes,Route } from 'react-router-dom';
import { initMap,mapStyles, addSource_fromGeojson, addSource_fromShapeFile, add_mapInteraction } from './mapUtils';


function BasicSetup() {
  const context = useContext(AppContext)
  const {lat, lng, zoom, styleIndex } =  context

  useEffect(() => {
    const mapObj = initMap(lat, lng, zoom, mapStyles[styleIndex])
  },[])

  return <div className='information'> <h6>Basic setup</h6></div>
}

function Source() {
  const context = useContext(AppContext)
  const {lat, lng, zoom, styleIndex } =  context

    useEffect(() => {
      const mapObj = initMap(lat, lng, zoom, mapStyles[styleIndex])
      addSource_fromShapeFile(mapObj)
      addSource_fromGeojson(mapObj)
  },[])

  return <div className='information'> <h6>Source</h6></div>
}

function Interaction() {
  const context = useContext(AppContext)
  const {lat, lng, zoom, styleIndex } =  context

    useEffect(() => {
      const mapObj = initMap(lat, lng, zoom, mapStyles[styleIndex])
      addSource_fromShapeFile(mapObj)
      addSource_fromGeojson(mapObj)
      add_mapInteraction(mapObj)
      
  },[])

  return <div className='information'> <h6>Interaction</h6></div>
}

function Styling() {
  const lineColorExpression = [
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
  

  const context = useContext(AppContext)
  const {lat, lng, zoom, styleIndex } =  context

    useEffect(() => {
      const mapObj = initMap(lat, lng, zoom, mapStyles[styleIndex])
      addSource_fromShapeFile(mapObj,lineColorExpression)
      addSource_fromGeojson(mapObj)
      add_mapInteraction(mapObj)
    },[])

  return <div className='information'> <h6>Styling</h6></div>
}

function More() {
  const context = useContext(AppContext)
  const {lat, lng, zoom, styleIndex } =  context

    useEffect(() => {
      const mapObj = initMap(lat, lng, zoom, mapStyles[styleIndex])
    },[])
  return <div className='information'> <h6>More</h6></div>
}

function Information() {
    return (
      <>
        <article>
          <Routes>
            <Route path="/" element={<BasicSetup />} />
            <Route path="/source" element={<Source />} />
            <Route path="/interaction" element={<Interaction />} />
            <Route path="/styling" element={<Styling />} />
            <Route path="/more" element={<More />} />
          </Routes>
      </article>
    </>)
}

export default Information