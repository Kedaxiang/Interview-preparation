// //如果传入的 value 本身就是 Promise 对象，则该对象作为 Promise.resolve 方法的返回值返回。  
// function fn(resolve){
//     setTimeout(function(){
//         resolve(123);
//     },3000);
// }
// let p0 = new Promise(fn);
// let p1 = Promise.resolve(p0);
// // 返回为true，返回的 Promise 即是 入参的 Promise 对象。
// console.log(p0 === p1);


// console.log('start') // 1

// setTimeout(() => {
//   console.log('setTimeout') // 6
// }, 0)

// new Promise((resolve) => {
//   console.log('promise') // 2
//   resolve()
// })
//   .then(() => {
//     console.log('then1') // 4
//   })
//   .then(() => {
//     console.log('then2') // 5
//   })

// console.log('end') // 3

// 结果为： start, promise, end, then1, then2, setTimeout

// async function async1() {
//     let data = await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
// }
// async1()

// console.log(111);

// new Promise((resolve, reject) => {
//     // console.log('async2 end')
//     async2();
//     resolve()
// }).then(() => {
//     // 执行async1()函数await之后的语句
//     console.log('async1 end')
// })



// async function func1() {
//     console.log('func1'); // 1
//     var a = await func2(); //当await返回非promise,返回undefined
//     console.log(a);
//     console.log('func1 return'); // 4. 微任务 
// }

// function func2() {
//     console.log('func2'); // 2
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(123)
//         }, 1000)
//     })
// }

// func1();

// new Promise(function (resolve) {
//     console.log('promise1'); // 3
//     resolve('resolved');
// }).then(function (data) {
//     console.log(data); // 5. 微任务
// });
// console.log('同步');

// async function async1() {
//     console.log("async1 start"); // 2
//     await async2(); 
//     console.log("async1 end"); // 6
// }
// async function async2() {
//     console.log('async2'); // 3
// }
// console.log("script start"); // 1
// setTimeout(function () {
//     console.log("settimeout"); // 8
// }, 0);
// async1();
// new Promise(function (resolve) {
//     console.log("promise1"); // 4
//     resolve();
// }).then(function () {
//     console.log("promise2"); // 7
// });
// console.log('script end'); // 5






// let a = 0;
// let test = async () => {
//   a = a + await 10;
//   console.log(a)
// }
// test()
// console.log(++a)

// 1 10


// function getSomething() {
//     return "something";
// }

// async function testAsync() {
//     return Promise.resolve("hello async");
// }

// async function test() {
//     const v1 = await getSomething();
//     const v2 = await testAsync();
//     console.log(v1, v2);
// }

// test();
// console.log('test之后的代码'); 





/**
 * 传入参数 n，表示这个函数执行的时间（毫秒）
 * 执行的结果是 n + 200，这个值将用于下一步骤
 */
function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(n) {
    console.log(`step2 with ${n}`);
    return takeLongTime(n);
}

function step3(n) {
    console.log(`step3 with ${n}`);
    return takeLongTime(n);
}


function doIt() {
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(time4 => console.log(time4))
}

doIt()