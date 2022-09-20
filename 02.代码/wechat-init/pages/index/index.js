// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"我是初始化数据",
    userInfo:{}
  },

  // 用于测试移动端基础事件
  handler(){
    console.log('handler')
  },
  handleChild(){
    console.log('handleChild')
  },
  handleParent(){
    console.log('handleParent')
  },

  handleTap(){
    // wx.navigateTo({
    //   // url: '../log/log',
    //   url: '/pages/log/log',
    // })

    wx.redirectTo({
      url: '../log/log',
      // url: '/pages/log/log',
    })
  },

  changeMsg(){
    this.setData({
      msg:"我被点击了"
    })
  },

  getUserProfile(){
    // 事件回调函数中的this,指向当前页面的实例对象

    wx.getUserProfile({
      desc:"用于测试获取用户授权功能",
      success:(res)=>{
        /*
          在框架中,一个框架要给开发者传递数据,有两种渠道:
            1.通过this传递
            2.通过形参传递
        */
      //  console.log('res',res)
      // 获取到用户的个人信息
       const userInfo = res.userInfo;

      // 将获取到的用户信息更新到data中,进行展示
        this.setData({
          // userInfo:userInfo
          userInfo
        })
      },
      fail(error){
        console.log('error',error)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('msg1',this.data.msg);

    // // this.data.msg = "我是修改之后的数据"
    // // this是当前页面的实例对象
    // this.setData({
    //   msg:"我是修改之后的数据"
    // })

    // console.log('msg2',this.data.msg);

    
    console.log('------onLoad------')

    // wx.getUserProfile({
    //   desc:"用于测试获取用户授权功能",
    //   success(res){
    //     /*
    //       在框架中,一个框架要给开发者传递数据,有两种渠道:
    //         1.通过this传递
    //         2.通过形参传递
    //     */
    //    console.log('res',res)
    //   },
    //   fail(error){
    //     console.log('error',error)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('------onReady------')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('------onShow------')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('------onHide------')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('------onUnload------')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})