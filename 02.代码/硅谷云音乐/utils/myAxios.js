export default function(url,data={},method="GET"){
  // let result;
  // wx.request({
  //   url:"http://localhost:3000" + url,
  //   data,
  //   method,
  //   success:(res)=>{
  //     console.log('res',res)
  //     result = res;
  //   }
  // })
  // return result;

  return new Promise((resolve,reject)=>{
    // Promise的执行器函数中的代码会被同步调用
    // resolve函数的用处,是将当前的promise对象的状态变为成功,
    //                  同时将传入resolve函数的实参变为promise对象的result结果
    wx.request({
      url:"http://localhost:3000" + url,
      data,
      method,
      success:(res)=>{
        // console.log('res',res)

        // res是整个响应报文对象,所以使用res.data返回响应体数据
        resolve(res.data)
      }
    })
  })
}