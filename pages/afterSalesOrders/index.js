// pages/afterSalesOrders/index.js
import { GetMyRefoundOrder, RGetCanCelOrder, getSign} from '../../utils/axios.js';
var utils = require('../../utils/util.js');
const app = getApp()
Page({
  data: {
    recommend: ['全部', '退款中', '退款成功', '退款失败'],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    type: 0,
    page: 1,
    pagesize: 10,
    orderList: [],
    pageflag :false
  },
  /**路由 */
  //订单详情
  router_afterSalesOrderDetails(e) {
    wx.navigateTo({
      url: '../afterSalesOrderDetails/index?id=' + e.currentTarget.dataset.id +'&order_id=' + e.currentTarget.dataset.order_id,
    })
  },
  //重新申请
  router_applyAgain(e) {
    let that = this;
    let order_id = e.currentTarget.dataset.id,
    order_goods_id = e.currentTarget.dataset.gid;
    wx.navigateTo({
      url: '../applyForSale/index?order_id=' + order_id + '&order_goods_id=' + order_goods_id,
    })
  },
  /**事件 */
  // tab切换逻辑
  nav_tab: function (e) {
    let that = this;
    that.setData({
      page : 1,
      pageflag : false,
      MyOrder : [],
      currentTab: e.target.dataset.index
    })
    that.getMyRefoundOrder();
  },
  //取消申请
  cancelOrder(e){
    let that = this;
    that.getCanCelOrder(e.currentTarget.dataset.id,res=>{
      that.setData({
        pageflag : false
      })
      that.getMyRefoundOrder();
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
    this.getMyRefoundOrder();
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
      pageflag :true,
      page: that.data.page + 1
    })
    that.getMyRefoundOrder()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**API */
  //售后订单
  getMyRefoundOrder() {
    let user_id = wx.getStorageSync('userId'),
      { page, pagesize ,currentTab,pageflag,orderList} = this.data;
    GetMyRefoundOrder({
      user_id: user_id,
      page: page,
      pagesize: pagesize,
      type :currentTab,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}&type=${currentTab}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr=>{
          if(pageflag){
            orderList.push(arr)
          }
        })
        if(!pageflag){
          orderList=res.data.Response
        }
        this.setData({
          orderList
        })
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


})