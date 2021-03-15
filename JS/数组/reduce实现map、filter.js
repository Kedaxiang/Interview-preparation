let arr = [1, 2, 3, 4, 5]

// map
Array.prototype.reduceToMap = function(fn) {
    return this.reduce((result, curr, index) => {
        result.push(fn.call(this, curr, index))
        return result
    }, [])
}

console.log(arr.map(item => item * 2))
console.log(arr.reduceToMap(item => item * 2));

// filter
Array.prototype.reduceToFilter = function(fn) {
    return this.reduce((result, curr, index) => {
        // 这里加不加call，结果都一样
        fn.call(this, curr, index) ? result.push(curr) : null
        return result
    }, [])
}

console.log(arr.filter(item => item > 3))
console.log(arr.reduceToFilter(item => item > 3))