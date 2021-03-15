let array = [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5,]


//Object
const unique = (array)=> {
    //1. Object，开辟一个外部存储空间用于标识元素是否出现
    // var container = {};
    // return array.filter((item) =>  container.hasOwnProperty(item) ? false : (container[item] = true));

    //2. indexOf + filter
    // return array.filter((item, index) => array.indexOf(item) === index)

    //3. Set
    return [...new Set(array)]
}

let arr = unique(array)
console.log(arr);