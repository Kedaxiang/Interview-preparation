function disorder(array) {
    let length = array.length;
    let current = length - 1;
    let random;
    while(current > -1) {
        random = Math.floor(length * Math.random());
        [array[current], array[random]] = [array[random], array[current]];
        current--
    }
    return array
}
let arr = [1, 2, 3, 4, 5, 6, 7]
let result = disorder(arr)
console.log(result);