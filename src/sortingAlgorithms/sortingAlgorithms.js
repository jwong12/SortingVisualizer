export const selectionSort = array => {
    const animations = [];

    for(let i = 0; i < array.length - 1; i++) {
        let min = i;
        for(let j = i+1; j < array.length; j++) {
            animations.push([j,min]);
            if(array[j] < array[min]) {
                min = j;
            }
        }
        const temp = array[i];
        array[i] = array[min];
        array[min] = temp;
        animations.push([i, array[i], min, array[min]]);
    }

    return animations;
};

export const bubbleSort = array => {
    const animations = [];

    for(let i = 0; i < array.length - 1; i++) {
        const sortedNumbers = array.length - 1 - i;

        for(let j = 0; j < sortedNumbers; j++) {
            animations.push([j,j+1]);

            if(array[j+1] < array[j]) {
                const temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                animations.push([j+1, array[j+1], j, array[j]]);

            } else {
                animations.push([j, array[j], j+1, array[j+1]]);
            }
            animations.push([j,j+1]);
        }
    }
    
    return animations;
};