import React, { Component } from 'react';
import ArrayGraphContainer from '../containers/ArrayGraphContainer';
import AlgorithmListBar from './AlgorithmListBar';
import './SortingVisualizer.css';

class SortingVisualizer extends Component {
    render() {
        return (
            <div className="canvas">
                <div className="canvas-content">
                    <ArrayGraphContainer />
                    <AlgorithmListBar />
                </div>                
            </div>
        );
    }
}

export default SortingVisualizer;