import {Getopenid,getSign, UserLogin, Postdecryption} from './utils/axios.js';
// var utils = require('./utils/util.js');
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        //发送 res.code 到后台换取 openId, sessionKey, unionId
        Getopenid({
          code: res.code,
          rnd: 1,
          sign: getSign(`code=${res.code}&rnd=1`)
        }).then(res => {
          if (res.data.ErrCode == 0) {
            wx.setStorageSync('openid', res.data.Response);
          } else {
            wx.showToast({
              title: res.data.ErrMsg,
              icon: "none"
            })
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login(callback) {
    let openid = wx.getStorageSync('openid');
    let phoneNumber = wx.getStorageSync('phoneNumber');
    let userInfo = wx.getStorageSync('userInfo');
    UserLogin({
      body: {
        nickname : userInfo.nickName,
        avatar : userInfo.avatarUrl,
        sex : userInfo.gender,
        mobile : phoneNumber,
        openid: openid
      }
    },[['sign='+ getSign('')]]).then(res => {
      if (res.data.ErrCode == 0) {
        wx.setStorageSync('userId', res.data.Response.user_id)
        this.globalData.user_id = res.data.Response.user_id
        callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //获取手机号
  getPhoneNumber(e,callback) {
    wx.login({
      success: (result) => {
        Postdecryption({
          body: {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            code: result.code,
          }
        } ,[['sign='+ getSign('')]]
        ).then(res => {
          if (res.data.ErrCode == 0) {
            wx.setStorageSync('phoneNumber', res.data.Response.str.phoneNumber)
            this.globalData.phoneNumber = res.data.Response.str.phoneNumber
            callback && callback(res.data.Response.str)
          } else {
            wx.showToast({
              title: res.data.ErrMsg,
              icon: 'none',
            })
          }
        })
      },
    })
  },
  //获取用户信息
  getUserInfo(e,callback) {
    wx.login({
      success: (result) => {
        Postdecryption({
          body: {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
            code: result.code,
          }
        } ,['sign='+ getSign('')]).then(res => {
          if (res.data.ErrCode == 0) {
            wx.setStorageSync('userInfo', res.data.Response.str)
            this.globalData.userInfo = res.data.Response.str
            callback && callback(res.data.Response.str)
          } else {
            wx.showToast({
              title: res.data.ErrMsg,
              icon: 'none',
            })
          }
        })
      },
    })
  },
  globalData: {
    userInfo: null,
    openid : null,
    user_id : null,
    phoneNumber : null
  }
})

/*router_mall*/
// wx.login({
//   success: res => {
//     console.log(res);
//     发送 res.code 到后台换取 openId, sessionKey, unionId
//     utils.request(`WeiXin/Getopenid`,`get`,{
//       code:res.code,
//       rnd: 1,
//       sign : utils.getSign(`code=${res.code}&rnd=1`)
//     },res=>{
//       if(res.data.ErrCode==0){
//         wx.setStorageSync('openid', res.data.Response)
//         utils.request(`UserBase/UserLogin?sign=${utils.getSign('')}`,`post`,{
//           body :{
//             mobile : '17638292303',
//             openid : res.data.Response
//           }
//         },res=>{
//           if(res.data.ErrCode==0){
//             wx.setStorageSync('userId', res.data.Response.user_id)
//           }else{
//             wx.showToast({
//               title: res.data.ErrMsg,
//               icon: 'none',
//               duration: 2000
//             })
//           }
//         })
//       }else{
//         wx.showToast({
//           title: res.data.ErrMsg,
//           icon: 'none',
//           duration: 2000
//         })
//       }
//     })
//   }
// })