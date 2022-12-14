// pages/recommendSong/recommendSong.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储当前月份
    month:"--",

    // 用于存储当前日期
    day:"--",

    // 用于存储每日推荐的歌曲数据
    recommendList:[],

    // 用于存储当前正在展示的歌曲下标
    currentIndex:null
  },

  // 用于监视用户点击某个歌曲选项,跳转到song页面
  toSong(event){
    // console.log(event.currentTarget.dataset.song)
    const {song,index} = event.currentTarget.dataset;

    this.setData({
      currentIndex:index
    })

    // url传参是有长度限制的,不能传递太多的数据
    wx.navigateTo({
      url: '/songs/pages/song/song?songId=' + song.id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.token = this.$PubSub.subscribe("switchType",(msg,type)=>{
      // console.log('switchType',msg,type);
      let {currentIndex,recommendList} = this.data;

      if(type==="next"){
        if(currentIndex===recommendList.length-1){
          currentIndex=0
        }else{
          currentIndex++;
        }
      }else{
        if(currentIndex===0){
          currentIndex=recommendList.length-1;
        }else{
          currentIndex--;
        }
      }

      const songId = recommendList[currentIndex].id;
      // console.log('songId',songId)

      this.setData({
        currentIndex
      })

      this.$PubSub.publish('sendId',songId);
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
  onShow:async function () {
    const date = new Date();
    const month = date.getMonth() + 1;
    // const day = date.getDay();
    const day = date.getDate();
    // console.log('day',day)


    if(day!==this.data.day){
      const {recommend} = await this.$myAxios('/recommend/songs');
      // console.log('result',result)

      this.setData({
        recommendList:recommend
      })
    }

    this.setData({
      month,
      day
    })

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
    this.$PubSub.unsubscribe(this.token);
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