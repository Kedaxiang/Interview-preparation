const sleep = (time, item) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(item)
        }, time)
    })
}

const start = async function() {
    for(let i = 0; i < 6; i++) {
        console.log('循环开始' + i);
        let result = await sleep(1000, i);
        console.log(result);
    }

    setTimeout(() => {
        console.log('inner setTimeout1');
    }, 0)
};

setTimeout(() => {
    console.log('outer setTimeout1');
}, 1000)

console.log('log start')

start()

setTimeout(() => {
    console.log('outer setTimeout2');
}, 1000)