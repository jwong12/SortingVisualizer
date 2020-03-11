import React from 'react';
import './Navbar.css';

function Navbar(props) {
    return (
        <div className="nav-bar">
            <h2 style={{ color: props.titleColor }}>Sorting Visualizer</h2>
            <button onClick={() => props.startSort()}>Start</button>
            <button onClick={() => props.randomizeAlgo()}>Randomize Algorithms</button>
            <button onClick={() => props.shuffleArray()}>Shuffle</button>
            <button onClick={() => props.changeTheme()}>Theme</button>
        </div>
    );    
}

export default Navbar;