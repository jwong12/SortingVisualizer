import React, { Component } from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './ArrayGraph.css';

const NUMBER_OF_ARRAY_BARS = 250;
const ANIMATION_SPEED_MS = 3;
const PRIMARY_COLOR = 'grey';
const SECONDARY_COLOR = 'red';

class ArrayGraph extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef();
        this.componentRef.current = randomIntFromInterval(0, 1000000);
        this.state = {
            [this.componentRef.current]: []
        };
    }

    componentDidMount() {
        this.setState({            
            [this.componentRef.current]: [...this.props.array]
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && !this.props.startSort) {
            this.setState({            
                [this.componentRef.current]: [...this.props.array]
            });   
        }

        if(this.props.startSort === true) {
            this.bubbleSort(this.state[this.componentRef.current]);
        }
    }

    bubbleSort = (thisArray) => {
        const animations = sortingAlgorithms.bubbleSort(thisArray);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');
        let n = 69, barsIndex = 69; // 249

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 1;

            if (isColorChange) { // every 1st and 3rd. Eg. 0, 2, 3, 5, 6, 8
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 !== 2 ? SECONDARY_COLOR : PRIMARY_COLOR; // 1st true, 2nd and 3rd false (3rd don't execute)
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            } else { // every 2nd 
                setTimeout(() => {
                    const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;  

                    if(barTwoIdx === n || barOneIdx === n) {
                        setTimeout(() => {                            
                            const barStyle = arrayBars[barsIndex--].style;
                            barStyle.backgroundColor = 'green';
                        }, 5);     

                        if(--n === 0) {
                            setTimeout(() => {
                                const barStyle = arrayBars[0].style;
                                barStyle.backgroundColor = 'green';
                            }, 5);   
                        }
                    }                
                }, i * ANIMATION_SPEED_MS);                
            }
        }
    }

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];

            for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
                array.push(randomIntFromInterval(5, 390));
            }

            const jsSortedArray = array.slice().sort((a, b) => a - b);
            const sortedArray = sortingAlgorithms.bubbleSort(array.slice());
            console.log(arraysAreEqual(jsSortedArray, sortedArray));
        }
      }

    render() {
        return (
            <div className="array-container" ref={this.componentRef}>
                {this.state[this.componentRef.current].map((value,i) => {
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

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }

export default ArrayGraph;