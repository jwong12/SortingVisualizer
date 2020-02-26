import React from 'react';
import SortingVisualizerContainer from './containers/SortingVisualizerContainer';
import NavbarContainer from './containers/NavbarContainer';
import './App.css';

function App() {
  return (
    <div className="App">
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

export default App;
