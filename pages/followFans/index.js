// pages/followFans/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /*路由*/
  //他人主页
  router_homepage(e){
    wx.navigateTo({
      url: '../homepage/index?id='+ e.currentTarget.dataset.id+'&type=1',
    })
  }, 
  /*事件*/
  unsubscribe(e){
    console.log("取消关注", e.currentTarget.dataset.id)
  },
  attention(e){
    console.log("关注", e.currentTarget.dataset.id)
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.type == 0? "关注":"粉丝"
    })
    this.setData({
      type : options.type
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