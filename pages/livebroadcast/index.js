// pages/livebroadcast/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityFlag : true
  },
  /**路由 */
  //商品链接
  router_productDetails(e){
    wx.navigateTo({
      url: '../productDetails/index?id='+ e.currentTarget.dataset.id,
    })
  },
  /**事件 */
  //打开+关闭商品列表
  commodity(){
    let that = this;
    that.setData({
      commodityFlag : !that.data.commodityFlag
    })
  },
  //分享
  share(e){
    let that = this;
    console.log(e);
  },
  //点赞
  like(e){
    let that = this;
    console.log(e);
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