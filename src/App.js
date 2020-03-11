import React, { Component } from 'react';
import SortingVisualizerContainer from './containers/SortingVisualizerContainer';
import NavbarContainer from './containers/NavbarContainer';
import './App.css';

class App extends Component {
  render () {
    return (
      <div 
        className="App"
        style={{ backgroundColor: this.props.appBackgroundColor }}
      >
        <NavbarContainer />
        <div className="grid">
          <SortingVisualizerContainer />
          <SortingVisualizerContainer />
          <SortingVisualizerContainer />
          <SortingVisualizerContainer />
        </div>      
      </div>
    );
  }
}

export default App;
