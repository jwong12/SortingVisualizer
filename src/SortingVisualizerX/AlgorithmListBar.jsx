import React, { Component } from 'react';
import './AlgorithmListBar.css';

class AlgorithmListBar extends Component {
    render() {
        return (
            <div className="algo-bar">
                <button>SelectionSort</button>
                <button>BubbleSort</button>
                <button>MergeSort</button>
                <button>Comparing Count Sort</button>
                <button>Distribution Count Sort</button>
                <button>... Sort</button>
                <button>... Sort</button>
                <button>... Sort</button>
            </div>
        );
    }
}

export default AlgorithmListBar;