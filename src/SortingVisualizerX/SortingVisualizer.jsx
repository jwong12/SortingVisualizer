import React, { Component } from 'react';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

const algorithmArray = ['selectionSort', 'bubbleSort'];
const NUMBER_OF_ARRAY_BARS = 120; // for testing
const ANIMATION_SPEED_MS = 2;
const PRIMARY_COLOR = 'grey';
const SECONDARY_COLOR = 'red';

class SortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.componentRef = React.createRef();
        this.componentRef.current = randomIntFromInterval(0, 1000000);
        this.state = {
            [this.componentRef.current]: {
                array: [],
                algorithm: String
            }
        };
    }
    
    componentDidMount() {
        this.setState({            
            [this.componentRef.current]: {
                array: [...this.props.array],
                algorithm: algorithmArray[randomIntFromInterval(0,1)]
            }
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props && !this.props.startSort) {
            this.setState({            
                [this.componentRef.current]: {
                    array: [...this.props.array],
                    algorithm: algorithmArray[randomIntFromInterval(0,1)]
                }
            });   
        }

        if(this.props.startSort) {
            switch(this.state[this.componentRef.current].algorithm) {
                case algorithmArray[0]:
                    this.selectionSort();
                    break;
                case algorithmArray[1]:
                    this.bubbleSort();
                    break;
                default:
                    console.log('no algorithm selected')
            }
        }
    }

    selectionSort = () => {
        const animations = sortingAlgorithms.selectionSort(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');
        let barsIndex = 0, n = 0;

        for(let i = 0; i < animations.length; i++) {
            if(animations[i].length === 4) {
                setTimeout(() => {
                    const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;  

                    setTimeout(() => {                            
                        const barStyle = arrayBars[barsIndex++].style;
                        barStyle.backgroundColor = 'green';
                    }, ANIMATION_SPEED_MS); 

                    if(++n === 119) {
                        setTimeout(() => {
                            const barStyle = arrayBars[n].style;
                            barStyle.backgroundColor = 'green';
                        }, ANIMATION_SPEED_MS);  
                    }     
                }, i * ANIMATION_SPEED_MS);

            } else {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;                    
                    }, ANIMATION_SPEED_MS);
                }, i * ANIMATION_SPEED_MS);                
            }
        }
    }

    bubbleSort = () => {
        const animations = sortingAlgorithms.bubbleSort(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');
        let isColorChange, n = 119, barsIndex = 119; // 249

        for (let i = 0; i < animations.length; i++) {
            isColorChange = i % 3 !== 1;

            if (isColorChange) { // every 1st and 3rd. Eg. 0, 2, 3, 5, 6, 8
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 !== 2 ? SECONDARY_COLOR : PRIMARY_COLOR; // 1st true, 2nd and 3rd false (3rd don't execute)
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS/3);

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
                        }, ANIMATION_SPEED_MS);     

                        if(--n === 0) {
                            setTimeout(() => {
                                const barStyle = arrayBars[0].style;
                                barStyle.backgroundColor = 'green';
                            }, ANIMATION_SPEED_MS);   
                        }
                    }                
                }, i * ANIMATION_SPEED_MS/3);                
            }
        }
    }

    selectAlgorithm(algorithm) {
        this.setState({
            [this.componentRef.current]: {
                algorithm
            }
        });
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
            <div className="canvas">
                <div className="canvas-content" ref={this.componentRef}>
                    <div className="array-container">
                        {this.state[this.componentRef.current].array.map((value,i) => {
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
                    <div className="algo-bar">
                        <button onClick={() => this.props.selectAlgorithm(algorithmArray[0])}>SelectionSort</button>
                        <button onClick={() => this.props.selectAlgorithm(algorithmArray[1])}>BubbleSort</button>
                        <button>MergeSort</button>
                        <button>Comparing Count Sort</button>
                        <button>Distribution Count Sort</button>
                        <button>... Sort</button>
                        <button>... Sort</button>
                        <button>... Sort</button>
                    </div>
                </div>
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

export default SortingVisualizer;