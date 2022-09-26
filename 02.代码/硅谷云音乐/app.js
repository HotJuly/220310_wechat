// app.js
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
import utilConfig from './utils/config';
App({
  onLaunch(){

    const PageFn = Page;

    Page = function(config){

      config.$myAxios=myAxios;

      const showFn = config.onShow;

      config.onShow = function(){
        const route = this.route;

        const result = utilConfig.checkPermission[route];
       
        if(result){

          const flag = hasPermission();
  
          if(!flag)return;
        }

        showFn.call(this);
      }

      return PageFn(config)
    }
  }
})
