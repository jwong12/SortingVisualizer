import React, { Component } from 'react';
import './ArrayGraph.css';

const NUMBER_OF_ARRAY_BARS = 250;

class ArrayGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        }
     }
    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];

        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 390));
        }
        this.setState({array});
    }

    render() {
        const { array } = this.state;

        return (
            <div className="array-container">
                {array.map((value,i) => {
                    return (
                    <div
                        className="array-bar"
                        key={i}
                        style={{ 
                            backgroundColor: 'grey',
                            height: `${value}px`
                        }}
                    ></div>);
                })}
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

export default ArrayGraph;