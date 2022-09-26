export default function(){
  const cookie = wx.getStorageSync('cookie');
  if(!cookie){
    wx.showModal({
      title:"请先登录",
      content:"该功能需要登陆之后才能使用",
      cancelText:"回到首页",
      confirmText:"去登陆",
      success:({confirm})=>{
        // 无论点击取消还是确定,都会触发成功的回调
        if(confirm){
          wx.navigateTo({
            url:"/pages/login/login"
          })
        }else{
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      },
      fail(){
        console.log('fail')
      }
    })
    return false;
  }else{
    return true;
  }
}