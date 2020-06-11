// pages/orderDetails/index.js
import { GetReturnOrderDetail, RGetCanCelOrder, GetReturnExpress,GetSetExpress, getSign} from '../../utils/axios.js';
var utils = require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    return_order_id : '',
    order_id: '',
    dialog_box: false,
    select_box: false,
    orderDetails: null,
    CourierCompany: "选择快递公司",
    CourierCompanys :[],
    category_id :'',
    express_id : [],
    express_no: null,
  },

  /**路由 */
  //重新申请
  router_applyAgain(e) {
    let that = this;
    let order_goods_id = e.currentTarget.dataset.gid,
    order_id  = that.data.order_id ;
    wx.navigateTo({
      url: '../applyForSale/index?order_id=' + order_id + '&order_goods_id=' + order_goods_id,
    })
  },
  /**事件 */
  //打开快递公司下拉
  CourierCompany() {
    this.setData({
      select_box: !this.data.select_box
    })
  },
  //快递公司选择
  select_box(e) {
    this.setData({
      express_id : e.currentTarget.dataset.id,
      CourierCompany: e.currentTarget.dataset.txt,
      select_box: false
    })
  },
  //填写寄回单号
  SingleNumber() {
    this.setData({
      dialog_box: true
    })
  },
  //关闭快递填写弹框
  cancel() {
    this.setData({
      dialog_box: false
    })
  },
  //快递单号失焦
  bindKeyInput(e) {
    this.setData({
      express_no: e.detail.value
    })
  },
  //提交快递单号
  submit(){
    let that = this;
    that.getSetExpress(res=>{
      ththatis.setData({
        dialog_box: false
      })
    })
  },
  //取消申请
  cancelOrder(){
    let that = this;
    let id = that.data.return_order_id;
    that.getCanCelOrder(id,res=>{
      wx.navigateBack({
        delta: 1
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options){
      this.setData({
        return_order_id: options.id,
        order_id : options.order_id,
      })
      wx.showLoading({
        title: '加载中...',
      })
      this.getReturnOrderDetail(options.id);
      this.getReturnExpress();
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

  //订单详情
  getReturnOrderDetail(id){
    let user_id = wx.getStorageSync('userId');
    GetReturnOrderDetail({
      user_id : user_id,
      return_order_id : id,
      sign : getSign(`user_id=${user_id}&return_order_id=${id}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.add_timespan = res.data.Response.add_timespan ? utils.formatTime(new Date(Number(res.data.Response.add_timespan))) : 0;
        res.data.Response.order_add_timespan = res.data.Response.order_add_timespan ? utils.formatTime(new Date(Number(res.data.Response.order_add_timespan))) : 0;
        res.data.Response.pay_add_timespan = res.data.Response.pay_add_timespan ? utils.formatTime(new Date(Number(res.data.Response.pay_add_timespan))) : 0;
        res.data.Response.delivery_timespan = res.data.Response.delivery_timespan ? utils.formatTime(new Date(Number(res.data.Response.delivery_timespan))) : 0;
        this.setData({
          orderDetails: res.data.Response
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none'
        })
      }
    })
  },
  //退款订单-取消
  getCanCelOrder(id,callback){
    let user_id = wx.getStorageSync('userId');
    RGetCanCelOrder({
      user_id :user_id ,
      return_order_id : id,
      sign: getSign(`user_id=${user_id}&return_order_id=${id}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //快递列表
  getReturnExpress(){
    GetReturnExpress({
      rnd : 1,
      sign : getSign(`rnd=1`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          CourierCompanys : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //提交快递单号
  getSetExpress(callback){
    let user_id = wx.getStorageSync('userId');
    let {return_order_id,category_id,express_no,} = this.data;
    GetSetExpress({
      user_id : user_id,
      return_order_id : return_order_id,
      category_id : category_id,
      express_no : express_no,
      sign: getSign(`user_id=${user_id}&return_order_id=${return_order_id}&category_id=${category_id}&express_no=${express_no}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
})