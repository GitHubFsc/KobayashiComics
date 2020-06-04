// pages/shoppingVoucher/index.js
import { GetMyCouponList, getSign } from '../../utils/axios.js';
import utils from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    CouponList: [],
    page: 1,
    pagesize: 10
  },
  /**事件 */
  //tab切换
  nav_tab(e) {
    let that = this;
    that.setData({
      page: 1,
      CouponList: [],
      currentTab: e.target.dataset.index
    })
    that.getMyCouponList()
  },
  //使用优惠券
  useCoupon(e){
    let that = this,
    {currentTab,CouponList} = that.data;
    if(currentTab==0){
      let Coupon = CouponList[e.target.dataset.index];
      wx.setStorageSync('Coupon', Coupon)
      wx.navigateBack({
        delta: 1
      })
    }else{
      wx.showToast({
        title: currentTab==2?'您选择的优惠券已过期':'您选择的优惠券已使用' ,
        icon: "none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCouponList();
  },
  /**API */
  //我的优惠券 
  getMyCouponList() {
    let user_id = wx.getStorageSync('userId');
    let { currentTab, page,  pagesize } = this.data;
    GetMyCouponList({
      user_id: user_id,
      type: currentTab,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${user_id}&type=${currentTab}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        res.data.Response.map(item=>{
          item.coupon_end_timespan = utils.ymr(Number(item.coupon_end_timespan));
        })
        this.setData({
          CouponList: res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
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
    console.log(122)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})