// app.js
import myAxios from './utils/myAxios';
App({
  onLaunch(){
    // App的onLaunch相当于是Page的onLoad
    // 也就是当小程序开始加载的时候会执行这里代码

    // 1.将Page变量中的值给PageFn复制一份,此处传递的是Page函数的地址值
    // 后续我们会对Page变量进行重新赋值,所以需要提前将小程序原装的Page函数缓存一份
    // 注意:整个小程序中,只有原装的Page函数能够创建页面的实例对象
    const PageFn = Page;

    Page = function(config){
      // 由于此处修改了全局Page变量中的内容,所以所有页面以后调用的其实都是新的匿名函数Page,而新Page中会调用原装的Page函数

      // 由于所有页面调用的都是新的Page,所以该Page能接收到所有页面的配置对象
      
      // console.log('config',config)
      // 此处会修改所有页面的配置对象,用于统一添加某些工具函数,方便未来使用
      config.$myAxios=myAxios;

      // 这行代码的目的,就是为了创建当前页面的实例对象,保证页面能够正常展示
      return PageFn(config)
    }
  }
})
