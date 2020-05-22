// pages/commen/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue :''
  },
  /*路由*/
  //更多回复
  router_reply(e){
    wx.navigateTo({
      url: '../reply/index?id='+ e.currentTarget.dataset.id,
    })
  },
  /*事件*/
  //评论
  getValue(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //点赞
  like(e) {
    console.log(e)
  },
  //确定
  define(e){
    console.log(e)
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