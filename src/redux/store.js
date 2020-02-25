import { createStore } from 'redux';
import sortingVisualizerReducer from './sortingVisualizerReducer';

export default createStore(
    sortingVisualizerReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
