const NUMBER_OF_ARRAY_BARS = 120;

const initialState = {
  unsortedArray: shuffleArray(),
  startSort: false,
  randomAlgo: 0
};

const sortingVisualizerReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'SORTING_VISUALIZER_SHUFFLE_ARRAY': 
        return Object.assign({}, state, {
          unsortedArray: shuffleArray(),
          startSort: false
        });
      case 'SORTING_VISUALIZER_RANDOMIZE_ALGO': 
        return Object.assign({}, state, {
          randomAlgo: state.randomAlgo+1
      });
      case 'SORTING_VISUALIZER_START_SORT':
        return Object.assign({}, state, {
          startSort: true
        })      
      default: 
        return state;
    }
  }

function shuffleArray() {
  const array = [];

  for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    array.push(randomIntFromInterval(10, 330));
  }

  return array;
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
  
export default sortingVisualizerReducer;