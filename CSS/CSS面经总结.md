- [ ] **1. 两个div并排怎么做**
- flex布局
- table-cell
- float:left


- [x] **2. float和定位的区别**

定义
- 浮动：相对于父元素浮动的两个盒子，两个盒子之间的**位置有影响，不可以重叠**，如果向同一个方向浮动，会依次排序
- 定位：相对于父元素(relative)进行定位的两个盒子，两个盒子位置之间没有关系，两个盒子可以重叠

特点：
- 浮动：
    - 1、元素会左移/右移，知道触碰到容器为止
    - 2、设置了浮动的元素，**仍然处于标准文档流中**，它会占据标准文档流中的空间，对周围的元素产生影响
    - 3、当元素没有设置宽度并设置了浮动时，元素的宽度随内容的变化而变化
    - 4、当元素设置浮动属性后，会对相邻元素产生影响，并且父元素的高度会发生坍塌
- 定位：
    - 1、相对定位：相对于自身原有的位置进行偏移，不会影响原有的文档流，拥有偏移属性和z-index属性
    - 2、绝对定位：完全脱离文档流，拥有偏移属性和z-index属性


- [x] **3. 清除浮动(解决清除高度坍塌)**
> 为子元素添加浮动后，子元素脱离文档流，无法撑起父元素，导致父元素高度坍塌
- 开启BFC(第15条)
    1. 给父元素设置宽高：父元素宽高写死，不能根据子元素自动调节
    2. 给父元素添加浮动：父元素脱离文档流，父元素宽度丢失，并且会导致下边元素上移，无法解决问题
    3. 给父元素添加`display:inline-block`:可以解决问题，但是会导致宽度丢失
    4. overflow设置为非visible的值：使用hidden
- 在最后添加一个空div，设置`clear:both`
- br元素的clear属性`<br clear="all/">`
- after伪类， 在IE6中，不支持after，所以在IE6中还需要使用hasLayout来处理（zoom：1）

```CSS
.wrap::after {
    content: '';
    clear: both;
}
```


- [x] **4. 定位会出现父元素高度坍塌的问题？怎么解决？和float一样？**
- 给父元素设置高度
- 通过js判断子元素的高度赋值给父元素


- [ ] **5. 子元素随着父元素的宽度变化，哪种方法好？为什么？**
- 设置子元素宽高百分比
- js


- [x] **6. css盒子模型**

![image](https://www.runoob.com/images/box-model.gif)
- Margin(外边距) - 清除边框外的区域，外边距是透明的。
- Border(边框) - 围绕在内边距和内容外的边框。
- Padding(内边距) - 清除内容周围的区域，内边距是透明的。
- Content(内容) - 盒子的内容，显示文本和图像。

盒子模型分为标准盒子模型和怪异盒子模型
1. 标准盒模型(content-box)
- 设置的宽高width/height是内容content的宽高，实际盒子的宽度=内容宽+border+padding

2. 怪异盒模型(border-box)(IE盒模型)
- 设置的宽高width/height就是盒子的大小，设置padding和border不会改变盒子的大小，内容区的大小会改变

- [x] **7. [行内元素、块级元素、替换元素](https://segmentfault.com/a/1190000015202771)**
- 块级元素：
    - 总是从新的一行开始，独占一行
    - 高度宽度内外边距可控，宽度默认100%
    - 块级元素中可以包含块级元素和行内元素
    - h1-h6、div、p、语义化标签header-footer、audio等
- 行内元素：
    - 与其它元素在同一行上
    - 宽高，内外边距不可控
    - 宽高取决于内容(文字、图片)的宽高
    - 行内元素只能容纳文本和其它的内联元素
    - 设置width无效，设置height无效，可以通过line-height来设置
    - 设置margin只有左右margin有效，上下无效
    - 设置padding有效，但是不会影响元素外，会影响兄弟内联元素
    - 父元素设置了display:flex后会影响
- 替换元素: 浏览器根据标签的元素、属性来决定如何显示，比如img、video、input、textarea、select
    - 行内替换元素设置padding、margin、background可以撑开父元素
    - 行内非替换元素设置padding、margin、background会生效，但是不会撑开父元素。（四个边距生效，margin只有左右生效）

> 替换元素一般有内在尺寸，所以具有width和height，可以设定。例如你不指定img的width和height时，就按其内在尺寸显示，也就是图片被保存的时候的宽度和高度。
对于表单元素，浏览器也有默认的样式，包括宽度和高度。



- [x] **8. 行内元素可以设置margin吗**
- [ ] **9. 两栏/三栏布局**
- [x] **10. 选择器优先级**
1.   ！important:在属性后面写上这条样式，会覆盖掉页面上任何位置定义的元素的样式。
2.   行内样式，在style属性里面写的样式。
3.  id选择器
4. class选择器
5. 标签选择器
6. 子选择器（ul > li）
7. 后代选择器（li a）
8. 伪类选择（a:hover,li:nth-child）
- [x] **11. 伪元素（一个冒号和两个冒号)**
> 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
> ：单冒号 是CSS2正确且正常写法<br/>
> ：：双冒号 是CSS3新写法且兼容性写法<br/>
> 兼容性写法就是给不同浏览器解析不同的元素

单冒号 :AAA ---->在IE浏览器下正常，如果使用谷歌或者火狐之类的浏览器就会页面错位等等

如果在用双冒号做兼容性处理 ::AAA —>不同的浏览器就会自动区分解析。

单冒号用于伪类的书写，双冒号用于伪元素的书写。伪类为了兼容旧有样式，:after和::after都是一样的作用。

> 其中伪类和伪元素的根本区别在于：它们是否创造了新的元素。

- 伪类： ![image](https://img-blog.csdnimg.cn/20190527175840224.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3Njc0NDM5,size_16,color_FFFFFF,t_70)
- 伪元素选择符: ![image](https://img-blog.csdnimg.cn/2019052717580919.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI3Njc0NDM5,size_16,color_FFFFFF,t_70)


- [ ] **12. 垂直居中**
- [ ] **13. margin中的百分比**
- [x] **14. block、inline和inline-box**
- inline：内联元素
- inline-block:同时具备内联元素、块级元素的特点
1. 和其它元素都在一行
2. 元素的高度、宽度、行高等都可以设置
- [x] **15. BFC**
> BFC（Block Formatting Context）格式化上下文，是Web页面中盒模型布局的CSS渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

开启BFC后，元素将会具有以下特性:
1. 内部的Box会在垂直方向上一个接一个的放置。
2. 垂直方向上的距离由margin决定
3. bfc的区域不会与float的元素区域重叠。
4. 计算bfc的高度时，浮动元素也参与计算
5. bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面元素。

形成BFC的条件
1. 浮动元素，float 除 none 以外的值； 
2. 定位元素，position（absolute，fixed）； 
3. display 为以下其中之一的值 inline-block，table-cell，table-caption； 
4. overflow 除了 visible 以外的值（hidden，auto，scroll）；

开启BFC的作用：
1. 除去上下边距的折叠(属于同一个BFC的两个相邻Box的margin会发生折叠，不同BFC不会发生折叠。)
2. 不被浮动元素覆盖，防止字体环绕
3. 清除浮动