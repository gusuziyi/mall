# 六个前端小练习

用了八周时间基本了解了bootstrap、vue-cli、express、jsonserver、mock 都是什么东西

第一周比较顺利，在网易云课堂上看完了bootstrap，然后就找了三个网站开始山寨，中间尽管小有波折，但在bootstrap官网上基本都找到了解决方案，还顺便学会了怎样使用阿里的iconfont图标，这是一套字体矢量图标，在任何设备上都不会失真，与bootstrap的响应式思想十分契合；

第二周在淘宝上买了一套vue视频，跟着敲了一遍，一周时间基本入门，然后结合bootstrap写了mall的v1.0版，实现了一个类似于购物车的小页面，这期间发现了mockjs，他可以拦截浏览器的ajax请求，然后返回随机生成的随机数，是一款很不错的测试工具。代码方面整体来讲并没遇上过多的障碍，因为就用一个vue对象，所有函数和变量在一起，修复bug很容易。使用mock生成数据，这里我试了很久，除数字外其他数据都必须返回函数调用，否则会有无法实现Random方法，另外dataImage方法需要canvas支持，此处不影响，但在后来写V3.0版时node服务器会有报错

第三周开始学nodejs，淘宝上买了一套视频，跟着视频手撸了一套http服务器和路由器，然后在8888端口上实现了一个比较简陋的拼图游戏

第四周开始学Mongo数据库，看过两天文档之后，然后在路由里面写出了增删改查方法!

第五周开始学express+ejs框架，这个东西我觉得类似于之前用过的cms系统，内部实现一套逻辑供前台调用，只是cms只需要理解怎么套模板就好了，而express需要理解原理。没想到这个东西居然也属于前端范畴，看来这个前端行业挺不容易的。尽管express都是集成好的东西，比node要简单一些，但是由于许多东西没有积累，也会踩不少坑，由于当时不知道子路由和路由重定向，结果纯手工实现的这些功能

第六周，因为学会express，就开始改版之前mall，升级成V2.0，主要改动有两个，一是将mall页面搭设到本地express服务器上，二是将页面拆成层层嵌套的vue组件，这期间重点关注了关于组件间的数据通信：父子之间使用props，子父之间使用emit广播，兄弟之间使用数据总线，更复杂的数据交换还可以使用vuex。同时，为了各组件间可以共享数据和方法，将根节点绑定的vm定义为全局原型变量Vue.prototype。经过这个练习，也基本理解了MVC设计模式。

第七周学习了less与es6的基本语法，然后特郁闷的发现项目中import和export始终无法正常使用，我一直怀疑是sublime上的babel没有调试好，但是始终查找不出问题，sublime里面的babel插件实在是浩如烟海，查找资料也感觉无从入手，学习一度陷入停滞，后来无意中发现vue-cli，接触到工程脚手架这个概念，发现这个工具真是神器，所有的node模块都可以用npm集成过来，而且babel是默认内置的，组件也全部都是单独的文件，加上严格的eslint书写规范，非常适合多人合作项目。

第八周使用vue-cli把mall升级成了V3.0，首先介绍下文件夹目录树结构，设计的非常有条理性：build是后端服务器文件；config是服务器配置；dist是工程成品文件，使用npm run build 生成，全部兼容es5格式；node_modules是依赖包，由package.json索引，工程文件不必上传，根目录下使用npm install能够自动安装；src为工作目录，其中的assets为静态资源，componets为组件集合，router保存路由表，App.vue是app的入口组件，main.js负责绑定App组件、入口文件和路由表；static是内置的静态路由

