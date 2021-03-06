- [x] 1. 了解promsie吗

promise是异步编程的一种解决方案，链式调用的写法更为直观，并且能够在外层捕获异步函数的异常信息

Promise常用API
- Promise.resolve(value)

> 类方法（不是实例方法，也就是说不能new Promise.resolve(value)），该方法返回一个以 value 值解析后的 Promise 对象 
> 1. 如果这个值是个 thenable（即带有 then 方法），返回的 Promise 对象会“跟随”这个 thenable 的对象，采用它的最终状态（指 resolved/rejected/pending/settled）
> 2. 如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。
> 3. 其他情况以该值为成功状态返回一个 Promise 对象。

- Promise.reject: 与resolve唯一不同，返回的promise对象状态为rejected
- Promise.prototype.then: 实例方法，为Promise的注册回调函数fn(value){}。value是上一个任务的返回结果,then中函数一定要return一个结果或者一个新的Promise对象，才可以让之后的then回调接收
- Promise.prototype.catch: 实例方法，捕获异常
- Promise.race: 类方法，多个promise任务同时是执行，返回最先执行结束的Promise任务结果，**不管任务结果成功还是失败**
- Promise.all: 类方法，多个Promise任务同时进行，如果全部执行成功，则以数组返回Promise任务的执行结果，只要有要一个Promise任务rejected，只返回rejected的结果

> 多练习，熟悉掌握，不能一知半解

> 在then中，如果后续任务是异步任务的话，**必须返回要给新的promise对象**，如果后续任务是同步任务，**只需返回一个结果**

- [x] 2. Promise解决的痛点是什么

回调地狱

- [ ] 3. Promise解决的痛点还有其它方法可以解决吗？如果有，请列举

终极解决方案async/await

- [x] 4. Promise该如何使用

- 首先初始化一个Promise对象，可以通过两种方式创建，都会返回一个Promise对象
    - `new Promise(fn)`
    - `Promise.resolve(fn)`（可以看作是`new Promise(resolve => resolve(fn)`的简写，将其封装成Promise实例）
- 然后调用上一步返回的promise对象的then方法，**注册回调函数**
- then中的回调函数可以有一个参数，也可以不带参数。**如果then中的回调函数依赖上一步的结果**，那么需要带上参数
- 最后注册catch异常处理函数，处理前面回调中可能抛出的异常

- [x] 5. Promise的常用方法
- Promise.resolve();
- Promise.reject();
- Promise.prototype.then();
- Promise.prototype.catch();
- Promise.all();
- Promise.race();

- [ ] 6. Promise在事件循环中的执行过程

Promise与事件循环
- promise在初始化时，传入的函数是**同步进行的**，然后注册then回调，继续往下执行同步代码，**then中的回调暂时不会执行**。同步代码执行完毕后，才会在事件循环中检测是否有可用promise的回调，如果有，那么执行(then中方法)，如果没有，继续下一个事件循环(setTimeout)
- 宏任务与微任务
- nodejs事件循环


- [ ] 7. Promise的业界实现都有哪些
- [ ] 8. 手写Promise的polyfill


### 由promise拓展

- [ ] 9. 宏任务与微任务
- js运行机制： 单线程执行

> 在浏览器环境中，有JS 引擎线程和渲染线程，且两个线程互斥。
Node环境中，只有JS 线程。

- 宿主： js运行的环境，一般为浏览器或者Node
- 执行栈: 是一个存储函数调用的**栈结构**，遵循**先进后出**原则
- Event Loop（事件循环）

![image](https://upload-images.jianshu.io/upload_images/25750-50b8dfd7f560fe04?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

> JS引擎常驻于内存中，等待宿主将JS代码或函数传递给它。</br>
也就是等待宿主环境分配宏观任务，反复等待 - 执行即为事件循环

Event Loop中，每一次循环称为tick，每一次tick的任务如下：

1. 执行栈选择最先进入队列的宏任务（一般都是script），执行其同步代码直至结束；
2. 检查是否存在微任务，有则会执行至微任务队列为空；
3. 如果宿主为浏览器，可能会渲染页面；
4. 开始下一轮tick，执行宏任务中的异步代码（setTimeout等回调）。

- 宏任务与微任务(异步任务)

> ES6 规范中，microtask 称为 jobs，macrotask 称为 task<.br>
宏任务是由宿主发起的，而微任务由JavaScript自身发起。


 \ |  宏任务 | 微任务
---|---|---
谁发起的 | Node、浏览器 | JS引擎
具体事件 | 1. script (可以理解为外层同步代码)</br>2. setTimeout/setInterval</br>3. UI rendering/UI事件</br>4. postMessage，MessageChannel</br>5. setImmediate，I/O（Node.js） | 1. Promise</br>2. MutaionObserver</br>3. Object.observe（已废弃；Proxy 对象替代）</br>4. process.nextTick（Node.js）
谁先运行 | 后运行 | 先运行
会触发新一轮Tick吗 | 会 | 不会

- [x] [`async`和`await`](https://segmentfault.com/a/1190000007535316) 
- 异步编程回调函数写法的替代方法。（使代码以同步方式的写法完成异步操作）
- 个人理解：
     - await后面的代码，相当于回调函数(await的下一行开始，都当作是回调函数的内容)
     - 回调函数会压入微任务队列，当主线程的同步任务完成之后，就回去微任务队列里取出回调函数逐个执行
     - await只是让**当前async函数内部,await之后的代码等待**，在async函数之后的代码依旧会执行
- async 函数返回的是一个 Promise 对象.如果在函数中 return 一个直接量，async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象
- 如果async函数没有返回值，会返回`Promise.resolve(undefined)`
- 一般来说，都认为 await 是在等待一个 async 函数完成。不过按语法说明，await 等待的是一个表达式(**实际是一个返回值**)，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。
- await会阻塞后面的代码，而async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。

```javascript
function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");
}

async function test() {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
}

test();
console.log('test之后的代码'); 

// test之后的代码
// something hello async

```