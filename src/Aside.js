import React, { useState } from 'react'
import { Link } from "react-router-dom";

function Aside() {
    const [active, setActive] = useState({
         1: {
            style: { background: '#FFD966'}
        }
    })

    const onClick = (item) => {
        setActive({
            [item] : {
                style: { background: '#FFD966'}
            }
        })
    }
  
    return (     
        <aside id="navbar">
            <h6>Mapbox tutorials</h6>
            <nav className="navbar">
                <ul className="navbar_itemList">
                    <li {...active[1]}><Link onClick={() => onClick(1)} to='/'>Basic setup</Link></li>
                    <li {...active[2]}><Link onClick={() => onClick(2)} to='/source'>Source</Link></li>
                    <li {...active[3]}><Link onClick={() => onClick(3)} to='/interaction'>Interaction</Link></li>
                    <li {...active[4]}><Link onClick={() => onClick(4)} to='/styling'>Styling</Link></li>
                    <li {...active[5]}><Link onClick={() => onClick(5)} to='/more'>More</Link></li>
                </ul>
            </nav>
        </aside>)
}

export default Aside;
