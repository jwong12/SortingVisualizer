import React from 'react';
import SortingVisualizer from './SortingVisualizerX/SortingVisualizer';
import NavbarContainer from './containers/NavbarContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavbarContainer />
      <div className="grid">
        <SortingVisualizer />
        <SortingVisualizer />
        <SortingVisualizer />
        <SortingVisualizer />
      </div>      
    </div>
  );
}

export default App;
