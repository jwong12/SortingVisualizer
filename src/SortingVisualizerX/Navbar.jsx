import React, { Component } from 'react';
import './Navbar.css';

function Navbar(props) {
    return (
        <div className="nav-bar">
            <h2>Sorting Visualizer X</h2>
            <button onClick={() => props.startSorting()}>Start</button>
            <button>Stop</button>
            <button>Theme</button>
            <button onClick={() => props.shuffleArray()}>Shuffle</button>
        </div>
    );    
}

export default Navbar;