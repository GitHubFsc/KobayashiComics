// pages/my/index.js
import {GetMyHomePage,getSign} from '../../utils/axios.js';
import utils from './../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps : 3,
    loading: false
  },
  /*路由*/
  //修改用户信息
  router_personalInformation(){
    wx.navigateTo({
      url: '../personalInformation/index',
    })
  },
  //修改个性签名
  router_signature(){
    wx.navigateTo({
      url: '../signature/index',
    })
  },
  //优惠卷
  router_shoppingVoucher(){
    wx.navigateTo({
      url: '../shoppingVoucher/index',
    })
  },
  //发票
  router_integral(){
    wx.navigateTo({
      url: '../integral/index',
    })
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
      }
    })
  },
  //我的主页
  getMyHomePage(){
    let user_id = wx.getStorageSync('userId');
    GetMyHomePage({
      user_id: user_id,
      sign: getSign(`user_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          userInfo : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  /**WX API */
  //获取收货地址
  getAddress(){
    wx.chooseAddress({
      success (res) {
        console.log("收件人姓名",res.userName)
        console.log("收件人号码",res.telNumber)
        console.log("收件人地址",res.provinceName+res.cityName+res.detailInfo)
      }
    })
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      this.setData({
        steps : 3 
      })
    } else {
      this.setData({
        steps : 0
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
    this.getMyHomePage();
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