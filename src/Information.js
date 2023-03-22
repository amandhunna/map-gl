import React from 'react'
import { Routes,Route } from 'react-router-dom';

function ErrorPage() {
    return <strong>Stupid you broke it!</strong>
}

function BasicSetup() {
  return <div className='information'>BasicSetup</div>
}

function Source() {
  return <div className='information'>Source</div>
}

function Interaction() {
  return <div className='information'>Interaction</div>
}

function Styling() {
  return <div className='information'>Styling</div>
}

function More() {
  return <div className='information'>More</div>
}

function Information() {
    return (
      <article>
        <Routes>
          <Route path="/" element={<BasicSetup />} />
          <Route path="/source" element={<Source />} />
          <Route path="/interaction" element={<Interaction />} />
          <Route path="/styling" element={<Styling />} />
          <Route path="/more" element={<More />} />
        </Routes>
    </article>)
}

export default Information