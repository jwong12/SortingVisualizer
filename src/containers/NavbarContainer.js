import { connect } from 'react-redux';
import Navbar from '../SortingVisualizerX/Navbar';

const mapDispatchToProps = (dispatch) => {
  return {
    shuffleArray: () => {
      dispatch({
        type: 'ARRAY_GRAPH_CREATE_ARRAY',
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(Navbar);
