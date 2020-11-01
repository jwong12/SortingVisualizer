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
    algoButtonBg: state.algoButtonBg,
    algoButtonColor: state.algoButtonColor,
    algoButtonSelectedBg: state.algoButtonSelectedBg,
    algoButtonSelectedColor: state.algoButtonSelectedColor,
    arraysSorted: state.arraysSorted
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingVisualizer);