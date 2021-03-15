/**
 * 1. promise构造函数是同步进行的，promise.then中的函数为异步执行
 * 结果: 1, 2, 4, 3
 */


// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     resolve();
//     console.log(2);
// })
// promise.then(() => {
//     console.log(3)
// })

// console.log(4)


/**
 * 2. js事件循环
 * 我的结果: 3, 7, 2, 4, 1, 2, 5
 * 正确结果: 3, 7, 4, 1, 2, 5
 * 
 * 第一轮事件循环，先执行宏任务: new Promise立即执行，输出3，再立即执行p的new Promise，输出7
 * 发现setTimeout，将回调函数放入下一轮任务队列(Event Quene), p的then，放入微任务队列，之后执行的是first的then，也放入微任务队列
 * 执行console.log(4)，输出4，宏任务执行完毕
 * 再执行微任务，执行p的then，输出4，执行first的then，输出2
 * 第一轮事件循环结束，开始执行第二轮。第二轮也是先执行宏任务，执行setTimeout的回调，输出5
 * resolve(6)不会生效，因为p的promise状态改变后不再发生变化
 */

// const first = () => (new Promise((resolve, reject) => {
//     console.log(3); // 1
//     let p = new Promise((resolve, reject) => {
//         console.log(7); // 2
//         setTimeout(() => {
//             console.log(5); // 6
//             resolve(6);
//         }, 0)
//         resolve(1);
//     });
//     resolve(2); 
//     p.then((arg) => {
//         console.log(arg); // 4 
//     });

// }));

// first().then((arg) => {
//     console.log(arg); // 5
// });
// console.log(4); // 3



/**
 * 3. 
 * 我的结果： promise1 Promise {<pending>}， promise2 Promise {<pending>}， promise1 Promise {<resolved>: "success"}， promise2 Promise {<rejected>: Error: error!!!
 * 正确结果：
 *      promise1 Promise {<pending>}
        promise2 Promise {<pending>}
        Uncaught (in promise) Error: error!!!
            at <anonymous>
        promise1 Promise {<resolved>: "success"}
        promise2 Promise {<rejected>: Error: error!!!
            at <anonymous>}
 * 
 */

// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success')
//     }, 1000)
// })
// const promise2 = promise1.then(() => {
//     throw new Error('error!!!')
// })

// console.log('promise1', promise1) // 1 pending
// console.log('promise2', promise2) // 2 pending 

// setTimeout(() => {
//     console.log('promise1', promise1) // 3 resolved
//     console.log('promise2', promise2) // 4 reject
// }, 2000)




/**
 * 4. 构造函数中的resolve和reject只有第一次执行有效，promise状态改变之后不能再变
 * 我的结果: then: success1
 * 正确结果: then: success1
 */

// const promise = new Promise((resolve, reject) => {
//     resolve('success1')
//     reject('error')
//     resolve('success2')
// })

// promise
//     .then((res) => {
//         console.log('then: ', res)
//     })
//     .catch((err) => {
//         console.log('catch: ', err)
//     })



/**
 * 5. promise每次调用.then和.catch返回一个新的promise
 * 我的结果： 1， 2
 * 正确结果： 1， 2
 */

// Promise.resolve(1)
//     .then((res) => {
//         console.log(res)
//         return 2
//     })
//     .catch((err) => {
//         return 3
//     })
//     .then((res) => {
//         console.log(res)
//     })


/**
 * 6. promise 的 .then 或者 .catch 可以被调用多次，但这里 Promise 构造函数只执行一次。或者说 promise 内部状态一经改变，并且有了一个值，那么后续每次调用 .then 或者 .catch 都会直接拿到该值。
 * 也就是说之后每一次调用promise返回的都是同一个值
 * 
 * 我的结果：once, 不知道
 * 正确结果：once, success 1005, success 1007
 */

// const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('once')
//         resolve('success')
//     }, 1000)
// })

// const start = Date.now()
// promise.then((res) => {
//     console.log(res, Date.now() - start)
// })
// promise.then((res) => {
//     console.log(res, Date.now() - start)
// })




/**
 * 7. .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种：
 * return Promise.reject(new Error('error!!!'))
 * throw new Error('error!!!')
 * 因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。
 *
 * 我的结果: error,  catch: error!!!
 * 正确结果: then: Error: error!!!
 */

// Promise.resolve()
//     .then(() => {
//         return new Error('error!!!')
//     })
//     .then((res) => {
//         console.log('then: ', res)
//     })
//     .catch((err) => {
//         console.log('catch: ', err)
//     })


/**
 * 8. .then或者.catch的返回值不能是其promise本身，否则会进入死循环
 * 正确结果：TypeError: Chaining cycle detected for promise #<Promise>
 */

// const promise = Promise.resolve()
//   .then(() => {
//     return promise
//   })
// promise.catch(console.error)


/**
 * 9. 
 * 
 */
