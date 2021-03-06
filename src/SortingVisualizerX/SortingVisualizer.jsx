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
        this.selectionBtnRef = React.createRef();
        this.bubbleBtnRef = React.createRef();
        this.mergeBtnRef = React.createRef();
        this.heapBtnRef = React.createRef();
        this.quickBtnRef = React.createRef();
        this.countingBtnRef = React.createRef();
        this.componentRef.current = randomIntFromInterval(0, 1000000);

        this.state = {
            [this.componentRef.current]: {
                array: [],
                algorithm: ''
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
        if (prevProps.array !== this.props.array) {
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

        if (prevProps.randomAlgoClicks !== this.props.randomAlgoClicks) {
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

        if (prevProps.startSort !== this.props.startSort && this.props.startSort) {
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
                case algorithmArray[5]:
                    this.countingSort();
                    break;
                default:
                    console.error('no algorithm selected')
            }
        }

        if (prevProps.isDarkTheme !== this.props.isDarkTheme) {
            this.highlightAlgoButton(this.state[this.componentRef.current].algorithm);
        }

        if (prevProps.finishSortingArray !== this.props.finishSortingArray && !this.props.finishSortingArray) {
            setTimeout(() => this.modifyButtonsWhileAnimationIsRunning(), 0);

        } else if (prevProps.finishSortingArray !== this.props.finishSortingArray && this.props.finishSortingArray) {
            setTimeout(() => this.modifyButtonsWhileAnimationIsSorted(), 0);
        }

        if (prevProps.arraysSorted !== this.props.arraysSorted && this.props.arraysSorted === 4) {
            this.props.finishSorting();
        }        
    }

    modifyButtonsWhileAnimationIsRunning() {
        const buttons = this.componentRef.current.getElementsByClassName('algo-buttons');

        for(let i = 0; i < buttons.length; i++) {
            if(this.state[this.componentRef.current].algorithm === buttons[i].id){
                setTimeout(() => buttons[i].style.animation = 'box-shadow-fade-in 450ms forwards', 150);

            } else {
                setTimeout(() => buttons[i].style.animation = 'blur-fade-in 300ms forwards', 0);
                buttons[i].style.cursor = 'default';
            }
        } 
    }

    modifyButtonsWhileAnimationIsSorted() {
        const buttons = this.componentRef.current.getElementsByClassName('algo-buttons');

        for(let i = 0; i < buttons.length; i++) {
            if(this.state[this.componentRef.current].algorithm === buttons[i].id){
                setTimeout(() => buttons[i].style.animation = 'box-shadow-fade-out 450ms forwards', 0);

            } else {
                setTimeout(() => buttons[i].style.animation = 'blur-fade-out 300ms forwards', 300);
                buttons[i].style.cursor = 'pointer'
            }
        }
    }

    selectionSort = () => {
        const animations = Algo.getSelectionSortAnimations(this.state[this.componentRef.current].array);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');
        
        for (let i = 0; i < animations.length; i++) {
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
                            setTimeout(() => this.props.incrementArraySortedCount(), 500);
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
                                setTimeout(() => this.props.incrementArraySortedCount(), 1000);
                            }, ANIMATION_SPEED_MS);   
                        }
                    }                
                }, i * ANIMATION_SPEED_MS / 3);                
            }
        }
    }

    mergeSort = () => {
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

        setTimeout(() => this.props.incrementArraySortedCount(), 14500);
    }

    heapSort = () => {
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
                            setTimeout(() => this.props.incrementArraySortedCount(), 500);
                        }, 10);
                    }   
                }, i * ANIMATION_SPEED_MS * 4.75); 
            }            
        }
    }

    quickSort = () => {
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

                        setTimeout(() => this.props.incrementArraySortedCount(), 1000);
                    }   
                }, i * ANIMATION_SPEED_MS * 8.2); 
            }          
        }
    }

    countingSort = () => {
        const currentArray = this.state[this.componentRef.current].array;
        const animations = Algo.getCountingSortAnimations(currentArray);
        const node = this.componentRef.current;
        const arrayBars = node.getElementsByClassName('array-bar');

        for(let i = 0; i < currentArray.length; i++) {
            const barStyle = arrayBars[i].style;

            setTimeout(() => {
                barStyle.backgroundColor = this.props.secondaryColor;

                setTimeout(() => {
                    barStyle.backgroundColor = this.props.primaryColor;
                
                }, (i + 15) * ANIMATION_SPEED_MS / 4);
            }, (i + 15) * ANIMATION_SPEED_MS * 25);
        }

        setTimeout(() => {
            for(let i = 0; i < animations.length; i++) {
                const barOneIdx = animations[i][0];
                const barTwoIdx = animations[i][1];
                const barOneStyle = arrayBars[barOneIdx].style;

                setTimeout(() => {
                    barOneStyle.backgroundColor = this.props.secondaryColor;
                    barOneStyle.height = `${currentArray[barTwoIdx]}px`;
                    
                    setTimeout(() => {
                        barOneStyle.backgroundColor = this.props.sortedColor;

                    }, (i + 15) * ANIMATION_SPEED_MS / 3);
                }, (i + 15) * ANIMATION_SPEED_MS * 30); 
            }
        }, 6700);

        setTimeout(() => this.props.incrementArraySortedCount(), 14500);
    }

    highlightAlgoButton(algorithm) {
        const buttons = this.componentRef.current.getElementsByClassName('algo-buttons');

        for(let i = 0; i < buttons.length; i++) {
            buttons[i].style.border = this.props.algoBtnBorder;

            if(algorithm === buttons[i].id){
                buttons[i].style.color = this.props.algoBtnSelectedColor;
                buttons[i].style.backgroundColor = this.props.algoBtnSelectedBg;

            } else {
                buttons[i].style.color = this.props.algoBtnColor;
                buttons[i].style.backgroundColor = this.props.algoBtnBg;
            }
        }        

        return algorithm;
    }

    handleClickAlgoButton = (algo) => {
        if (this.props.finishSortingArray) {
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
    }

    handleMouseOverAlgoButton = (buttonRef) => {
        if (this.props.finishSortingArray && this.state[this.componentRef.current].algorithm !== buttonRef.current.id) {
            buttonRef.current.style.color = this.props.algoBtnSelectedColor;
            buttonRef.current.style.backgroundColor = this.props.algoBtnSelectedBg;
        }
    }

    handleMouseLeaveAlgoButton = (buttonRef) => {
        if (this.props.finishSortingArray && this.state[this.componentRef.current].algorithm !== buttonRef.current.id) {
            buttonRef.current.style.color = this.props.algoBtnColor;
            buttonRef.current.style.backgroundColor = this.props.algoBtnBg;
        } 
    }

    getSortedArray() {
        const arrayBars = this.componentRef.current.getElementsByClassName('array-bar');
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
                                ></div>
                            );
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
                        <button 
                            ref={this.selectionBtnRef}
                            className="algo-buttons" 
                            id="selectionSort" 
                            onClick={() => this.handleClickAlgoButton(algorithmArray[0])}
                            onMouseOver={() => this.handleMouseOverAlgoButton(this.selectionBtnRef)}
                            onMouseLeave={() => this.handleMouseLeaveAlgoButton(this.selectionBtnRef)}
                        >SelectionSort</button>
                        <button 
                            ref={this.bubbleBtnRef}
                            className="algo-buttons" 
                            id="bubbleSort" 
                            onClick={() => this.handleClickAlgoButton(algorithmArray[1])}
                            onMouseOver={() => this.handleMouseOverAlgoButton(this.bubbleBtnRef)}
                            onMouseLeave={() => this.handleMouseLeaveAlgoButton(this.bubbleBtnRef)}
                        >BubbleSort</button>
                        <button 
                            ref={this.mergeBtnRef}
                            className="algo-buttons" 
                            id="mergeSort" 
                            onClick={() => this.handleClickAlgoButton(algorithmArray[2])}
                            onMouseOver={() => this.handleMouseOverAlgoButton(this.mergeBtnRef)}
                            onMouseLeave={() => this.handleMouseLeaveAlgoButton(this.mergeBtnRef)}
                        >MergeSort</button>
                        <button 
                            ref={this.heapBtnRef}
                            className="algo-buttons" 
                            id="heapSort" 
                            onClick={() => this.handleClickAlgoButton(algorithmArray[3])}
                            onMouseOver={() => this.handleMouseOverAlgoButton(this.heapBtnRef)}
                            onMouseLeave={() => this.handleMouseLeaveAlgoButton(this.heapBtnRef)}
                        >HeapSort</button>
                        <button 
                            ref={this.quickBtnRef}
                            className="algo-buttons" 
                            id="quickSort" 
                            onClick={() => this.handleClickAlgoButton(algorithmArray[4])}
                            onMouseOver={() => this.handleMouseOverAlgoButton(this.quickBtnRef)}
                            onMouseLeave={() => this.handleMouseLeaveAlgoButton(this.quickBtnRef)}
                        >QuickSort</button>
                        <button 
                            ref={this.countingBtnRef}
                            className="algo-buttons" 
                            id="countingSort" 
                            onClick={() => this.handleClickAlgoButton(algorithmArray[5])}
                            onMouseOver={() => this.handleMouseOverAlgoButton(this.countingBtnRef)}
                            onMouseLeave={() => this.handleMouseLeaveAlgoButton(this.countingBtnRef)}
                        >CountingSort</button>
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
    finishSorting: PropTypes.func,
    incrementArraySortedCount: PropTypes.func,
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
    algoBtnBg: PropTypes.string,
    algoBtnColor: PropTypes.string,
    algoBtnBorder: PropTypes.string,
    algoBtnSelectedBg: PropTypes.string,
    algoBtnSelectedColor: PropTypes.string,
    arraysSorted: PropTypes.number,
    finishSortingArray: PropTypes.bool
};

export default SortingVisualizer;