// pages/homepage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id : 0,
    type : 0, 
    recommend : ['我的资讯','我的评论','浏览历史'],
    currentTab : 0
  },
  /*路由*/
  //更多回复
  router_reply(e){
    wx.navigateTo({
      url: '../reply/index?id='+ e.currentTarget.dataset.id,
    })
  },
  //社区详情
  router_communityDetails(e){
    wx.navigateTo({
      url: '../communityDetails/index?id='+e.currentTarget.dataset.index,
    })
  },
  /*事件*/
  //导航栏切换
  nav_tab(e){
    this.setData({
      currentTab : e.target.dataset.index
    })
  },
  //关注
  attention(e){
    console.log(e.currentTarget.dataset.id)
  },
  //删除咨询
  communityDel(e){
    console.log(e.currentTarget.dataset.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type==0){
      console.log("我的主页")
    }else{
      console.log("他人主页")
    }
    this.setData({
      user_id : options.id,
      type : options.type,
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