import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Algo from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

const algorithmArray = ['selectionSort', 'bubbleSort', 'mergeSort', 'heapSort'];
const NUMBER_OF_ARRAY_BARS = 120; // for testing
const ANIMATION_SPEED_MS = 2;
const PRIMARY_COLOR = 'darkkhaki';
const SECONDARY_COLOR = 'tomato';
const SORTED_COLOR = 'deepskyblue';
const DEFAULT_COLOR = 'grey';

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
        const algorithm = this.highlightAlgoButton(algorithmArray[randomIntFromInterval(0,algorithmArray.length-1)]);
        this.setState({            
            [this.componentRef.current]: {
                array: [...this.props.array],
                algorithm
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.array !== this.props.array) {
            // this.testSortingAlgorithms();
            const node = this.componentRef.current;
            const arrayBars = node.getElementsByClassName('array-bar');

            for(let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = DEFAULT_COLOR;
            }
            const shuffleArray = [...this.props.array];

            this.setState({            
                [this.componentRef.current]: {
                    array: shuffleArray,
                    algorithm: prevState[this.componentRef.current].algorithm
                }
            });   
        }

        if(prevProps.randomAlgoClicks !== this.props.randomAlgoClicks) {
            const algorithm = this.highlightAlgoButton(algorithmArray[randomIntFromInterval(0,algorithmArray.length-1)]);

            if(this.props.isArraySorted) {
                this.setState({            
                    [this.componentRef.current]: {
                        array: this.getSortedArray(),
                        algorithm
                    }
                }); 
            } else {
                this.setState({            
                    [this.componentRef.current]: {
                        array: [...this.props.array],
                        algorithm
                    }
                }); 
            }            
        }

        if(prevProps.startSort !== this.props.startSort && this.props.startSort) {
            switch(this.state[this.componentRef.current].algorithm) {
                case algorithmArray[0]:
                    this.selectionSort();
                    break;
                case algorithmArray[1]:
                    this.bubbleSort();
                    break;
                case algorithmArray[2]:
                    this.mergeSort();
                    break;
                case algorithmArray[3]:
                    this.heapSort();
                    break;
                default:
                    console.error('no algorithm selected')
            }
        }
    }

    selectionSort = () => {
        const animations = Algo.getSelectionSortAnimations(this.state[this.componentRef.current].array);
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
                        barStyle.backgroundColor = SORTED_COLOR;
                    }, ANIMATION_SPEED_MS); 

                    if(++n === 119) {
                        setTimeout(() => {
                            const barStyle = arrayBars[n].style;
                            barStyle.backgroundColor = SORTED_COLOR;
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
        const animations = Algo.getBubbleSortAnimations(this.state[this.componentRef.current].array);
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
                }, i * ANIMATION_SPEED_MS / 3);

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
                            barStyle.backgroundColor = SORTED_COLOR;
                        }, ANIMATION_SPEED_MS);     

                        if(--n === 0) {
                            setTimeout(() => {
                                const barStyle = arrayBars[0].style;
                                barStyle.backgroundColor = SORTED_COLOR;
                            }, ANIMATION_SPEED_MS);   
                        }
                    }                
                }, i * ANIMATION_SPEED_MS/3);                
            }
        }
    }

    // bubbleSort = () => {
    //     const animations = Algo.getBubbleSortAnimations(this.state[this.componentRef.current].array);
    //     const node = this.componentRef.current;
    //     const arrayBars = node.getElementsByClassName('array-bar');
    //     console.log(animations.length);

    //     for (let i = 0; i < animations.length; i++) {
    //         if(animations[i].length === 2) {               
    //             setTimeout(() => {
    //                 const [barOneIdx, barTwoIdx] = animations[i];
    //                 const barOneStyle = arrayBars[barOneIdx].style;
    //                 const barTwoStyle = arrayBars[barTwoIdx].style;
    //                 barOneStyle.backgroundColor = SECONDARY_COLOR;
    //                 barTwoStyle.backgroundColor = SECONDARY_COLOR;

    //                 setTimeout(() => {
    //                     barOneStyle.backgroundColor = PRIMARY_COLOR;
    //                     barTwoStyle.backgroundColor = PRIMARY_COLOR;
    //                 }, 5);                    
    //             }, i * ANIMATION_SPEED_MS * 2);

    //         } else if(animations[i].length === 4) {                
    //             setTimeout(() => {            
    //                 const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
    //                 const barOneStyle = arrayBars[barOneIdx].style;
    //                 const barTwoStyle = arrayBars[barTwoIdx].style;
    //                 barOneStyle.height = `${barOneHeight}px`;
    //                 barTwoStyle.height = `${barTwoHeight}px`;  
    //                 barOneStyle.backgroundColor = SECONDARY_COLOR;
    //                 barTwoStyle.backgroundColor = SECONDARY_COLOR;

    //                     setTimeout(() => {                            
    //                         barOneStyle.backgroundColor = PRIMARY_COLOR;
    //                         barTwoStyle.backgroundColor = PRIMARY_COLOR;
    //                     }, 5);
    //             }, i * ANIMATION_SPEED_MS * 2);

    //         } else {               
    //             setTimeout(() => {
    //                 const [barOneIdx] = animations[i];
    //                 const barOneStyle = arrayBars[barOneIdx].style;
    //                 barOneStyle.backgroundColor = SORTED_COLOR;
    //             }, i * ANIMATION_SPEED_MS * 2.05 + 10);
    //         }            
    //     }
    // }

    mergeSort() {
        const animations = Algo.getMergeSortAnimations(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2; // 1st and 2nd true, 3rd false

            if (isColorChange) { // 1st and 2nd [i] processed
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR; // 1st true, 2nd and 3rd false (3rd don't execute)                

                if(animations[i].length !== 3) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * ANIMATION_SPEED_MS * 3);

                } else {
                    const [barOneIdx] = animations[i]; 
                    const barOneStyle = arrayBars[barOneIdx].style;

                    setTimeout(() => {                    
                        barOneStyle.backgroundColor = SORTED_COLOR;
                    }, i * ANIMATION_SPEED_MS * 3);    
                }

            } else { // every 3rd i 
                const [barOneIdx, newHeight] = animations[i]; 
                const barOneStyle = arrayBars[barOneIdx].style;
                
                setTimeout(() => {                    
                    barOneStyle.height = `${newHeight}px`;

                    if(animations[i].length === 3) {
                        setTimeout(() => {                    
                            barOneStyle.backgroundColor = SORTED_COLOR;
                        }, 0);    
                    }
                }, i * ANIMATION_SPEED_MS * 3);              
            }
        }
    }

    heapSort() {
        const animations = Algo.getHeapSortAnimations(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            if(animations[i].length === 2) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = PRIMARY_COLOR;
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }, 10);
                }, i * ANIMATION_SPEED_MS * 4.7);
                
            } else if(animations[i].length === 4) {
                const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i]; 
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;                 

                setTimeout(() => {         
                    barOneStyle.backgroundColor = SECONDARY_COLOR;                  
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;

                    setTimeout(() => {   
                        barOneStyle.height = `${barOneHeight}px`;
                        barTwoStyle.height = `${barTwoHeight}px`;                      
                        barOneStyle.backgroundColor = PRIMARY_COLOR;                  
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;
                    }, 10)
                }, i * ANIMATION_SPEED_MS * 4.7); 

            } else {
                const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i]; 
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;                 

                setTimeout(() => {         
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                    barOneStyle.backgroundColor = SORTED_COLOR;     
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;  

                    setTimeout(() => {
                        barTwoStyle.backgroundColor = PRIMARY_COLOR;  
                    }, 10) 

                    if(i === animations.length - 1) {
                        setTimeout(() => {
                            arrayBars[0].style.backgroundColor = SORTED_COLOR;   
                        }, 10) 
                    }   
                }, i * ANIMATION_SPEED_MS * 4.75); 
            }            
        }
      }

    highlightAlgoButton(algorithm) {
        const node = this.componentRef.current;
        const buttons = node.getElementsByClassName('algo-buttons');

        for(let i = 0; i < buttons.length; i++) {
            if(algorithm === buttons[i].id){
                buttons[i].style.color = '#ffffff';
                buttons[i].style.backgroundColor = '#f6b93b';
            } else {
                buttons[i].style.color = '#494949';
                buttons[i].style.backgroundColor = '#ffffff';
            }
        }        

        return algorithm;
    }

    handleClickAlgoButton = (algo) => {
        const algorithm = this.highlightAlgoButton(algo);

        if(this.props.isArraySorted) {
            this.setState({            
                [this.componentRef.current]: {
                    array: this.getSortedArray(),
                    algorithm
                }
            });            
        } else {
            this.setState({            
                [this.componentRef.current]: {
                    array: [...this.props.array],
                    algorithm
                }
            });
        }
    }

    getSortedArray() {
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');
        const completedArray = [];

        for(let i = 0; i < arrayBars.length; i++) {
            completedArray.push(parseInt(arrayBars[i].style.height));
        }

        return completedArray;
    }

    testSortingAlgorithms() {
        const jsSortedArray = this.props.array.sort((a, b) => a - b);
        // const bubbleSorted = Algo.getBubbleSortAnimations(this.props.array.slice());
        // const selectionSorted = Algo.getSelectionSortAnimations(this.props.array.slice());
        // const mergeSorted = Algo.getMergeSortAnimations(this.props.array.slice());
        const heapSorted = Algo.getHeapSortAnimations(this.props.array.slice());

        console.log(jsSortedArray)
        // console.log(bubbleSorted.length)
        // console.log(selectionSorted.length)
        // console.log(mergeSorted.length)
        console.log(heapSorted)


        console.log(arraysAreEqual(jsSortedArray, heapSorted));
      }

    render() {
        return (
            <div 
                className="canvas"
                data-test="sorting-visualizer"
            >
                <div 
                    className="canvas-content" 
                    data-test="content"
                    ref={this.componentRef}
                >
                    <div 
                        className="array-container"
                        data-test="container"
                    >
                        {this.state[this.componentRef.current].array.map((value,i) => {
                            return (
                            <div
                                className="array-bar"
                                key={i}
                                style={{ 
                                    backgroundColor: DEFAULT_COLOR,
                                    height: `${value}px`
                                }}
                            ></div>);
                        })}
                        <div 
                            className="static-bar" 
                            data-test="static"
                            style={{ height: `330px` }}
                        ></div>
                    </div>
                    <div 
                        className="algo-bar"
                        data-test="algorithm-bar"
                    >
                        <button className="algo-buttons" id="selectionSort" onClick={() => this.handleClickAlgoButton(algorithmArray[0])}>SelectionSort</button>
                        <button className="algo-buttons" id="bubbleSort" onClick={() => this.handleClickAlgoButton(algorithmArray[1])}>BubbleSort</button>
                        <button className="algo-buttons" id="mergeSort" onClick={() => this.handleClickAlgoButton(algorithmArray[2])}>MergeSort</button>
                        <button className="algo-buttons" id="heapSort" onClick={() => this.handleClickAlgoButton(algorithmArray[3])}>HeapSort</button>
                        <button className="algo-buttons" >QuickSort</button>
                        <button className="algo-buttons" >... Sort</button>
                        <button className="algo-buttons" >... Sort</button>
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

SortingVisualizer.propTypes = {
    array: PropTypes.array,
    startSort: PropTypes.bool,
    randomAlgoClicks: PropTypes.number,
    isArraySorted: PropTypes.bool
};

export default SortingVisualizer;