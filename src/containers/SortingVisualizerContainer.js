import { connect } from 'react-redux';
import SortingVisualizer from '../SortingVisualizerX/SortingVisualizer';

const mapStateToProps = (state) => {
  return { 
    array: state.unsortedArray, 
    startSort: state.startSort,
    randomAlgoClicks: state.randomAlgoClicks,
    isArraySorted: state.isArraySorted
  }
};

export default connect(mapStateToProps)(SortingVisualizer);