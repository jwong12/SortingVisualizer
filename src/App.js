import React from 'react';
import SortingVisualizerContainer from './containers/SortingVisualizerContainer';
import NavbarContainer from './containers/NavbarContainer';
import './App.css';

function App(props) {
  return (
    <div 
      className="App"
      data-test="app-component"
      style={{ backgroundColor: props.appBackgroundColor }}
    >
      <NavbarContainer />
      <div 
        className="grid"
        data-test="grid-div"
      >
        <SortingVisualizerContainer />
        <SortingVisualizerContainer />
        <SortingVisualizerContainer />
        <SortingVisualizerContainer />
      </div>      
    </div>
  );
}

export default App;
