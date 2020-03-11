import { connect } from 'react-redux';
import App from '../App';

const mapStateToProps = (state) => {
  return { 
    appBackgroundColor: state.appBackgroundColor
  }
};

export default connect(mapStateToProps)(App);