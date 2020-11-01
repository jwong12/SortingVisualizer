import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.startBtnRef = React.createRef();
        console.log(this.state)

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.finishSorting !== this.props.finishSorting && this.props.finishSorting) {
            this.startBtnRef.current.style.backgroundColor = "#59ab80";
        }
    }

    startSorting = () => {
        if (!this.props.isArraySorted) {
            this.props.startSort();
        }
    }

    handleMouseOverStartBtn = (e) => {
        if (this.props.finishSorting && !this.props.isArraySorted) {
            e.target.style.backgroundColor = "#bd7e7e"
            e.target.style.cursor = "pointer";

        } else {
            e.target.style.cursor = "default";
        }
    }

    handleMouseLeaveStartBtn = (e) => {
        if (this.props.finishSorting) {
            e.target.style.backgroundColor = "#59ab80";
        }
    }

    handleMouseOverBtns = (e) => {
        if (this.props.finishSorting) {
            e.target.style.backgroundColor = "#bd7e7e";
            e.target.style.cursor = "pointer";

        } else {
            e.target.style.backgroundColor = "#59ab80";
            e.target.style.cursor = "default";
        }
    }

    handleMouseLeaveBtns = (e) => {
        e.target.style.backgroundColor = "#59ab80";
    }

    render() {
        return (
            <div 
                className="nav-bar"
                data-test="nav-component"
            >
                <h2
                    data-test="title"
                    style={{ color: this.props.titleColor }}
                >Sorting Visualizer</h2>
                <button 
                    onClick={() => {
                        if (this.props.finishSorting) {
                            this.props.changeTheme()
                        }
                    }}
                    onMouseOver={this.handleMouseOverBtns}
                    onMouseLeave={this.handleMouseLeaveBtns}
                >Theme</button>
                <button 
                    onClick={() => {
                        if (this.props.finishSorting) {
                            this.props.randomizeAlgo()
                        }
                    }}
                    onMouseOver={this.handleMouseOverBtns}
                    onMouseLeave={this.handleMouseLeaveBtns}
                >Randomize</button>
                <button 
                    onClick={() => {
                        if (this.props.finishSorting) {
                            this.props.shuffleArray()
                        }
                    }}
                    onMouseOver={this.handleMouseOverBtns}
                    onMouseLeave={this.handleMouseLeaveBtns}
                >Shuffle</button>
                <button 
                    ref={this.startBtnRef}
                    style={{ backgroundColor: this.props.startBtnBg }} 
                    onClick={(e) => {
                        e.target.style.cursor = "default";
                        this.startSorting();
                    }}
                    onMouseOver={this.handleMouseOverStartBtn}
                    onMouseLeave={this.handleMouseLeaveStartBtn}
                >Sort</button>
            </div>
        );
    };
}

Navbar.propTypes = {
    startSort: PropTypes.func,
    randomizeAlgo: PropTypes.func,
    shuffleArray: PropTypes.func,
    changeTheme: PropTypes.func,
    titleColor: PropTypes.string,
    finishSorting: PropTypes.bool,
    isArraySorted: PropTypes.bool,
};

export default Navbar;