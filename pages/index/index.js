//index.js
//获取应用实例
import {Rnd,} from '../../utils/axios.js';

const app = getApp()

Page({
  data: {
    userInfo: {},
    Carousel :[1,2],
    recommend :['官方资讯','关注','推荐','热点'],
    currentTab : 0,
  },
  
  //路由
  //商城
  router_mall(){
    wx.navigateTo({
      url: '../mall/index',
    })
  },
  //民宿
  router_homestay(){
    wx.navigateTo({
      url: '../homestay/index',
    })
  },
  //路线
  router_route(){
    wx.navigateTo({
      url: '../route/index',
    })
  },
  //直播列表
  router_livebroadcastList(){
    wx.navigateTo({
      url: '../livebroadcastList/index',
    })
  },
  //直播
  router_livebroadcast(){
    wx.navigateTo({
      url: '../livebroadcast/index',
    })
  },
  //分享
  router_dynamic(){
    wx.navigateTo({
      url: '../dynamic/index',
    })
  },
  //社区详情
  router_communityDetails(e){
    wx.navigateTo({
      url: '../communityDetails/index?id='+e.currentTarget.dataset.index,
    })
  },
  //搜索
  router_search(){
    wx.navigateTo({
      url: '../search/index',
    })
  },
  //定位
  router_city(){
    wx.navigateTo({
      url: '../city/index',
    })
  },
  //事件
  nav_tab(e){
    this.setData({
      currentTab : e.target.dataset.index
    })
  },




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
