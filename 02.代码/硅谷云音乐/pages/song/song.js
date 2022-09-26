// pages/song/song.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储当前歌曲页面的歌曲详情
    songObj:{},

    // 用于存储当前歌曲的音频链接
    musicUrl:"",

    // 用于控制当前页面C3效果的状态
    // 注意:当前项目进入song页面的时候,不会自动播放歌曲
    isPlay:false
  },

  // 用于监视用户点击播放按钮操作
  handlePlay(){
    // console.log('handlePlay')

    // 1.获取背景音频管理器对象
    const backgroundAudioManager = wx.getBackgroundAudioManager();

    if(this.data.isPlay){
      backgroundAudioManager.pause();
      
    }else{
  
      // 2.给背景音频管理器对象添加src和title属性
      backgroundAudioManager.src=this.data.musicUrl;
  
      backgroundAudioManager.title=this.data.songObj.name;
  
    }

    this.setData({
      isPlay:!this.data.isPlay
    })
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

    const result1 = await this.$myAxios('/song/url',{
      id:songId
    })

    const musicUrl = result1.data[0].url;

    this.setData({
      musicUrl
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