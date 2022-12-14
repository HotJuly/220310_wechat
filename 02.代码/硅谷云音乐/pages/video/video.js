// pages/video/video.js
// import myAxios from '../../utils/myAxios';
import hasPermission from '../../utils/hasPermission';
// Page会接收一个配置对象,根据这个配置对象生成一个实例对象
// Page会将配置对象身上的属性给实例对象也来一份,例如以下的a和$myAxios
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
    videoList:[],

    // 用于控制页面上video组件和image组件的切换
    videoId:null,

    // 用于控制下拉动画的效果
    isTrigger:false
  },
  // a(){
  //   console.log('a')
  // },

  // 该方法用于监视用户下拉刷新scroll-view区域操作
  async handlePullDown(){
    // console.log('handlePullDown')

    await this.getVideoList();

    this.setData({
      isTrigger:false
    })
  },

  // 该方法用于监视用户点击图片,自动切换video组件并实现播放功能
  switchVideo(event){
    // 由于我们故意将image组件和video组件的id属性写成相同的值
    // 所以image组件的id等同于video组件的id
    const vid = event.currentTarget.id;

    // setData方法的第二个实参数据类型是函数,这个函数会在页面更新之后才调用
    this.setData({
      videoId:vid
    },()=>{
      // 1.创建video组件的上下文对象
      const videoContext = wx.createVideoContext(vid);

      // 2.调用API实现视频播放功能
      videoContext.play();
    })

    
  },

  // 该方法仅用于练习测试停止视频的API
  testApi(){
    // console.log('testApi')
    const videoContext = wx.createVideoContext("7FE0BC505A8AAE1F2C3D8E6B99A6EB5F");
    
    videoContext.pause()
  },

  // 该方法用于监视视频是否正在播放
  handlePlay(event){
    // console.log('handlePlay',event.currentTarget)
    // console.log('oldVid',this.oldVid)

    // 1.用于获取当前正在播放的视频id
    const vid = event.currentTarget.id;

    if(this.oldVid&&this.oldVid!==vid){
      // 3.创建对应的video组件的上下文对象
      const videoContext = wx.createVideoContext(this.oldVid);
  
      // 4.调用pause方法停止上一个视频的播放
      videoContext.pause()
    }

    // 2.将本次的id,留给下次使用
    this.oldVid = vid;
  },

  // 将myAxios文件暴露出来的内容,作为$myAxios的属性值
  // $myAxios:myAxios,

  // 用于监视用户点击导航选项操作
  async changeCurrentId(event){
    // 区分target和currentTarget
    const currentId = event.currentTarget.dataset.id;
    // console.log('currentId',currentId);

    // setData更新数据一定是同步更新,也就说哪怕下一行代码立即使用data数据,也一定是最新的
    this.setData({
      currentId
    })

    wx.showLoading({
      title:"加载中..."
    })

    await this.getVideoList();

    wx.hideLoading();
  },

  // 用于请求当前最新的分组对应的视频列表
  async getVideoList(){
    this.setData({
      videoList:[]
    });
    
    const result2 = await this.$myAxios('/video/group',{
      id:this.data.currentId
    })

    this.setData({
      videoList:result2.datas.map((item)=>{
        return item.data;
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('this',this)
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

    // const flag = hasPermission();

    // if(!flag)return;

    // console.log('这里是原装onShow',this)

    const result = await this.$myAxios('/video/group/list');
    // console.log('result',result)
    // 此处的result.data其实是res.data.data
    const navList = result.data.slice(0,13);

    // 虽然说setData更新数据是同步更新,但是也是从他的下一行代码开始
    this.setData({
      navList,
      currentId:navList[0].id
    })


    this.getVideoList();

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
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from,target}) {
    // console.log('onShareAppMessage',from)
    if(from==="menu"){
      // 能进入这里就说明用户点击了右上角的菜单

      return {
        title:"硅谷云音乐",
        imageUrl:"/static/images/dazuo.jpeg",
        path:"/pages/index/index"
      }
    }else{
      // 能进入这里就说明用户点击了button按钮
      // console.log('target',target)
      const {title,imageurl} = target.dataset;
      // const {title,imageurl:imageurl} = target.dataset;
      // 注意,:之后的才是变量名称,:前面的是属性名称
      // const imageurl =  target.dataset.imageurl;
      // console.log('imageUrl',imageurl123)
      return {
        title,
        imageUrl:imageurl,
        path:"/pages/video/video"
      }
    }
  }
})