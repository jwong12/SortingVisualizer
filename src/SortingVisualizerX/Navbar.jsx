import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

class Navbar extends React.Component {
    startSorting = () => {
        if (!this.props.isArraySorted) {
            this.props.startSort();
        }
    }

    handleMouseOverStartBtn = (e) => {
        if (this.props.finishSortingArray && !this.props.isArraySorted) {
            e.target.style.backgroundColor = "#bd7e7e"
            e.target.style.cursor = "pointer";

        } else {
            e.target.style.cursor = "default";
        }
    }

    handleMouseLeaveStartBtn = (e) => {
        if (this.props.finishSortingArray && !this.props.isArraySorted) {
            e.target.style.backgroundColor = "#59ab80";
        }
    }

    handleMouseOverBtns = (e) => {
        if (this.props.finishSortingArray) {
            e.target.style.backgroundColor = "#bd7e7e";
            e.target.style.cursor = "pointer";

        } else {
            e.target.style.cursor = "default";
        }
    }

    handleMouseLeaveBtns = (e) => {
        if (this.props.finishSortingArray) {
            e.target.style.backgroundColor = "#59ab80";
        }
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
                    style={{ backgroundColor: this.props.buttonBgColor }}
                    onClick={() => {
                        if (this.props.finishSortingArray) {
                            this.props.changeTheme()
                        }
                    }}
                    onMouseOver={this.handleMouseOverBtns}
                    onMouseLeave={this.handleMouseLeaveBtns}
                >Theme</button>
                <button 
                    style={{ backgroundColor: this.props.buttonBgColor }}
                    onClick={() => {
                        if (this.props.finishSortingArray) {
                            this.props.randomizeAlgo()
                        }
                    }}
                    onMouseOver={this.handleMouseOverBtns}
                    onMouseLeave={this.handleMouseLeaveBtns}
                >Randomize</button>
                <button 
                    style={{ backgroundColor: this.props.buttonBgColor }}
                    onClick={() => {
                        if (this.props.finishSortingArray) {
                            this.props.shuffleArray()
                        }
                    }}
                    onMouseOver={this.handleMouseOverBtns}
                    onMouseLeave={this.handleMouseLeaveBtns}
                >Shuffle</button>
                <button 
                    style={{ backgroundColor: this.props.startButtonBg }} 
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
    startButtonBg: PropTypes.string,
    buttonBgColor: PropTypes.string,
    finishSortingArray: PropTypes.bool,
    isArraySorted: PropTypes.bool,
};

export default Navbar;