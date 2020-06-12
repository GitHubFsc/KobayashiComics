// pages/homestayorderDetails/index.js
import {GetHomestayOrderDetail,GetCancelRouteOrder,GetCancelHomestayOrder,getSign} from '../../utils/axios.js';
import utils from '../../utils/util.js';
import qrcode from '../../utils/weapp-qrcode.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_no : null,
    order_id : '',
  },
  /**路由 */
  //申请退款
  router_applyAgain(e) {
    let that = this;
    let order_id = that.data.OrderDetail.order_id,
      order_goods_id = that.data.OrderDetail.detail.id,
    money = that.data.OrderDetail.price;
    wx.navigateTo({
      url: '../applyForSale/index?order_id=' + order_id + '&order_goods_id=' + order_goods_id + '&money=' + money + '&type=2',
    })
  },
  /**事件 */
  //取消订单
  cancelOrder(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showLoading({
      title: '订单取消中...',
    })
    that.getCancelHomestayOrder(id, res => {
      wx.hideLoading()
      this.getHomestayOrderDetail()
    })
  },
  //付款
  payment(e) {
    let that = this;
    let data = {};
    data.order_no = e.currentTarget.dataset.order_no,
      data.price = e.currentTarget.dataset.price;
    console.log(data);
    wx.showLoading({
      mask: true,
      title: '提交中...'
    })
    that.postWeChatPay(data, res => {
      this.getHomestayOrderDetail()
    })
  },
  //取消申请
  cancelRefund(e){
    let that = this;
    let rid = e.currentTarget.dataset.rid,
      id = e.currentTarget.dataset.id;
    that.getCancelRouteOrder(rid,id,res=>{
      this.getHomestayOrderDetail()
    })
  },
  //生成核销码

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.setData({
        order_id: options.id
      })
      wx.showLoading({
        mask: true,
        title: '加载中...'
      })
      this.getHomestayOrderDetail()
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
  //民宿订单详情
  getHomestayOrderDetail(){
    let user_id = wx.getStorageSync('userId'),
    order_id = this.data.order_id;
    GetHomestayOrderDetail({
      user_id : user_id,
      order_id : order_id,
      sign : getSign(`user_id=${user_id}&order_id=${order_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.cancel_time = res.data.Response.cancel_time ? utils.formatTime(new Date(Number(res.data.Response.cancel_time))) : 0;
        res.data.Response.now_time = res.data.Response.now_time ? utils.formatTime(new Date(Number(res.data.Response.now_time))) : 0;
        res.data.Response.detail.begin_timespan = res.data.Response.detail.begin_timespan ? utils.formatTime(new Date(Number(res.data.Response.detail.begin_timespan))) : 0;
        res.data.Response.detail.end_timespan = res.data.Response.detail.end_timespan ? utils.formatTime(new Date(Number(res.data.Response.detail.end_timespan))) : 0;
        res.data.Response.add_timespan = res.data.Response.add_timespan ? utils.formatTime(new Date(Number(res.data.Response.add_timespan))) : 0;
        res.data.Response.cancel_timespan = res.data.Response.cancel_timespan ? utils.formatTime(new Date(Number(res.data.Response.cancel_timespan))) : 0;
        res.data.Response.pay_add_timespan = res.data.Response.pay_add_timespan ? utils.formatTime(new Date(Number(res.data.Response.pay_add_timespan))) : 0;
        if(res.data.Response.refound){
          res.data.Response.refound.add_timespan = utils.formatTime(new Date(Number(res.data.Response.refound.add_timespan)))
        }
        if(res.data.Response.status==2){
          qrcode({
            width: 65,
            height: 65,
            canvasId: 'myQrcode',
            text: res.data.Response.verification_code
          })
        }
        this.setData({
          OrderDetail : res.data.Response
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //民宿订单-取消
  getCancelHomestayOrder(id, callback) {
    let user_id = wx.getStorageSync('userId');
    GetCancelHomestayOrder({
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
        })
      }
    })
  },
  //取消退款
  getCancelRouteOrder(rid, id, callback) {
    let user_id = wx.getStorageSync('userId');
    GetCancelRouteOrder({
      user_id: user_id,
      order_id: id,
      return_order_id: rid,
      sign: getSign(`user_id=${user_id}&order_id=${id}&return_order_id=${rid}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
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