// pages/routeDetalis/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current :0,
  },
  /*路由*/
  //分享
  router_routeSubmitOrder(e){
    wx.navigateTo({
      url: '../routeSubmitOrder/index?id='+e.currentTarget.dataset.id,
    })
  },
  /*事件*/
  //轮播图
  swiperChange: function (e) {
    var that = this;
    that.setData({
      current: e.detail.current
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