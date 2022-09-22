// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储首页轮播图数据
    banners:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      请求的三个问题:
        1.在哪发
          由于onLoad是最早触发的生命周期,所以选择onLoad

        2.怎么发
            小程序中没有window对象,所以无法发送ajax请求
            小程序的全局对象是wx

            API:wx.request(Object object)

        3.往哪发
          参考接口文档
            三个注意点:
              1.请求地址
              2.请求方式
              3.请求参数

        注意:小程序禁止请求本机IP
    
    */
    // console.log('window',window)
    // console.log('wx',wx)

    // console.log(1)
    wx.request({
      url:"http://localhost:3000/banner",
      data:{
        type:2
      },
      success:(res)=>{
        // console.log('res',res)
        this.setData({
          banners:res.data.banners
        })
      }
    })
    // console.log(2)
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