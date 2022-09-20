// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"我是初始化数据"
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('msg1',this.data.msg);

    // this.data.msg = "我是修改之后的数据"
    // this是当前页面的实例对象
    this.setData({
      msg:"我是修改之后的数据"
    })

    console.log('msg2',this.data.msg);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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