// pages/mall/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Carousel :[1,2],
  },
  //路由
  //农家特产等
  router_mallList(e){
    wx.navigateTo({
      url: '../mallList/index?index='+ e.currentTarget.dataset.index,
    })
  },
  router_search(){
    wx.navigateTo({
      url: '../search/index'
    })
  },
  //消息
  router_news(){
    wx.switchTab({
      url: '../news/index'
    })
  },
  //商品详情
  router_productDetails(e){
    wx.navigateTo({
      url: '../productDetails/index?id='+ e.currentTarget.dataset.id,
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