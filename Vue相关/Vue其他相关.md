- [x] `v-if`与`v-show`：
    - v-if: 真正的条件渲染，使条件块内的事件监听器和DOM适当的销毁与重建，用在少量改变条件时
    - v-show: 由`display`来控制元素的显隐，元素一定会被渲染，用于频繁改变条件

- [x] `watch`与`computed`
    - computed: 计算属性，存在缓存，**在依赖的属性值改变之后**，下一次获取`computed`时才会重新计算
    - watch: 主要是用于数据的监听回调，可以含有异步操作

- [x] 虚拟DOM
> Virtual DOM是DOM节点在js中的一种抽象数据结构，因为在浏览器中操作DOM的代价比较昂贵(重绘与重排)，频繁操作DOM会产生性能问题。虚拟DOM的**作用是在每一次响应式数据发生变化引起页面重渲染时，Vue对比更新前后的虚拟DOM，匹配找出尽可能少的需要更新的真实DOM**，从而达到性能提升的目的

- [ ] diff算法

#####  1. 当数据发生变化时，vue是怎么更新节点的

先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。

diff的过程就是调用名为patch的函数，比较新旧节点，一边比较一边给真实的DOM打补丁。

##### 2. virtual DOM和真实DOM的区别

```HTML
<div>
    <p>123</p>
</div>
```
virtual DOM是将真实的DOM的数据抽取出来，以对象的形式模拟树形结构。对应的虚拟DOM（伪代码）：
```javascript
var Vnode = {
    tag: 'div',
    children: [
        { tag: 'p', text: '123' }
    ]
};
```

##### 3. diff的比较方式
在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。
```HTML
<div>
    <p>123</p>
</div>

<div>
    <span>456</span>
</div>
```
上面的代码会分别比较同一层的两个div以及第二层的p和span，但是不会拿div和span作比较
![image](https://images2018.cnblogs.com/blog/998023/201805/998023-20180519212338609-1617459354.png)

当数据发生改变时，set方法会让调用Dep.notify通知所有订阅者Watcher，订阅者就会调用patch给真实的DOM打补丁，更新相应的视图。
![image](https://images2018.cnblogs.com/blog/998023/201805/998023-20180519212357826-1474719173.png)


[源码分析](https://www.cnblogs.com/wind-lanyan/p/9061684.html)

##### 4. key属性的作用是什么
在对节点进行diff的过程中，判断是否为相同节点的一个很重要的条件是key是否相等，如果是相同节点，则会尽可能的复用原有的DOM节点。key属性是提供给框架在diff的时候使用的，给每一个vNode添加一个身份标识，方便vue进行识别


##### 简单总结

在对比新老虚拟DOM时
1. 对比节点本身，判断是否为同一节点，如果不为相同节点，则删除该节点重新创建节点进行替换
2. 如果为相同节点，进行patchVnode操作，判断如何对该节点的子节点进行处理，先判断一方有子节点一方没有子节点的情况(如果新的child没有子节点，那么旧的子节点移除)
3. 比较如果都有子节点，则进行updateChildren，判断如何对这些新老节点的子节点进行操作(diff核心)
4. 匹配时，找到相同子节点，递归比较子节点

> 在diff中，只对同层子节点进行比较，放弃跨级节点比较，降低了时间复杂度，只有当新旧children都为多个子节点时才需要用核心的Diff算法进行同层级比较


- [ ] Vue2.0和Vue3.0的区别

1. 重构响应式系统，使用Proxy代替Object.defineProperty
2. 新增Composition API,更好的逻辑复用和代码组织
3. 重构虚拟DOM
4. 代码结构调整，便于tree shaking，体积更小

- [ ] SSR [link](https://github.com/yacan8/blog/issues/30)

- [ ] [web前端工程师面试题2021](https://www.jianshu.com/p/3507b078fe03)