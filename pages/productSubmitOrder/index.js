// pages/productSubmitOrder/index.js
import { PostGoodsSubmit, GetGoodsCoupon, PostSumMoney, GetPointRule, PostSubmitOrder, getSign } from '../../utils/axios.js';
import utils from './../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    body: [],
    switchChecked: false,
    Goods: [],
    coupon: '',
    invoice: ''
  },
  /**路由 */
  //支付
  router_topay() {
    let that = this;
    that.postSubmitOrder(res => {
      console.log(res);
      that.postWeChatPay(res.data.Response, data => {
        console.log(data);
        wx.redirectTo({
          url: './../Afterpayment/index?index=0'
        })
      })
    })
  },
  //优惠券
  router_shoppingVoucher() {
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
  switchChange(e) {
    this.setData({
      switchChecked: e.detail.value
    })
    this.postSumMoney(res => {
      this.setData({
        freight: res.data.Response.freight,
        point_money: res.data.Response.point_money,
        coupon_money: res.data.Response.coupon_money,
        vip_discount_money: res.data.Response.vip_discount_money,
        sumprice: res.data.Response.sumprice,
        total_price: res.data.Response.total_price,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        body: JSON.parse(options.arr),
        Address: wx.getStorageSync('Address')
      })
      this.postGoodsSubmit(res => {
        this.getGoodsCoupon(res, datas => {
          this.setData({
            Goods: res.data.Response,
            invoice: res.data.Response.invoice,
            coupon: datas.data.Response,
            freight: res.data.Response.freight,
            point_money: res.data.Response.point_money,
            coupon_money: res.data.Response.coupon_money,
            vip_discount_money: res.data.Response.vip_discount_money,
            sumprice: res.data.Response.sumprice,
            total_price: res.data.Response.total_price,
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
    let coupon = wx.getStorageSync('Coupon'),
      invoice = wx.getStorageSync('Invoice');
    console.log(coupon)
    console.log(invoice)
    if (coupon.coupon_type == 1 || coupon.coupon_type == 4) {
      this.setData({
        coupon: coupon,
        coupon_money: coupon.coupon_discount_money
      })
    }
    if (invoice) {
      this.setData({
        invoice: invoice,
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
  postGoodsSubmit(callback) {
    let user_id = wx.getStorageSync('userId'),
      body = this.data.body;
    let datas = [];
    datas.push('user_id=' + user_id)
    datas.push('sign=' + getSign(`user_id=${user_id}`))
    PostGoodsSubmit({
      body: body
    }, datas).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  //获取用户地址
  getAddress() {
    let that = this;
    wx.chooseAddress({
      success(res) {
        that.setData({
          Address: res
        })
        console.log(that.data.Address)
        wx.setStorageSync('Address', that.data.Address)
      }
    })
  },
  //获取用户可用优惠券
  getGoodsCoupon(datas, callback) {
    let user_id = wx.getStorageSync('userId');
    let money = datas.data.Response.total_price;
    GetGoodsCoupon({
      user_id: user_id,
      type: 1,
      money: money,
      sign: getSign(`user_id=${user_id}&type=1&money=${money}`)
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
  //订单提交-计算总价
  postSumMoney(callback) {
    let user_id = wx.getStorageSync('userId'),
      {
        body,
        switchChecked,
        coupon
      } = this.data,
      is_deduction = switchChecked ? 1 : 0,
      user_coupon_id = coupon.length > 0 ? coupon.id : 0;
    let datas = [];
    datas.push('user_id=' + user_id);
    datas.push('user_coupon_id=' + user_coupon_id);
    datas.push('is_deduction=' + is_deduction);
    datas.push('sign=' + getSign(`user_id=${user_id}&user_coupon_id=${user_coupon_id}&is_deduction=${is_deduction}`))
    PostSumMoney({
      body: body
    }, datas).then(res => {
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

  //提交订单 
  postSubmitOrder(callback) {
    wx.showLoading({
      mask: true,
      title: '提交中...'
    })
    let user_id = wx.getStorageSync('userId'),
      {
        body,
        switchChecked,
        coupon,
        Address,
        invoice
      } = this.data,
      is_deduction = switchChecked ? 1 : 0,
      user_coupon_id = coupon.length > 0 ? coupon.id : 0,
      invoice_id = invoice ? invoice.id : 0;
    let datas = [];
    datas.push('user_id=' + user_id);
    datas.push('user_coupon_id=' + user_coupon_id);
    datas.push('is_deduction=' + is_deduction);
    datas.push('invoice_id=' + invoice_id);
    datas.push('sign=' + getSign(`user_id=${user_id}&user_coupon_id=${user_coupon_id}&is_deduction=${is_deduction}&invoice_id=${invoice_id}`))
    PostSubmitOrder({
      body: {
        glist: body,
        name: Address.userName,
        province: Address.provinceName,
        city: Address.cityName,
        area: Address.countyName,
        address: Address.provinceName + Address.cityName + Address.countyName + Address.detailInfo,
        mobile: Address.telNumber
      }
    }, datas).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.hideLoading()
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },

  //积分规则
  getPointRule() {
    GetPointRule({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          MyPoint: res.data.Response
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
  }
})