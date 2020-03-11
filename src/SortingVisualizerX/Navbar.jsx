import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

function Navbar(props) {
    return (
        <div 
            className="nav-bar"
            data-test="nav-component"
        >
            <h2
                data-test="title"
                style={{ color: props.titleColor }}
            >Sorting Visualizer</h2>
            <button onClick={() => props.startSort()}>Start</button>
            <button onClick={() => props.randomizeAlgo()}>Randomize Algorithms</button>
            <button onClick={() => props.shuffleArray()}>Shuffle</button>
            <button onClick={() => props.changeTheme()}>Theme</button>
        </div>
    );    
}

Navbar.propTypes = {
    startSort: PropTypes.func,
    randomizeAlgo: PropTypes.func,
    shuffleArray: PropTypes.func,
    titleColor: PropTypes.string.isRequired
};

export default Navbar;