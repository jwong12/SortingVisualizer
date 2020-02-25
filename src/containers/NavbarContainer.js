import { connect } from 'react-redux';
import Navbar from '../SortingVisualizerX/Navbar';

const mapDispatchToProps = (dispatch) => {
  return {
    shuffleArray: () => {
      dispatch({
        type: 'ARRAY_GRAPH_CREATE_ARRAY'
      });
    },
    startSorting: () => {
      dispatch({
        type: 'ARRAY_GRAPH_START_SORTING'
      })
    }
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
