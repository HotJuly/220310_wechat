// app.js
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
import utilConfig from './utils/config';
App({
  onLaunch(){

    const PageFn = Page;

    Page = function(config){

      config.$myAxios=myAxios;

      // console.log(config.onShow)

      // 1.将每个页面的其他同事写的onShow保留一份
      const showFn = config.onShow;

      // 2.在此处,将所有页面的onShow函数全部改成了一个全新的函数
      /* 
        注意:
          1.此时真正作为每个页面的onShow钩子函数的是我们新创建的函数
            无论是Vue还是小程序中,都会使用bind方法,强行将钩子函数的this改为当前页面或者组件实例对象
          2.而其他同事写在页面配置中的onShow已经变成了一个普通函数
      */
      config.onShow = function(){
        // console.log('heihei 被我改了',this)
        // 从当前页面的实例对象身上获取当前页面的路由路径
        const route = this.route;

        // 在黑名单数组中,查找是否具有当前页面的路径
        // 如果有出现,就说明需要做权限检测
        // const result = utilConfig.checkPermission.includes(route);
        const result = utilConfig.checkPermission[route];
       
        if(result){
          const flag = hasPermission();
  
          if(!flag)return;
        }

        // 由于现在新的onShow才是真正的钩子函数,所以新的onShow的this是每个页面的实例对象
        // 但是showFn函数中可能需要用到页面的实例对象,所以我们使用call方法,强行指定showFn函数的this指向,变为新的onShow函数的this指向
        showFn.call(this);
      }

      return PageFn(config)
    }
  }
})
