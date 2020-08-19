import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Algo from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

const algorithmArray = ['selectionSort', 'bubbleSort', 'mergeSort', 'heapSort', 'quickSort', 'countingSort'];
const ANIMATION_SPEED_MS = 2;

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
            const node = this.componentRef.current;
            const arrayBars = node.getElementsByClassName('array-bar');

            for(let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = this.props.defaultColor;
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
                case algorithmArray[4]:
                    this.quickSort();
                    break;
                default:
                    console.error('no algorithm selected')
            }
        }

        if(prevProps.isDarkTheme !== this.props.isDarkTheme) {
            this.highlightAlgoButton(this.state[this.componentRef.current].algorithm);
        }
    }

    selectionSort = () => {
        const animations = Algo.getSelectionSortAnimations(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');
        
        for(let i = 0; i < animations.length; i++) {
            if(animations[i].length === 4) {
                setTimeout(() => {
                    const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;  

                    setTimeout(() => {                            
                        if (barOneIdx < barTwoIdx) {
                            barOneStyle.backgroundColor = this.props.sortedColor;
                        } else {
                            barTwoStyle.backgroundColor = this.props.sortedColor;
                        }
                    }, ANIMATION_SPEED_MS); 

                    if(i === animations.length -1) {
                        setTimeout(() => {
                            const barStyle = arrayBars[this.props.array.length-1].style;
                            barStyle.backgroundColor = this.props.sortedColor;
                        }, ANIMATION_SPEED_MS);  
                    }     
                }, i * ANIMATION_SPEED_MS);

            } else {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = this.props.secondaryColor;
                    barTwoStyle.backgroundColor = this.props.secondaryColor;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = this.props.primaryColor;
                        barTwoStyle.backgroundColor = this.props.primaryColor;                    
                    }, ANIMATION_SPEED_MS);
                }, i * ANIMATION_SPEED_MS);                
            }
        }
    }

    bubbleSort = () => {
        const animations = Algo.getBubbleSortAnimations(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');
        let isColorChange, n = 119, barsIndex = 119; 

        for (let i = 0; i < animations.length; i++) {
            isColorChange = i % 3 !== 1;

            if (isColorChange) { 
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 !== 2 ? this.props.secondaryColor : this.props.primaryColor; 
                
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS / 3);

            } else {                
                setTimeout(() => {
                    const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;  

                    if(barTwoIdx === n || barOneIdx === n) {
                        setTimeout(() => {                            
                            const barStyle = arrayBars[barsIndex--].style;
                            barStyle.backgroundColor = this.props.sortedColor;
                        }, ANIMATION_SPEED_MS);     

                        if(--n === 0) {
                            setTimeout(() => {
                                const barStyle = arrayBars[0].style;
                                barStyle.backgroundColor = this.props.sortedColor;
                            }, ANIMATION_SPEED_MS);   
                        }
                    }                
                }, i * ANIMATION_SPEED_MS/3);                
            }
        }
    }

    mergeSort() {
        const animations = Algo.getMergeSortAnimations(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2; 

            if (isColorChange) { 
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? this.props.secondaryColor : this.props.primaryColor;              

                if(animations[i].length !== 3) {
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * ANIMATION_SPEED_MS * 3);

                } else {
                    const [barOneIdx] = animations[i]; 
                    const barOneStyle = arrayBars[barOneIdx].style;

                    setTimeout(() => {                    
                        barOneStyle.backgroundColor = this.props.sortedColor;
                    }, i * ANIMATION_SPEED_MS * 3);    
                }

            } else {
                const [barOneIdx, newHeight] = animations[i]; 
                const barOneStyle = arrayBars[barOneIdx].style;
                
                setTimeout(() => {                    
                    barOneStyle.height = `${newHeight}px`;

                    if(animations[i].length === 3) {
                        setTimeout(() => {                    
                            barOneStyle.backgroundColor = this.props.secondaryColor;

                            setTimeout(() => {                    
                                barOneStyle.backgroundColor = this.props.sortedColor;
                            }, 1); 
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
                    barOneStyle.backgroundColor = this.props.secondaryColor;
                    barTwoStyle.backgroundColor = this.props.secondaryColor;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = this.props.primaryColor;
                        barTwoStyle.backgroundColor = this.props.primaryColor;
                    }, 10);
                }, i * ANIMATION_SPEED_MS * 4.7);
                
            } else if(animations[i].length === 4) {
                const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i]; 
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;                 

                setTimeout(() => {         
                    barOneStyle.backgroundColor = this.props.secondaryColor;                  
                    barTwoStyle.backgroundColor = this.props.secondaryColor;

                    setTimeout(() => {   
                        barOneStyle.height = `${barOneHeight}px`;
                        barTwoStyle.height = `${barTwoHeight}px`;                      
                        barOneStyle.backgroundColor = this.props.primaryColor;                  
                        barTwoStyle.backgroundColor = this.props.primaryColor;
                    }, 10)
                }, i * ANIMATION_SPEED_MS * 4.7); 

            } else {
                const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i]; 
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;                 

                setTimeout(() => {         
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                    barOneStyle.backgroundColor = this.props.sortedColor;     
                    barTwoStyle.backgroundColor = this.props.secondaryColor;  

                    setTimeout(() => {
                        barTwoStyle.backgroundColor = this.props.primaryColor;  
                    }, 10) 

                    if(i === animations.length - 1) {
                        setTimeout(() => {
                            arrayBars[0].style.backgroundColor = this.props.sortedColor;   
                        }, 10) 
                    }   
                }, i * ANIMATION_SPEED_MS * 4.75); 
            }            
        }
    }

    quickSort() {
        const animations = Algo.getQuickSortAnimations(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            if(animations[i].length === 2) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = this.props.secondaryColor;
                    barTwoStyle.backgroundColor = this.props.secondaryColor;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = this.props.primaryColor;
                        barTwoStyle.backgroundColor = this.props.primaryColor;
                    }, 10);
                }, i * ANIMATION_SPEED_MS * 8.2);

            } else if(animations[i].length === 4) {
                const [barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animations[i]; 
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;                 

                setTimeout(() => {         
                    barOneStyle.height = `${barOneHeight}px`;
                    barTwoStyle.height = `${barTwoHeight}px`;
                    barOneStyle.backgroundColor = this.props.secondaryColor;     
                    barTwoStyle.backgroundColor = this.props.secondaryColor;  

                    setTimeout(() => {
                        barOneStyle.backgroundColor = this.props.primaryColor;     
                        barTwoStyle.backgroundColor = this.props.primaryColor;  
                    }, 10) 

                    if(i === animations.length - 1) {
                        for(let i = 0; i < arrayBars.length; i++) {
                            const barStyle = arrayBars[i].style;
            
                            setTimeout(() => {
                                barStyle.backgroundColor = this.props.secondaryColor;    

                                setTimeout(() => {
                                    barStyle.backgroundColor = this.props.sortedColor;     
                                }, i * 0.05)  
                            }, i * 8.5) 
                        }
                    }   
                }, i * ANIMATION_SPEED_MS * 8.2); 
            }          
        }
    }

    highlightAlgoButton(algorithm) {
        const node = this.componentRef.current;
        const buttons = node.getElementsByClassName('algo-buttons');

        for(let i = 0; i < buttons.length; i++) {
            if(algorithm === buttons[i].id){
                buttons[i].style.color = this.props.algoButtonSelectedColor;
                buttons[i].style.backgroundColor = this.props.algoButtonSelectedBg;
            } else {
                buttons[i].style.color = this.props.algoButtonColor;
                buttons[i].style.backgroundColor = this.props.algoButtonBg;
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
        const quickSorted = Algo.getQuickSortAnimations(this.props.array.slice());
        console.log(jsSortedArray)
        console.log(quickSorted)
        console.log(arraysAreEqual(jsSortedArray, quickSorted));
      }

    render() {
        return (
            <div 
                className="canvas"
                style={{ backgroundColor: this.props.backgroundColor }}
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
                                    backgroundColor: this.props.defaultColor,
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
                        <button className="algo-buttons" id="quickSort" onClick={() => this.handleClickAlgoButton(algorithmArray[4])}>QuickSort</button>
                        <button className="algo-buttons" id="countingSort" onClick={() => this.handleClickAlgoButton(algorithmArray[5])}>CountingSort</button>
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
    isArraySorted: PropTypes.bool,
    isDarkTheme: PropTypes.bool,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    sortedColor: PropTypes.string,
    defaultColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    algoButtonBg: PropTypes.string,
    algoButtonColor: PropTypes.string,
    algoButtonSelectedBg: PropTypes.string,
    algoButtonSelectedColor: PropTypes.string
};

export default SortingVisualizer;