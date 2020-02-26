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
    }
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
