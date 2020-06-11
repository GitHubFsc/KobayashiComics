// pages/orderDetails/index.js
import { GetOrderDetail, GetOrderLogistics, GetOrderSign, GetCanCelOrder, getSign } from '../../utils/axios.js';
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_no: null,
    order_id: null,
  },
  /**路由 */
  //付款
  router_payment() {
    let that = this;
    let data ={};
    data.order_no = that.data.MyOrder.order_no,
    data.price = that.data.MyOrder.price;
    console.log(data);
    wx.showLoading({
      mask: true,
      title: '提交中...'
    })
    that.postWeChatPay(data,res=>{
      that.getOrderDetail();
    })
    // wx.navigateTo({
    //   url: '../productSubmitOrder/index?order_no=' + e.currentTarget.dataset.order_no,
    // })
  },
  //申请售后
  router_applyAgain(e) {
    let that = this;
    let order_id = that.data.order_id,
    order_goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../applyForSale/index?order_id=' + order_id + '&order_goods_id=' + order_goods_id,
    })
  },
  //查看物流
  router_Logistics(e) {
    wx.navigateTo({
      url: '../Logistics/index?order_no=' + e.currentTarget.dataset.order_no,
    })
  },
  //评价
  //评价
  router_Evaluation(){
    let that = this;
    console.log(that.data.MyOrder)
    let data = [],order_no = that.data.MyOrder.order_no;
    that.data.MyOrder.glist.map(res=>{
      data.push({
        order_goods_id : res.id,
        goods_img_url : res.goods_img_url,
        goods_name : res.goods_name,
        sku_parameter_type_title : res.sku_parameter_type_title,
        size_title : res.size_title,
        sku_price : res.sku_price,
        content : '',
        img_url : [],
        LitUp: 0,
        Unlit: 5,
      })
    })
    wx.navigateTo({
      url: '../Evaluation/index?data='+JSON.stringify(data) + '&order_no=' + order_no,
    })
  },
  /**事件 */
  //取消订单
  cancelOrder(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.getCanCelOrder(id, res => {
      that.getOrderDetail();
    })
  },
  //订单签收
  OrderSign(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.getOrderSign(id, res => {
      that.getOrderDetail();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      order_id: options.id
    })
    this.getOrderDetail();
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
  getOrderDetail() {
    let user_id = wx.getStorageSync('userId');
    let order_id = this.data.order_id;
    GetOrderDetail({
      user_id: user_id,
      order_id: order_id,
      sign: getSign(`user_id=${user_id}&order_id=${order_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.now_time = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.now_time))) : 0;
        res.data.Response.cancel_time = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.cancel_time))) : 0;
        res.data.Response.add_timespan = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.add_timespan))) : 0;
        res.data.Response.pay_add_timespan = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.pay_add_timespan))) : 0;
        res.data.Response.delivery_timespan = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.delivery_timespan))) : 0;
        res.data.Response.take_delivery_timespan = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.take_delivery_timespan))) : 0;
        res.data.Response.finish_timespan = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.finish_timespan))) : 0;
        res.data.Response.cancel_timespan = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.cancel_timespan))) : 0;
        if(res.data.Response.status>2&&res.data.Response.status<6){
          this.getOrderLogistics(order_id)
        }
        this.setData({
          MyOrder: res.data.Response
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
  //取消订单
  getCanCelOrder(id, callback) {
    let user_id = wx.getStorageSync('userId');
    GetCanCelOrder({
      user_id: user_id,
      order_id: id,
      sign: getSign(`user_id=${user_id}&order_id=${id}`)
    }).then(res => {
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
  //确认签收
  getOrderSign(id, callback) {
    let user_id = wx.getStorageSync('userId');
    GetOrderSign({
      user_id: user_id,
      order_id: id,
      sign: getSign(`user_id=${user_id}&order_id=${id}`)
    }).then(res => {
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
  //订单物流
  getOrderLogistics(id) {
    let user_id = wx.getStorageSync('userId');
    GetOrderLogistics({
      user_id: user_id,
      order_id: id,
      sign: getSign(`user_id=${user_id}&order_id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          Logistics : res.data.Response
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
  //微信支付
  postWeChatPay(data, callback) {
    let userInfo = wx.getStorageSync('userInfo');
    let order_no = data.order_no,
      price = data.price;
    let openid = userInfo.openId
    let user_id = wx.getStorageSync('userId');
    console.log("order_no", order_no, 'price', price * 100, 'openid', openid, 'user_id', user_id);
    let body = "微信支付"
    let url = '&body=' + body + '&total_fee=' + price * 100 + '&out_trade_no=' + order_no + '&configId=104&trade_type=JSAPI&msgid=' + openid;
    wx.request({
      url: 'https://pays.zztv021.com/payment/wxpay/wxpay.ashx?action=jspayparam' + url,
      success: (res) => {
        wx.hideLoading()
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          success: (item) => {
            if (item.errMsg == "requestPayment:ok") {
              callback && callback(item)
            } else {
              wx.hideLoading()
              wx.showToast({
                title: item.errMsg,
                icon: 'none',
              })
            }
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({
              title: '取消支付！',
              icon: 'none'
            })
            //取消支付 商品订单
            wx.switchTab({
              url: '../order/index?index=1',
            })
          }
        });
      }
    });
  },
})