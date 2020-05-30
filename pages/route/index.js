// pages/route/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchIdx : 0
  },
  /*路由*/
  //路线详情
  router_routeDetalis(e){
    wx.navigateTo({
      url: '../routeDetalis/index?id='+e.currentTarget.dataset.id,
    })
  },
  /*事件*/
  switch(e){
    let that = this;
    that.setData({
      switchIdx : e.currentTarget.dataset.index,
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