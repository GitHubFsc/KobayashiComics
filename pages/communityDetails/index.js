// pages/referralDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:''
  },
  /*路由*/
  //他人主页
  router_homepage(e){
    wx.navigateTo({
      url: '../homepage/index?id='+ e.currentTarget.dataset.id+'&type='+e.currentTarget.dataset.type,
    })
  }, 
  //商品链接
  router_productDetails(e){
    wx.navigateTo({
      url: '../productDetails/index?id='+ e.currentTarget.dataset.id,
    })
  },
  //更多回复
  router_reply(e){
    wx.navigateTo({
      url: '../reply/index?id='+ e.currentTarget.dataset.id,
    })
  },
  //更多评论
  router_commen(e){
    wx.navigateTo({
      url: '../commen/index?id='+ e.currentTarget.dataset.id,
    })
  },
  //社区详情
  router_communityDetails(e){
    wx.navigateTo({
      url: '../communityDetails/index?id='+e.currentTarget.dataset.index,
    })
  },
  //分享
  router_dynamic(e){
    wx.navigateTo({
      url: '../dynamic/index?id='+e.currentTarget.dataset.index,
    })
  },
  /*事件*/
  //关注
  attention(e){
    console.log(1213)
  },
  //评论
  getValue(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  comment(){
    console.log(this.data.inputValue)
  },
  //点赞
  like(e){
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