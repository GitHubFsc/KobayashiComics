// pages/homestayOrder/index.js
import { GetMyHomestayOrder, GetCancelHomestayOrder, GetCancelRouteOrder,  getSign} from "../../utils/http"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend: ['全部民宿', '待支付', '未住宿', '被拒绝', '退款'],
    currentTab: 0,
    OrderList :[],
  },
  //路由
  //民宿订单详情
  router_homestayorderDetails(e) {
    console.log(e.currentTarget.dataset.order_no)
    wx.navigateTo({
      url: '../homestayorderDetails/index?order_no=' + e.currentTarget.dataset.order_no,
    })
  },
  //申请退款
  router_applyAgain(e) {
    let that = this;
    let order_id = that.data.order_id,
      order_goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../applyForSale/index?order_id=' + order_id + '&order_goods_id=' + order_goods_id + '&type=2',
    })
  },
  //事件
  //tab 切换
  nav_tab(e) {
    this.setData({
      currentTab: e.target.dataset.index
    })
  },
  //取消订单
  cancelOrder(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.getCanCelOrder(id, res => {
      that.getOrderDetail();
    })
  },
  //付款
  payment(e) {
    let that = this;
    let data = {};
    data.order_no = that.data.MyOrder.order_no,
      data.price = that.data.MyOrder.price;
    console.log(data);
    wx.showLoading({
      mask: true,
      title: '提交中...'
    })
    // that.postWeChatPay(data, res => {
    //   that.getMyHomestayOrder();
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab: options.index
    })
    this.getMyHomestayOrder()
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
  //我的民宿订单
  getMyHomestayOrder() {
    let user_id = wx.getStorageSync('user_id'),
      { page, pagesize, currentTab } = this.data;
    GetMyHomestayOrder({
      user_id: user_id,
      page: page,
      pagesize: pagesize,
      type: currentTab,
      sign: getSign(`user_id=${usre_id}&page=${page}&pagesize=${pagesize}&type=${currentTab}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          OrderList: res.data.Response
        })
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
    let user_id = wx.getStorageSync('user_id');
    GetCancelHomestayOrder({
      user_id: user_id,
      order_id: id,
      sign: getSign(`user_id=${usre_id}&order_id=${id}`)
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
    let user_id = wx.getStorageSync('user_id');
    GetCancelRouteOrder({
      user_id: user_id,
      order_id: id,
      return_order_id: rid,
      sign: getSign(`user_id=${usre_id}&order_id=${id}&return_order_id=${rid}`)
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