import { connect } from 'react-redux';
import SortingVisualizer from '../SortingVisualizerX/SortingVisualizer';

const mapStateToProps = (state) => {
  return { 
    array: state.unsortedArray, 
    startSort: state.startSort,
    randomAlgoClicks: state.randomAlgoClicks,
    isArraySorted: state.isArraySorted,
    isDarkTheme: state.isDarkTheme,
    primaryColor: state.primaryColor,
    secondaryColor: state.secondaryColor,
    sortedColor: state.sortedColor,
    defaultColor: state.defaultColor,
    backgroundColor: state.backgroundColor,
    algoButtonBg: state.algoButtonBg,
    algoButtonColor: state.algoButtonColor,
    algoButtonSelectedBg: state.algoButtonSelectedBg,
    algoButtonSelectedColor: state.algoButtonSelectedColor
  }
};

export default connect(mapStateToProps)(SortingVisualizer);