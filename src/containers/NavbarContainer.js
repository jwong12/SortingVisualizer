import { connect } from 'react-redux';
import Navbar from '../SortingVisualizerX/Navbar';

const mapDispatchToProps = (dispatch) => {
  return {
    shuffleArray: () => {
      dispatch({
        type: 'SORTING_VISUALIZER_SHUFFLE_ARRAY'
      });
    },
    randomizeAlgo: () => {
      dispatch({
        type: 'SORTING_VISUALIZER_RANDOMIZE_ALGO'
      });
    },
    startSort: () => {
      dispatch({
        type: 'SORTING_VISUALIZER_START_SORT'
      });
    },
    changeTheme: () => {
      dispatch({
        type: 'SORTING_VISUALIZER_CHANGE_THEME'
      });
    }
  };
};

const mapStateToProps = (state) => {
  return {
    titleColor: state.titleColor,
    startButtonBg: state.startButtonBg,
    buttonBgColor: state.buttonBgColor,
    finishSorting: state.finishSorting,
    isArraySorted: state.isArraySorted
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
