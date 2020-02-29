export function getSelectionSortAnimations(array) {
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

export function getBubbleSortAnimations(array) {
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

export function getHeapSortAnimations(array) {
    const animations = []
    heapSort(array, animations);
    return animations;
}

function heapSort(arr, animations) {
    let i = Math.floor(arr.length / 2 - 1);
    let k = arr.length - 1;
    
    while (i >= 0) {
        heapify(arr, arr.length, i, animations);
        i--;
    }

    while(k >= 0) {
        [arr[0], arr[k]] = [arr[k], arr[0]];
        animations.push([k, arr[k], 0, arr[0], 0]);
        heapify(arr, k, 0, animations);
        k--;
    }

    return arr;
}

function heapify(arr, length, i, animations) {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if(left < length && arr[left] > arr[largest]) {
        largest = left;
        animations.push([largest, left]);
    }

    if(right < length && arr[right] > arr[largest]) {
        largest = right;
        animations.push([largest, right]);
    }

    if(largest !== i) {
        animations.push([largest, arr[i], i, arr[largest]]);

        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, length, largest, animations);
    }

    return arr;
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = [...array];
    mergeSort(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
  
function mergeSort(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSort(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSort(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
  
function merge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    if((mainArray.length - 1) === endIdx && 0 === startIdx) {
        while (i <= middleIdx && j <= endIdx) {            
            animations.push([i, j, 0]);
            animations.push([i, j, 0]);
    
            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                animations.push([k, auxiliaryArray[i], 0]);
                mainArray[k++] = auxiliaryArray[i++];
    
            } else {
                animations.push([k, auxiliaryArray[j], 0]);
                mainArray[k++] = auxiliaryArray[j++];
            }
        }
    
        while (i <= middleIdx) {
            animations.push([i, i, 0]);
            animations.push([i, i, 0]);
            animations.push([k, auxiliaryArray[i], 0]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        
        while (j <= endIdx) {
            animations.push([j, j, 0]);
            animations.push([j, j, 0]);
            animations.push([k, auxiliaryArray[j], 0]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    } else {
        while (i <= middleIdx && j <= endIdx) {
            animations.push([i, j]);
            animations.push([i, j]);
    
            if (auxiliaryArray[i] <= auxiliaryArray[j]) {
                animations.push([k, auxiliaryArray[i]]);
                mainArray[k++] = auxiliaryArray[i++];
    
            } else {
                animations.push([k, auxiliaryArray[j]]);
                mainArray[k++] = auxiliaryArray[j++];
            }
        }
    
        while (i <= middleIdx) {
            animations.push([i, i]);
            animations.push([i, i]);
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        
        while (j <= endIdx) {
            animations.push([j, j]);
            animations.push([j, j]);
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }    
    
}
  