let arr = [
    1, 2, 3, 4, 5,
    [1, 2, 3, 4, 5],
    [
        1, 2, 3, 4, 5,
        [1, 2, 3, 4, 5]
    ],
    1, 2, 3, 4, 5
]

const flat = (array, deep = 1) => {
    // 1. 递归
    // let result = [];
    // array.forEach(item => {
    //     if(Array.isArray(item)) result = result.concat(flat(item));
    //     else result.push(item)
    // })
    // return result

    // 2. reduce
    // return array.reduce((prev, curr) => Array.isArray(curr) ? prev.concat(flat(curr)) : prev.concat(curr), [])

    // 3. 根据指定深度扁平数组
    return array.reduce((result, curr) => Array.isArray(curr) && deep > 1 ? result.concat(flat(curr, deep - 1)) : result.concat(curr), [])
}

// let arr2 = [1, 2, 3, 4, 5]
// console.log(arr2.reduce((prev, curr) => {
//     console.log(prev, curr);
//     return curr + prev
// }, 10))

let newArr = flat(arr)
console.log(newArr);