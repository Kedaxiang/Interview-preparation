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
 * 9. .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。
 * 正确答案： 1
 */

// Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

/**
 * 10. .then 的第二个处理错误的函数捕获不了第一个处理成功的函数抛出的错误，而后续的 .catch 可以捕获之前的错误。需要链式调用.catch才能捕获错误，否则会直接抛出错误
 * 我的答案： Error: error, fail2: Error: error
 * 正确答案： fail2: Error: error
 */

// Promise.resolve()
//   .then(
//     function success(res) {
//       throw new Error("error");
//     },
//     function fail1(e) {
//       console.error("fail1: ", e);
//     }
//   )
//   .catch(function fail2(e) {
//     console.error("fail2: ", e);
//   });

/**
 * 11.process.nextTick 和 promise.then 都属于微任务，而 setImmediate 属于宏任务。
 * 在事件循环的 check 阶段执行。事件循环的每个阶段（macrotask）之间都会执行 microtask，事件循环的开始会先执行一次 microtask。
 *
 * 我的答案： end, setImmediate, nextTick, then
 * 正确答案： end, nextTick, then, setImmediate
 */

// process.nextTick(() => {
//   console.log("nextTick"); // 3
// });
// Promise.resolve().then(() => {
//   console.log("then"); // 4
// });
// setImmediate(() => {
//   console.log("setImmediate"); // 2
// });
// console.log("end"); // 1

/**
 * 12. 红灯3秒亮一次，绿灯1秒亮一次，黄灯2秒亮一次；如何使用Promise让三个灯不断交替重复亮灯？
 * 题目要求红灯亮过后，绿灯才能亮，绿灯亮过后，黄灯才能亮，黄灯亮过后，红灯才能亮
 * 这是一个Promise链式调用，需要将每一个亮灯动作写在then()方法中，同时返回一个新的Promise，并将其状态由pending设置为fulfilled，允许下一盏灯亮起。
 */

// function red() {
//   console.log("red");
// }
// function green() {
//   console.log("green");
// }
// function yellow() {
//   console.log("yellow");
// }

// let light = (timer, cb) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       cb();
//       resolve();
//     }, timer);
//   });
// };

// let step = () => {
//   Promise.resolve()
//     .then(() => {
//       return light(3000, red);
//     })
//     .then(() => {
//       return light(2000, green);
//     })
//     .then(() => {
//       return light(1000, yellow);
//     })
//     .then(() => {
//       step();
//     });
// };

// step();

/**
 * 13. 实现一个mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。
 *
 */
const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
// 这是一个函数，不是promise对象
const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

const mergePromise = (ajaxArray) => {
  // 在这里实现你的代码
  // 保存数组中的函数执行后的结果
  var data = [];

  // Promise.resolve方法调用时不带参数，直接返回一个resolved状态的 Promise 对象。
  var sequence = Promise.resolve();

  ajaxArray.forEach((item) => {
    // 第一次的 then 方法用来执行数组中的每个函数，
    // 第二次的 then 方法接受数组中的函数执行后返回的结果，
    // 并把结果添加到 data 中，然后把 data 返回。
    sequence = sequence.then(item).then((res) => {
      data.push(res);
      return data;
    });
  });

  // 遍历结束后，返回一个 Promise，也就是 sequence， 他的 [[PromiseValue]] 值就是 data，
  // 而 data（保存数组中的函数执行后的结果） 也会作为参数，传入下次调用的 then 方法中。
  return sequence;
};

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

/**
 * 15. 封装一个异步加载图片的方法
 *
 */

// function loadImageAsync(url) {
//   return new Promise(function (resolve, reject) {
//     var image = new Image();
//     image.onload = function () {
//       resolve(image);
//     };
//     image.onerror = function () {
//       reject(new Error("Could not load image at" + url));
//     };
//     image.src = url;
//   });
// }
