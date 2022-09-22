// 用于注册小程序
// App函数有且只能调用一次
App({
  onLaunch(){
    // let updateManager = wx.getUpdateManager();

    // updateManager.onCheckForUpdate(function (res) {
    //   // 请求完新版本信息的回调
    // //res中的hasUpdate可以知道是否需要更新
    //   if (res.hasUpdate) {
    //       //弹窗提示用户
    //       console.log('该小程序即将在五分钟后更新')
    //   }
    // })

    // updateManager.onUpdateReady(function () {
    //   //调用该API实现更新包安装,强制更新
    //   setTimeout(()=>{
    //     updateManager.applyUpdate()
    //   },5*60*1000)
    //  })
  }
});