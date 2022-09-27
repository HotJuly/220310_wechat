// app.js
import PubSub from 'pubsub-js';
import moment from 'moment';
import myAxios from './utils/myAxios';
import hasPermission from './utils/hasPermission';
import utilConfig from './utils/config';
App({
  onLaunch(){

    const PageFn = Page;

    Page = function(config){

      config.$myAxios=myAxios;
      
      config.$PubSub=PubSub;

      config.$moment=moment;

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
  },
  globalData:{
    msg:"我是全局初始化的数据",

    // 用于记录当前背景音频歌曲的播放状态
    playState:false,

    // 用于记录当前背景音频歌曲是哪一首歌曲
    audioId:null
  }
})
