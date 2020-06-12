// pages/routeDetalis/index.js
import {GetRouteDetail,getSign} from '../../utils/axios.js';
import utils from '../../utils/util.js';
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current :0,
    steps : 3,
    loading: false
  },
  /*路由*/
  //预定
  router_routeSubmitOrder(e){
    wx.navigateTo({
      url: '../routeSubmitOrder/index?id='+e.currentTarget.dataset.id,
    })
  },
  /*事件*/
  //轮播图
  swiperChange: function (e) {
    var that = this;
    that.setData({
      current: e.detail.current
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      this.setData({
        steps : 3 ,
        route_id : options.id
      })
      this.getRouteDetail();
    } else {
      this.setData({
        steps : 0,
        route_id : options.id
      })
    }
    this.getRouteDetail();
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

  },
    /**API */
  //获取手机号
  getPhoneNumber(e) {
    let that = this;
    that.setData({
      loading: true,
    })
    app.getPhoneNumber(e,(data)=>{
      console.log("手机号回调",data)
      if(data){
        that.setData({
          steps : 1 ,
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
    app.getUserInfo(e,(data)=>{
      console.log("用户回调",data)
      if(data){
        that.setData({
          steps : 2 ,
          loading: false,
        })
      }
    })
  },
  //用户登录
  UserLogin() {
    var that = this;
    app.login((data)=>{
      console.log("登录成功",data)
      if(data){
        that.setData({
          steps : 3 ,
          loading: false,
        })
        that.getRouteDetail();
      }
    })
  },
  //路线详情
  getRouteDetail(){
    let user_id = wx.getStorageSync('userId'),
    route_id = this.data.route_id;
    GetRouteDetail({
      user_id :user_id,
      route_id : route_id,
      sign : getSign(`user_id=${user_id}&route_id=${route_id}`)
    }).then(res=>{
      if(res.data.ErrCode==0){
        console.log(res);
        this.setData({
          RouteDetail : res.data.Response,
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})