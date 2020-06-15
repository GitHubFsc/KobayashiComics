//index.js
import {
  GetIndexBanner,
  GetNewsList,
  getSign
} from '../../utils/axios.js';

const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'H6VBZ-KIL6K-JC2JD-AMD4R-3FXI5-DMFDF'
});
Page({
  data: {
    userInfo: {},
    Carousel: [1, 2],
    recommend: ['官方资讯', '关注', '推荐', '热点'],
    city: '上海市',
    currentTab: 0,
    steps: 3,
    loading: false,
    NewsList: [],
    page: 1,
    pagesize: 10,
  },

  /*路由*/
  //商品详情
  router_productDetails(e) {
    wx.navigateTo({
      url: '../productDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //商城
  router_mall() {
    wx.navigateTo({
      url: '../mall/index',
    })
  },
  //民宿
  router_homestay() {
    wx.navigateTo({
      url: '../homestay/index',
    })
  },
  //路线
  router_route() {
    wx.navigateTo({
      url: '../route/index',
    })
  },
  //直播列表
  router_livebroadcastList() {
    let that = this;
    let steps = that.data.steps
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      steps = 3
      wx.navigateTo({
        url: '../livebroadcastList/index',
      })
    } else {
      steps = 0
    }
    that.setData({
      steps
    })
  },
  //直播
  router_livebroadcast() {
    let that = this;
    let steps = that.data.steps
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      steps = 3
      wx.navigateTo({
        url: '../livebroadcast/index',
      })
    } else {
      steps = 0
    }
    that.setData({
      steps
    })
  },
  //分享
  router_dynamic() {
    wx.navigateTo({
      url: '../dynamic/index',
    })
  },
  //社区详情
  router_communityDetails(e) {
    wx.navigateTo({
      url: '../communityDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //搜索
  router_search() {
    wx.navigateTo({
      url: '../search/index',
    })
  },
  //定位
  router_city() {
    wx.navigateTo({
      url: '../city/index',
    })
  },
  //事件
  nav_tab(e) {
    let that = this;
    let { steps } = that.data;
    let user_id = wx.getStorageSync('userId');
    let index = e.target.dataset.index + 1;
    that.setData({
      page: 1,
      pagesize: 10,
      NewsList: []
    })
    if (user_id) {
      steps = 3;
      that.getNewsList(index, res => {
        that.setData({
          NewsList: res.data.Response,
        })
      })
    } else {
      steps = 0;
    }
    that.setData({
      steps,
      currentTab: e.target.dataset.index,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getIndexBanner()
    this.getNewsList(1, res => {
      console.log(res)
      this.setData({
        NewsList: res.data.Response
      })
    })
  },
  onShow() {
    let city = wx.getStorageSync('city');
    if (city) {
      this.setData({
        city
      })
    } else {
      //使用经纬度获取城市名
      let that = this;
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          console.log(res);
          const latitude = res.latitude
          const longitude = res.longitude
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude,
              longitude: longitude
            },
            success: res => {
              that.setData({
                city: res.result.address_component.city,
              })
            }
          });
        }
      })
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let index = that.data.currentTab +1 ,
    NewsList = that.data.NewsList;
    that.setData({
      page: that.data.page + 1
    })
    that.getNewsList(index,res=>{
      res.data.Response.map(arr=>{
        NewsList.push(arr)
      })
      this.setData({
        NewsList
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**API */
  //获取手机号
  getPhoneNumber(e) {
    let that = this;
    that.setData({
      loading: true,
    })
    app.getPhoneNumber(e, (data) => {
      console.log("手机号回调", data)
      if (data) {
        that.setData({
          steps: 1,
          loading: false,
        })
      }
    })
  },
  //获取用户信息
  getUserInfo(e) {
    let that = this;
    that.setData({
      loading: true
    })
    app.getUserInfo(e, (data) => {
      console.log("用户回调", data)
      if (data) {
        that.setData({
          steps: 2,
          loading: false,
        })
      }
    })
  },
  //用户登录
  UserLogin() {
    var that = this;
    app.login((data) => {
      console.log("登录成功", data)
      if (data) {
        that.setData({
          steps: 3,
          loading: false,
        })
      }
    })
    if (that.data.currentTab > 0) {
      that.getNewsList(that.data.currentTab, res => {
        console.log(res)
      })
    }
  },


  //获取首页轮播图
  getIndexBanner() {
    GetIndexBanner({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          Carousel: res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //获取资讯
  getNewsList(type, callback) {
    let userId = wx.getStorageSync('userId');
    userId = userId ? userId : '-1'
    let { page, pagesize } = this.data;
    GetNewsList({
      user_id: userId,
      type: type,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${userId}&type=${type}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
})