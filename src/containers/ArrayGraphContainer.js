import { connect } from 'react-redux';
import ArrayGraph from '../SortingVisualizerX/ArrayGraph';

const mapStateToProps = (state) => {
  return { array: state.unsortedArray, startSort: state.startSort }
};

export default connect(mapStateToProps)(ArrayGraph);