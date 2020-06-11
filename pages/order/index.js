import { GetMyOrder, GetOrderSign, GetCanCelOrder,  getSign } from '../../utils/axios.js';


// pages/order/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend: ['全部', '待付款', '待发货', '待收货', '待评价'],
    currentTab: 0,
    steps: 3,
    loading: false,
    page: 1,
    pagesize: 10,
  },
  //路由
  //订单详情
  router_orderDetails(e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../orderDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //付款
  router_payment(e) {
    let that = this;
    let data ={};
    data.order_no = e.currentTarget.dataset.order_no,
    data.price = e.currentTarget.dataset.price;
    console.log(data);
    wx.showLoading({
      mask: true,
      title: '提交中...'
    })
    that.postWeChatPay(data,res=>{
      that.getMyOrder();
    })
    // wx.navigateTo({
    //   url: '../productSubmitOrder/index?order_no=' + e.currentTarget.dataset.order_no,
    // })
  },
  //查看物流
  router_Logistics(e) {
    wx.navigateTo({
      url: '../Logistics/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //评价
  router_Evaluation(e) {
    let that = this;
    console.log(e.currentTarget.dataset)
    let data = [],
      arr = e.currentTarget.dataset.arr,
      order_no = e.currentTarget.dataset.order_no;
    arr.map(res => {
      data.push({
        order_goods_id: res.id,
        goods_img_url: res.goods_img_url,
        goods_name: res.goods_name,
        sku_parameter_type_title: res.sku_parameter_type_title,
        size_title: res.size_title,
        sku_price: res.sku_price,
        content: '',
        img_url: [],
        LitUp: 0,
        Unlit: 5,
      })
    })
    wx.navigateTo({
      url: '../Evaluation/index?data=' + JSON.stringify(data) + '&order_no=' + order_no,
    })
  },
  /**事件*/
  //tab切换
  nav_tab(e) {
    this.setData({
      currentTab: e.target.dataset.index
    })
    this.getMyOrder()
  },
  //取消订单
  cancelOrder(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.getCanCelOrder(id, res => {
      that.getMyOrder();
    })
  },
  //订单签收
  OrderSign(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.getOrderSign(id, res => {
      that.getMyOrder();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      this.setData({
        steps: 3,
        currentTab: options.index ? options.index : 0
      })
      this.getMyOrder()
    } else {
      this.setData({
        steps: 0,
        currentTab: options.index ? options.index : 0
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
        this.getMyOrder()
      }
    })
  },
  //我的订单
  getMyOrder() {
    let user_id = wx.getStorageSync('userId');
    let {
      currentTab,
      page,
      pagesize
    } = this.data;
    GetMyOrder({
      user_id: user_id,
      type: currentTab,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${user_id}&type=${currentTab}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
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