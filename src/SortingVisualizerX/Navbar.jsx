import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="nav-bar">
                <h2>Sorting Visualizer X</h2>
                <button>Start</button>
                <button>Stop</button>
                <button>Theme</button>
            </div>
        );
    }
}

export default Navbar;