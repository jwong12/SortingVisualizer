import React, { Component } from 'react';
import ArrayGraph from './ArrayGraph';
import AlgorithmListBar from './AlgorithmListBar';
import './SortingVisualizer.css';

class SortingVisualizer extends Component {
    render() {
        return (
            <div className="canvas">
                <div className="canvas-content">
                    <ArrayGraph />
                    <AlgorithmListBar />
                </div>                
            </div>
        );
    }
}

export default SortingVisualizer;