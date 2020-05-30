// pages/productSubmitOrder/index.js
import { PostGoodsSubmit ,GetGoodsCoupon, getSign } from '../../utils/axios.js';
import utils from './../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    body : [],
    switchChecked: false,
    Goods :[]
  },
  /**路由 */
  //支付
  router_topay() {
    wx.navigateTo({
      url: './../Afterpayment/index?index=0'
    })
  },
  //优惠券
  router_shoppingVoucher(){
    wx.navigateTo({
      url: './../shoppingVoucher/index'
    })
  },
  //发票
  router_invoice() {
    wx.navigateTo({
      url: './../invoice/index'
    })
  },
  //选择地址
  router_address() {
    wx.navigateTo({
      url: './../address/index'
    })
  },
  /*事件*/
  //积分switch开关
  switchChange(e){
    this.setData({
      switchChecked : e.detail.value
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      this.setData({
        body : JSON.parse(options.arr),
        Address : wx.getStorageSync('Address')
      })
      this.postGoodsSubmit(res=>{
        this.getGoodsCoupon(res,datas=>{
          this.setData({
            Goods : res.data.Response,
            GoodsCoupon : datas.data.Response,
          })
        })
      });
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
    let Coupon = wx.getStorageSync('Coupon');
    if(Coupon){
      this.setData({
        GoodsCoupon : Coupon,
      })
    }
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
  //订单提交-预览
  postGoodsSubmit(callback){
    let user_id = wx.getStorageSync('userId'),
    body = this.data.body;
    let datas = [];
    datas.push('user_id='+user_id)
    datas.push('sign='+getSign(`user_id=${user_id}`))
    PostGoodsSubmit({
      body : body
    },datas).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //获取用户地址
  getAddress(){
    let that = this;
    wx.chooseAddress({
      success (res) {
        let Address = {};
        Address.userName = res.userName;
        Address.telNumber = res.telNumber;
        Address.Address = res.provinceName+res.cityName+res.countyName+res.detailInfo;
        that.setData({
          Address
        })
        wx.setStorageSync('Address', Address)
      }
    })
  },
  //获取用户可用优惠券
  getGoodsCoupon(datas,callback){
    let user_id = wx.getStorageSync('userId');
    let  money = datas.data.Response.total_price;
    GetGoodsCoupon({
      user_id : user_id,
      type : 1,
      money : money,
      sign: getSign(`user_id=${user_id}&type=1&money=${money}`)
    }).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  }
})