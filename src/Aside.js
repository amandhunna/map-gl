import React from 'react'
import { Link } from "react-router-dom";

function Aside(props) {
    const {setZoom, nextBoundingBox,mapStyles,styleIndex,setStyleIndex } = props;

    return (     
        <aside id="navbar">
            <div id="goal_title">Mapbox tutorials</div>
            <nav className="navbar">
                <ul className="navbar_itemList">
                    <li><Link to='/'>Basic setup</Link></li>
                    <li><Link to='/source'>Source</Link></li>
                    <li><Link to='/interaction'>Interaction</Link></li>
                    <li><Link to='/styling'>Styling</Link></li>
                    <li><Link to='/more'>More</Link></li>
                </ul>
            </nav>
        </aside>)
}

export default Aside;
