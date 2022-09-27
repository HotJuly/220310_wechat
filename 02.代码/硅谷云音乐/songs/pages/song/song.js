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
    songId:null,

    // 用于存储当前页面歌曲播放进度
    currentTime:"00:00",

    // 用于存储当前页面歌曲的总时长
    durationTime:"--:--",

    // 用于控制红色进度条的宽度
    currentWidth:0
  },

  handleTouchStart(){
    this.flag1=true;
  },

  // 用于监视用户在进度条遮罩层上的手指滑动操作
  handleTouchMove(event){
    // console.log('handleTouchMove',event)
    const clientX = event.touches[0].clientX;

    // w1就是当前手指距离进度条最左边的差值
    const w1 = clientX - this.left;

    // 计算需要跳转歌曲的比例
    this.scale = w1/this.width;

    this.setData({
      currentWidth:this.scale*100
    })

    // console.log('scale',scale)
  },

  // 用于监视用户进度条区域手指抬起事件,并且跳转进度
  handleTouchEnd(){

    const time = this.data.songObj.dt/1000*this.scale;

    this.backgroundAudioManager.pause();
    this.backgroundAudioManager.seek(time);
    this.backgroundAudioManager.play();

    this.flag1=false;
  },

  // 用于绑定背景音频管理器相关的所有事件
  addEvent(){
    // 监视播放
    this.backgroundAudioManager.onPlay(()=>{
      // console.log('onPlay')
      
      if(this.data.songId === appInstance.globalData.audioId){
        this.setData({
          isPlay:true
        })
      }

      appInstance.globalData.playState = true;
    })

    // 监视暂停
    this.backgroundAudioManager.onPause(()=>{
      // console.log('onPause')
      if(this.data.songId === appInstance.globalData.audioId){
        this.setData({
          isPlay:false
        })
      }

      appInstance.globalData.playState = false;
    })

    // 用于监视背景音频进度更新事件
    this.backgroundAudioManager.onTimeUpdate(()=>{
      console.log('onTimeUpdate')

      // 获取到当前的播放进度
      let currentTime = this.backgroundAudioManager.currentTime;

      this.setData({
        currentTime:this.$moment(currentTime*1000).format('mm:ss')
      })


      if(!this.flag1){
        // 当前红色进度条宽度=当前时间/总时间
        // 注意100000=1000*100,1000的进行单位转换秒变为毫秒,100是为了变为百分比数字
        const currentWidth = currentTime*100000/this.data.songObj.dt;
        this.setData({
          currentWidth
        })
      }
    })
  },

  // 用于监视用户点击上一首/下一首按钮,实现切换歌曲功能
  switchType(){
    this.backgroundAudioManager.pause();
    this.$PubSub.publish('switchType','next');
  },

  // 用于监视用户点击播放按钮操作
  async handlePlay(){
    // console.log('handlePlay')

    // 1.获取背景音频管理器对象
    // const backgroundAudioManager = wx.getBackgroundAudioManager();
    
    if(!this.data.musicUrl){
      await this.getMusicUrl();
    }

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
      songObj:result.songs[0],

      // moment函数能接受的数据单位是ms
      durationTime:this.$moment(result.songs[0].dt).format("mm:ss")
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

    // URL传参,数据类型一定是字符串,相当于具有隐式类型转换效果
    const songId = options.songId*1;

    this.setData({
      songId
    })

    this.getMusicDetail();


    // 取出app实例对象身上缓存的两个重要数据
    const {playState,audioId} = appInstance.globalData;

    // console.log(this.data.songId,audioId,playState)

    if(this.data.songId === audioId&&playState){
      this.setData({
        isPlay:true
      })
    }

    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    
    this.token = this.$PubSub.subscribe('sendId',(msg,songId)=>{
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

        // 用app实例对象缓存当前背景音频的状态和歌曲id
        appInstance.globalData.audioId = this.data.songId;
        appInstance.globalData.playState = true;

        console.log(1)
      })
      .catch(()=>{
        wx.showToast({
          title: '请求时候,请稍后再试',
          icon:"none"
        })
      })

    })

    this.addEvent();

    // 1.通过API生成小程序wxml中的查询器对象
    const selectorQuery = wx.createSelectorQuery();

    // 2.通过API找到页面上的某个组件
    // 注意!!!:无论执行任何的操作组件代码,最后都一定要写上.exec(),否则都无效
    selectorQuery.select("#mask").boundingClientRect((data)=>{
      // console.log('data',data)
      // 缓存进度条距离屏幕左边的距离,目的是为了方便计算出当前手指在进度条上哪个位置
      this.left = data.left;

      // 缓存进度条宽度,目的是为了方便等下跳转歌曲进度,用于计算百分比
      this.width = data.width;
    }).exec()


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
    this.$PubSub.unsubscribe(this.token)
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