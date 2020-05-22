// pages/addAddress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addAddressId : 0,
    address : ''
  },
  /*路由*/
  //返回上一页
  router_back(){
    wx.navigateBack({
      delta: 1
    })
  },
  /*事件*/
  //省市区选择
  bindRegionChange(e){
    let that = this;
    console.log(e.detail);
    that.setData({
      address : e.detail.value.join('')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        addAddressId : options.id,
      })
    }
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