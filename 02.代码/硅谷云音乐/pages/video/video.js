// pages/video/video.js
import myAxios from '../../utils/myAxios';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储导航列表数据
    navList:[],

    // 用于存储用户正在查看的内容标识
    currentId:null,

    // 用于存储视频列表相关数据
    videoList:[]
  },

  // 用于监视用户点击导航选项操作
  changeCurrentId(event){
    // 区分target和currentTarget
    const currentId = event.currentTarget.dataset.id;
    // console.log('currentId',currentId);

    this.setData({
      currentId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 选择使用onShow的原因,因为tabBar只要挂载一次之后,永久不销毁
    // 那么初始化生命周期中,只有onShow每次都会执行

    const result = await myAxios('/video/group/list');
    // console.log('result',result)
    // 此处的result.data其实是res.data.data
    const navList = result.data.slice(0,13);

    // 虽然说setData更新数据是同步更新,但是也是从他的下一行代码开始
    this.setData({
      navList,
      currentId:navList[0].id
    })

    const result2 = await myAxios('/video/group',{
      id:this.data.currentId
    })

    this.setData({
      videoList:result2.datas.map((item)=>{
        return item.data;
      })
    })

    // console.log('result2',result2)
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