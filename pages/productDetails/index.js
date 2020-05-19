// pages/productDetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current :0,
    colorIdx: null,
    sizeIdx :null,
    num : 1,
    popUpLayerflag : true,
    collectLflag :false,
    pul_confirm : false
  },
  /*路由*/
  //分享
  router_dynamic(e){
    wx.navigateTo({
      url: '../dynamic/index?id='+e.currentTarget.dataset.id,
    })
  },
  //客服
  router_service(e){
    wx.navigateTo({
      url: '../dynamic/index?id='+e.currentTarget.dataset.id,
    })
  },
  //购物车
  router_shoppingcart(){
    wx.navigateTo({
      url: '../shoppingcart/index',
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
  //收藏
  collectL(e){
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    that.setData({
      collectLflag: !that.data.collectLflag
    })
  },
  //规格弹框
  popUpLayer(e){
    var that = this;
    let flag = false;
    if(e.currentTarget.dataset.type){
      flag = false
    }else{
      flag = true
    }
    that.setData({
      pul_confirm : flag,
      popUpLayerflag: !that.data.popUpLayerflag
    })
  },
  //选择颜色
  color(e){
    var that = this;
    that.setData({
      colorIdx: e.currentTarget.dataset.index
    })
  },
  //选择尺寸
  size(e){
    var that = this;
    that.setData({
      sizeIdx: e.currentTarget.dataset.index
    })
  },
  //改变数量
  Update_num(e){
    var that = this;
    let num = that.data.num;
    if(e.currentTarget.dataset.index==1){
      num <= 1 ? num = 1 : num--
    }else{
      num++
    }
    that.setData({
      num
    })
  },
  //确认 加入购物车/立即购买
  confirm(e){
    let that = this;
    if(that.data.pul_confirm){
      console.log("加入购物车")
    }else{
      wx.navigateTo({
        url: '../productSubmitOrder/index?id='+e.currentTarget.dataset.id,
      })
    }
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