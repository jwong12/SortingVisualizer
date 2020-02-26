import { connect } from 'react-redux';
import Navbar from '../SortingVisualizerX/Navbar';

const mapDispatchToProps = (dispatch) => {
  return {
    shuffleArray: () => {
      dispatch({
        type: 'ARRAY_GRAPH_SHUFFLE_ARRAY'
      });
    },
    startSort: () => {
      dispatch({
        type: 'ARRAY_GRAPH_START_SORT'
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
