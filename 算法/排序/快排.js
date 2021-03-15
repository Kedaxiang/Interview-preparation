let arr = [2, 3, 1, 4, 6, 5]

function quickSort(array) {
    if(array.length < 2) {
        return array
    }
    const target = array[0];
    let left = [];
    let right = [];
    for(let i = 1; i < array.length; i++) {
        if(array[i] < target) left.push(array[i])
        else right.push(array[i])
    }
    return quickSort(left).concat([target], quickSort(right))
}

console.log(quickSort(arr));