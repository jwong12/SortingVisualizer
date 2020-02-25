const NUMBER_OF_ARRAY_BARS = 250;

const initialState = {
  unsortedArray: shuffleArray()
};

const sortingVisualizerReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'ARRAY_GRAPH_CREATE_ARRAY': 
        return Object.assign({}, state, {
          unsortedArray: shuffleArray()
        });
      
      default: 
        return state;
    }
  }

function shuffleArray() {
  const array = [];

  for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
    array.push(randomIntFromInterval(5, 390));
  }

  return array;
}


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
  
export default sortingVisualizerReducer;