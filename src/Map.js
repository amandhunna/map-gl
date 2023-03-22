import React from 'react';

function Map({aside, information}) {
    return <>
        <main id="main" style={{width: "100vw", height: "100vh", position: 'relative'}}>
          {aside()}
          <div id="map" style={{width: "100%", height: "100%"}}></div>
          {information()}
        </main> </>
}

export default Map