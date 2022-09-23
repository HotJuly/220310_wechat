// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储当前元素移动距离
    moveDistance: 0,

    // 用于控制元素移动的过渡效果
    moveTransition: "",

    // 用于存储用户信息
    userInfo: {}
  },

  // 用于监视用户手指移动操作
  handleTouchMove(event) {
    // 获取当前手指的位置
    const moveY = event.touches[0].clientY;

    const moveDistance = moveY - this.startY;
    // console.log('moveDistance',moveDistance)

    if (moveDistance < 0 || moveDistance > 80) return;
    this.setData({
      moveDistance
    })
  },

  // 用于监视用户手指按下操作
  handleTouchStart(event) {
    // 将手指按下的位置存入this身上,方便后续计算使用
    this.startY = event.touches[0].clientY;
    this.setData({
      moveTransition: ""
    })
  },

  // 用于监视用户手指抬起操作
  handleTouchEnd() {
    // console.log('handleTouchEnd')
    this.setData({
      moveDistance: 0,
      moveTransition: "transform 1s"
    })
  },

  // 用于监视用户点击游客按钮,进行页面跳转
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad')
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
    // console.log('onShow')
    /*
      为什么选择使用onShow?
        1.因为个人中心页面至始至终从来没有销毁过
          所以每次都会执行的生命周期只有onShow

        2.每次进入个人中心都要获取到最新的登录数据
    */
    const userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
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