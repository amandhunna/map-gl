import React from 'react'
import { Routes,Route } from 'react-router-dom';

function ErrorPage() {
    return <strong>Stupid you broke it!</strong>
}

function BasicSetup() {
  return <div className='information'> <h6>BasicSetup</h6></div>
}

function Source() {
  return <div className='information'> <h6>Source</h6></div>
}

function Interaction() {
  return <div className='information'> <h6>Interaction</h6></div>
}

function Styling() {
  return <div className='information'> <h6>Styling</h6></div>
}

function More() {
  return <div className='information'> <h6>More</h6></div>
}

function Information() {
    return (
      <>
        <article>
        <h6>Implementation</h6>
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