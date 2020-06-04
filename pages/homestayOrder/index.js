// pages/homestayOrder/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend :['全部民宿','待支付','未住宿','被拒绝','退款'],
    currentTab : 0,
  },
  //路由
  router_homestayorderDetails(e){
    console.log(e.currentTarget.dataset.order_no)
    wx.navigateTo({
      url: '../homestayorderDetails/index?order_no='+e.currentTarget.dataset.order_no,
    })
  },
  //事件
  nav_tab(e){
    this.setData({
      currentTab : e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTab : options.index
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})