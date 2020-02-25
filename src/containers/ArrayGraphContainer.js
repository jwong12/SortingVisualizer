import { connect } from 'react-redux';
import ArrayGraph from '../SortingVisualizerX/ArrayGraph';

const mapStateToProps = (state) => {
  return { array: state.unsortedArray }
};

export default connect(mapStateToProps)(ArrayGraph);