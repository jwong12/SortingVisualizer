import { connect } from 'react-redux';
import SortingVisualizer from '../SortingVisualizerX/SortingVisualizer';

const mapDispatchToProps = (dispatch) => {
  return {
    finishSorting: () => {
      dispatch({
        type: 'NAV_BAR_FINISH_SORTING'
      });
    },
    incrementArraySortedCount: () => {
      dispatch({
        type: 'SORTING_VISUALIZER_ARRAY_SORTED'
      });
    }
  };
};

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
    algoBtnBg: state.algoBtnBg,
    algoBtnColor: state.algoBtnColor,
    algoBtnBorder: state.algoBtnBorder,
    algoBtnSelectedBg: state.algoBtnSelectedBg,
    algoBtnSelectedColor: state.algoBtnSelectedColor,
    arraysSorted: state.arraysSorted,
    finishSortingArray: state.finishSortingArray
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingVisualizer);