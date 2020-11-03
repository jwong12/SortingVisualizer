const NUMBER_OF_ARRAY_BARS = 120;

const initialState = {
  unsortedArray: shuffleArray(),
  startSort: false,
  isArraySorted: false,
  randomAlgoClicks: 0,
  isDarkTheme: false,
  primaryColor: 'darkkhaki',
  secondaryColor: 'tomato',
  sortedColor: '#6ad4f7',
  defaultColor: '#b0b0b0',
  backgroundColor: 'rgb(241, 241, 241)',
  appBackgroundColor: 'white',
  algoBtnBg: '#ffffff',
  algoBtnColor: '#494949',
  algoBtnBorder: '1px solid #b5b5b5',
  algoBtnSelectedBg: 'rgb(73, 151, 249)',
  algoBtnSelectedColor: 'rgb(247, 247, 247)',
  arraysSorted: 0,
  finishSortingArray: true,
  titleColor: 'rgb(101, 196, 226)',
  startButtonBg: '#59ab80',
  buttonBgColor: '#59ab80'
};

const sortingVisualizerReducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NAV_BAR_FINISH_SORTING':
        return Object.assign({}, state, {
          finishSortingArray: true,
          arraysSorted: 0,
          startButtonBg: '#9E9E9E',
          buttonBgColor: '#59ab80'
        });
      case 'SORTING_VISUALIZER_ARRAY_SORTED':
        return Object.assign({}, state, {
          arraysSorted: state.arraysSorted+1
        }); 
      case 'SORTING_VISUALIZER_SHUFFLE_ARRAY': 
        return Object.assign({}, state, {
          unsortedArray: shuffleArray(),
          startSort: false,
          isArraySorted: false,
          startButtonBg: '#59ab80'
        });
      case 'SORTING_VISUALIZER_RANDOMIZE_ALGO': 
        return Object.assign({}, state, {
          randomAlgoClicks: state.randomAlgoClicks+1,
          startSort: false
      });
      case 'SORTING_VISUALIZER_START_SORT':
        return Object.assign({}, state, {
          startSort: true,
          isArraySorted: true,
          finishSortingArray: false,
          startButtonBg: '#bd7e7e',
          buttonBgColor: '#9E9E9E'
        })   
      case 'SORTING_VISUALIZER_CHANGE_THEME':
        return Object.assign({}, state, {
          isDarkTheme: !state.isDarkTheme,
          primaryColor: !state.isDarkTheme ? '#ab9d78' : 'darkkhaki',
          secondaryColor: !state.isDarkTheme ? '#822c2c' : 'tomato',
          sortedColor: !state.isDarkTheme ? '#2f787d' : '#6ad4f7', 
          defaultColor: !state.isDarkTheme ? '#71868f' : '#b0b0b0',
          backgroundColor: !state.isDarkTheme ? 'rgb(45, 45, 45)' : 'rgb(241, 241, 241)',
          appBackgroundColor: !state.isDarkTheme ? '#3a3a3a' : 'white',
          algoBtnBg: !state.isDarkTheme ? '#8a8a8a' : '#ffffff',
          algoBtnColor: !state.isDarkTheme ? '#212121' : '#494949',
          algoBtnBorder: !state.isDarkTheme ? '1px solid #494949' : '1px solid #b5b5b5',
          algoBtnSelectedBg: !state.isDarkTheme ? 'rgb(5, 105, 154)' : 'rgb(73, 151, 249)',
          algoBtnSelectedColor: !state.isDarkTheme ? 'rgb(206, 206, 206)' : 'rgb(247, 247, 247)',
          titleColor: !state.isDarkTheme ? 'rgb(83, 147, 167)' : 'rgb(101, 196, 226)',
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