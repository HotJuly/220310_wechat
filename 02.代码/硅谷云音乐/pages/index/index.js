// pages/index/index.js
import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储首页轮播图数据
    banners: [],

    // 用于存储首页推荐歌曲数据
    recommendList:[],

    // 用于存储首页排行榜区域数据
    topList:[]

  },

  // 用于监视用户点击每日推荐按钮,跳转到每日推荐页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
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

    // 以下代码用于请求轮播图数据
    // console.log(1)
    // wx.request({
    //   url:"http://localhost:3000/banner",
    //   data:{
    //     type:2
    //   },
    //   success:(res)=>{
    //     // console.log('res',res)
    //     this.setData({
    //       banners:res.data.banners
    //     })
    //   }
    // })
    
    // const result = await myAxios('/banner', {type: 2});
    // this.setData({
    //   banners:result.banners
    // })

    myAxios('/banner', {type: 2})
    .then((result)=>{
      // 通过.then的回调函数的形参,可以获取到promise对象的结果值
      this.setData({
        banners:result.banners
      })
    })

    // console.log(2)

    // 以下代码用于请求推荐歌曲区域数据
    // wx.request({
    //   url:"http://localhost:3000/personalized",
    //   success:(res)=>{
    //     console.log('res',res)
    //   }
    // })
    myAxios("/personalized")
    .then((result)=>{
      this.setData({
        recommendList:result.result
      })
    })


    // 以下代码用于请求排行榜区域数据

    // 用于收集请求到的所有榜单对象数据
    const topList = [];

    // 用于收集需要请求的榜单的key
    const arr = [2,6,10,15,20];
    let index = 0;

    while(index<arr.length){
      const result2 = await myAxios("/top/list",{idx:arr[index++]});
      // console.log('result2', result2)
      // this.setData({
      //   recommendList:result1.result
      // })
      /*
        splice(开始下标,个数,新的数据)
          该API可以实现增删改三个操作
          该API会影响到原数组
            增加:arr.splice(1,0,"a")
            修改:arr.splice(1,1,"a")
            删除:arr.splice(1,1)
  
        slice(开始下标,结束下标)
          该API用于切割数组
          该API不会影响到原数组
          他会根据原数组切割出部分内容(从开始下标开始切割,到结束下标之前的内容)
            例如:arr.slice(1,6)=>意思是切割下标1到5的内容生成全新的数组
      
      */
      const obj = {
        id:result2.playlist.id,
        name:result2.playlist.name,
        list:result2.playlist.tracks.slice(0,3).map((item)=>{
          return item.al
        })
      };
  
  
      topList.push(obj);
  
      this.setData({
        topList
      })
    }
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