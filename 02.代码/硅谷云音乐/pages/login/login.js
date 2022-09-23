// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用于存储用户手机号码
    phone: "17688197777",

    // 用于存储用户密码
    password: "123"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 用于监视用户修改密码框操作
  handlePassword(event) {
    // console.log('handlePassword',event)
    const value = event.detail.value;
    this.setData({
      password: value
    })
  },

  // 用于监视用户修改号码框操作
  handlePhone(event) {
    const value = event.detail.value;
    this.setData({
      phone: value
    })
  },

  // 用于监视用户修改数据操作
  handleInput(event) {
    // console.log('handleInput',event)
    const {
      type
    } = event.target.dataset;
    const value = event.detail.value;
    this.setData({
      [type]: value
    })
  },

  // 用于监视用户点击登录按钮,实现登录帐号操作
  handleLogin() {
    /*
      1.收集数据
      2.处理数据格式
      3.前端表单验证
      4.发送请求
      5.成功做什么
        失败做什么
    */

    //  1.收集数据
    let {
      phone,
      password
    } = this.data;

    // 2.处理数据格式
    phone = phone.trim();
    password = password.trim();

    // 3.前端表单验证
    if (!phone) {
      wx.showToast({
        title: "手机号不能为空",
        icon: "error"
        // icon:"none"
      })
      return;
    }
    if (!password) {
      wx.showToast({
        title: "密码不能为空",
        icon: "error"
      })
      return;
    }

    /*
      状态码
        200 -> 登陆成功
        404 -> 手机号格式错误
        501 ->  手机号不存在(没有注册)
        502 ->  密码错误
    
    */
    const result = {};
    if (phone === "17688197776" && password === "chh112233") {
      result.code = 200;
      result.profile = {
        "backgroundImgIdStr": "2002210674180204",
        "avatarImgIdStr": "109951165120404634",
        "followed": false,
        "backgroundUrl": "https://p1.music.126.net/5L9yqWa_UnlHtlp7li5PAg==/2002210674180204.jpg",
        "detailDescription": "",
        "userId": 59421805,
        "avatarUrl": "https://p2.music.126.net/Ni3aqGjQX85pPr8XU20XDg==/109951165120404634.jpg",
        "defaultAvatar": false,
        "vipType": 0,
        "nickname": "七月入栈",
        "birthday": -2209017600000,
        "gender": 0,
        "province": 350000,
        "city": 350500,
        "avatarImgId": 109951165120404634,
        "backgroundImgId": 2002210674180204,
        "userType": 0,
        "accountStatus": 0,
        "expertTags": null,
        "experts": {},
        "mutual": false,
        "remarkName": null,
        "authStatus": 0,
        "djStatus": 0,
        "description": "",
        "signature": "",
        "authority": 0,
        "avatarImgId_str": "109951165120404634",
        "followeds": 2,
        "follows": 6,
        "eventCount": 1,
        "avatarDetail": null,
        "playlistCount": 10,
        "playlistBeSubscribedCount": 0
      }
    }else if(phone.length<11){
      result.code = 404;
    }else if(phone!=="17688197776"){
      result.code = 501;
    }else if(password !== "chh112233"){
      result.code = 502;
    }

    // console.log(result)
    const code = result.code;
    // if(code===200){
    //   wx.showToast({
    //     title: '登陆成功,即将跳转',
    //     icon:"none"
    //   })
    //   return;
    // }else if(code===404){
    //   wx.showToast({
    //     title: '手机号格式错误',
    //     icon:"error"
    //   })
    //   return;
    // }else if(code===501){
    //   wx.showToast({
    //     title: '手机号不存在',
    //     icon:"error"
    //   })
    //   return;
    // }else if(code===502){
    //   wx.showToast({
    //     title: '密码错误',
    //     icon:"error"
    //   })
    //   return;
    // }

    // 使用策略模式写法,替代以上代码写法
    // 策略:根据对方的出招,使用对应的方法进行防御
    const codeFn = {
      200(){
        wx.showToast({
          title: '登陆成功,即将跳转',
          icon:"none"
        })
        return;
      },
      404(){
        wx.showToast({
          title: '手机号格式错误',
          icon:"error"
        })
        return;
      },
      501(){
        wx.showToast({
          title: '手机号不存在',
          icon:"error"
        })
        return;
      },
      502(){
        wx.showToast({
          title: '密码错误',
          icon:"error"
        })
        return;
      }
    }
    
    // if(codeFn[code]){
    //   codeFn[code]()
    // }
    codeFn[code]&&codeFn[code]();
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