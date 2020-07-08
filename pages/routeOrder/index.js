// pages/routeOrder/index.js
import { GetMyRouteOrder, RGetCancelRouteOrder,GetCanRouteOrder,getSign } from '../../utils/axios.js';
import utils from '../../utils/util.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recommend :['全部线路','未支付','未游玩','被拒绝','售后'],
    currentTab : 0,
    page : 1,
    pagesize : 10,
    pageflag: false,
    OrderList :[]
  },
  //路由
  //路线详情
  router_homestayorderDetails(e){
    console.log(e.currentTarget.dataset.order_no)
    let id = e.currentTarget.dataset.id,
      rid = e.currentTarget.dataset.rid,
      gid = e.currentTarget.dataset.gid;
    wx.navigateTo({
      url: '../routeOrderDetails/index?id='+id + '&rid=' + rid +'&gid=' + gid,
    })
  },
  //申请售后
  router_applyAgain(e){
    let that = this;
    let order_id = e.currentTarget.dataset.id,
      order_goods_id = e.currentTarget.dataset.rid,
    money = e.currentTarget.dataset.price;
    wx.navigateTo({
      url: '../applyForSale/index?order_id=' + order_id + '&order_goods_id=' + order_goods_id + '&money=' + money + '&type=3',
    })
  },
  //事件
  //tab切换
  nav_tab(e){
    this.setData({
      page : 1,
      pageflag : false,
      OrderList : [],
      currentTab : e.target.dataset.index
    })
    this.getMyRouteOrder();
  },
  //取消订单
  cancelOrder(e){
    let that = this;
    let id = e.currentTarget.dataset.id,
    data = {};
    data.user_id = wx.getStorageSync('userId');
    data.order_id = id;
    data.sign = getSign(`user_id=${wx.getStorageSync('userId')}&order_id=${id}`)
    wx.showLoading({
      title: '订单取消中...',
    })
    that.getCanRouteOrder(data, res => {
      wx.hideLoading()
      that.setData({
        pageflag : false
      })
      that.getMyRouteOrder();
    })
  },
  //支付
  payment(e){
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
      that.setData({
        currentTab : 0,
        pageflag :false
      })
      that.getMyRouteOrder();
    })
  },
  //取消退款
  cancelRefund(e){
    console.log(e);
    let that = this;
    let rid = e.currentTarget.dataset.rid,
    id = e.currentTarget.dataset.id,
    data = {};
    data.user_id = wx.getStorageSync('userId');
    data.order_id = id;
    data.return_order_id = rid;
    data.sign = getSign(`user_id=${wx.getStorageSync('userId')}&order_id=${id}&return_order_id=${rid}`)
    wx.showLoading({
      title: '加载中...',
    })
    that.getCancelRouteOrder(data,res=>{
      wx.hideLoading()
      that.setData({
        pageflag : false
      })
      that.getMyRouteOrder();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.index){
      this.setData({
        currentTab : options.index
      })
    }
    this.getMyRouteOrder();
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
    let that = this;
    that.setData({
      pageflag : true,
      page: that.data.page + 1
    })
    that.getMyRouteOrder()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API  */
  //我的路线
  getMyRouteOrder(){
    let user_id = wx.getStorageSync('userId'),
      { page, pagesize, currentTab ,pageflag,OrderList} = this.data,
      type = currentTab==3?8:currentTab==4?6:currentTab;
    GetMyRouteOrder({
      user_id: user_id,
      page: page,
      pagesize: pagesize,
      type: type,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}&type=${type}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr=>{
          if(pageflag){
            OrderList.push(arr)
          }
        })
        if(!pageflag){
          OrderList = res.data.Response
        }
        this.setData({
          OrderList
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  // 取消退款 
  getCancelRouteOrder(data,callback){
    RGetCancelRouteOrder(data).then(res => {
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
  // 路线订单-取消
  getCanRouteOrder(data,callback){
    GetCanRouteOrder(data).then(res => {
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
            this.setData({
              pageflag : false
            })
            this.getMyRouteOrder();
          }
        });
      }
    });
  },
})