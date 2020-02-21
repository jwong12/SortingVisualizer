import React from 'react';
import SortingVisualizer from './SortingVisualizerX/SortingVisualizer';
import Navbar from './SortingVisualizerX/Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
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
