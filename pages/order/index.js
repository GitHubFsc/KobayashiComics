// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend :['全部','待付款','待发货','待收货','待评价'],
    currentTab : 0,
  },
  //路由
  router_orderDetails(e){
    console.log(e.currentTarget.dataset.order_no)
    wx.navigateTo({
      url: '../orderDetails/index?order_no='+e.currentTarget.dataset.order_no,
    })
  },
  //查看物流
  router_Logistics(e){
    wx.navigateTo({
      url: '../Logistics/index?order_no='+e.currentTarget.dataset.order_no,
    })
  },
  //评价
  router_Evaluation(e){
    wx.navigateTo({
      url: '../Evaluation/index?order_no='+e.currentTarget.dataset.order_no,
    })
  },
  /**事件*/
  nav_tab(e){
    this.setData({
      currentTab : e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})