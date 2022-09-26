// pages/song/song.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储当前歌曲页面的歌曲详情
    songObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // console.log('options',options);
    // const song = JSON.parse(options.song);
    // console.log('song',song);

    const songId = options.songId;

    const result = await this.$myAxios('/song/detail',{ids:songId});
    // console.log('result',result)
    this.setData({
      songObj:result.songs[0]
    })

    // 通过API的形式动态注入控制当前导航栏的展示标题
    wx.setNavigationBarTitle({
      title:this.data.songObj.name
    })
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