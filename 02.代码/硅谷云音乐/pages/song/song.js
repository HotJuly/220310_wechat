// pages/song/song.js
// import PubSub from 'pubsub-js';
// console.log('PubSub',PubSub)
const appInstance = getApp();
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
    isPlay:false,

    // 用于存储记录当前是哪一首歌
    songId:null
  },

  // 用于监视用户点击上一首/下一首按钮,实现切换歌曲功能
  switchType(){
    this.$PubSub.subscribe('sendId',(msg,songId)=>{
      // console.log(msg,songId)

      this.setData({
        songId
      })

      const promise1 = this.getMusicDetail();

      const promise2 =  this.getMusicUrl();

      Promise.all([promise1,promise2])
      .then(()=>{
        this.backgroundAudioManager.src = this.data.musicUrl;
        this.backgroundAudioManager.title = this.data.songObj.name;

        this.setData({
          isPlay:true
        })
      })
      .catch(()=>{
        wx.showToast({
          title: '请求时候,请稍后再试',
          icon:"none"
        })
      })

    })
    this.$PubSub.publish('switchType','next');
  },

  // 用于监视用户点击播放按钮操作
  handlePlay(){
    // console.log('handlePlay')

    // 1.获取背景音频管理器对象
    // const backgroundAudioManager = wx.getBackgroundAudioManager();

    if(this.data.isPlay){
      this.backgroundAudioManager.pause();

      // 此处不需要记录暂停的是哪首歌,因为想要暂停歌曲一定会经过播放歌曲流程
      appInstance.globalData.playState = false;
      
    }else{
  
      // 2.给背景音频管理器对象添加src和title属性
      this.backgroundAudioManager.src = this.data.musicUrl;
  
      this.backgroundAudioManager.title = this.data.songObj.name;

      // 用app实例对象缓存当前背景音频的状态和歌曲id
      appInstance.globalData.audioId = this.data.songId;
      appInstance.globalData.playState = true;
  
    }

    this.setData({
      isPlay:!this.data.isPlay
    })
  },

  // 专门用于请求当前对应的歌曲详情
  async getMusicDetail(){
    const result = await this.$myAxios('/song/detail',{ids:this.data.songId});
    // console.log('result',result)
    this.setData({
      songObj:result.songs[0]
    })

    // 通过API的形式动态注入控制当前导航栏的展示标题
    wx.setNavigationBarTitle({
      title:this.data.songObj.name
    })
  },

  // 专门用于请求当前对应各歌曲链接
  async getMusicUrl(){
    const result1 = await this.$myAxios('/song/url',{
      id:this.data.songId
    })

    const musicUrl = result1.data[0].url;

    this.setData({
      musicUrl
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

    this.setData({
      songId
    })

    this.getMusicDetail();

    this.getMusicUrl();

    // 取出app实例对象身上缓存的两个重要数据
    const {playState,audioId} = appInstance.globalData;

    if(this.data.songId === audioId&&playState){
      this.setData({
        isPlay:true
      })
    }

    this.backgroundAudioManager = wx.getBackgroundAudioManager()


    // 用于测试练习app对象的使用
    // console.log('appInstance1',appInstance.a.msg)
    // appInstance.a.msg="我是修改之后的全局数据"
    // console.log('appInstance2',appInstance.a.msg)
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