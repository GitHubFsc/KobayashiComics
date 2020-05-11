//index.js
//获取应用实例
import {Rnd,} from '../../utils/axios.js';

const app = getApp()

Page({
  data: {
    userInfo: {},
    Carousel :[1,2,3],
  },
  
  //路由
  router_mall(){
    wx.navigateTo({
      url: '../mall/index',
    })
  },
  router_homestay(){
    wx.navigateTo({
      url: '../homestay/index',
    })
  },
  router_route(){
    wx.navigateTo({
      url: '../route/index',
    })
  },
  router_livebroadcast(){
    wx.navigateTo({
      url: '../livebroadcast/index',
    })
  },
  //事件





  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
