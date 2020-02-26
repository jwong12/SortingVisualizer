import { connect } from 'react-redux';
import SortingVisualizer from '../SortingVisualizerX/SortingVisualizer';

const mapStateToProps = (state) => {
  return { 
    array: state.unsortedArray, 
    startSort: state.startSort,
    randomAlgo: state.randomAlgo
  }
};

export default connect(mapStateToProps)(SortingVisualizer);