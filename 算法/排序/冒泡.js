let arr = [1, 2, 3, 4, 5, 6];

function record(array) {
    let length = array.length;
    let current = length - 1;
    let random;
    while (current > -1) {
        random = Math.floor(length * Math.random());
        [array[current], array[random]] = [array[random], array[current]]
        current--;
    }
    return array
}

arr = record(arr);
console.log(arr);


function bubbleSort(array) {
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array.length - 1 - i; j++) {
            if(array[j] > array[j + 1]) [array[j], array[j + 1]] = [array[j + 1], array[j]]
        }
    }
    return array
}


console.log(bubbleSort(arr));