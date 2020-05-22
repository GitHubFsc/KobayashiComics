// pages/personalInformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date : '',
    selected : true,
    user_img : './../images/userimg2.png'
  },
  /*事件*/
  bindDateChange(e){
    let that = this;
    that.setData({
      date : e.detail.value
    })
  },
  selected(e){
    let that = this;
    if(e.currentTarget.dataset.index==0){
      that.setData({
        selected : true
      })
    }else{
      that.setData({
        selected : false
      })
    }
  },
  modify(){
    let that = this;
    let user_img = that.data.user_img;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        user_img = res.tempFilePaths;
        that.setData({
          user_img
        })
      },
      fail(res){
        console.log(res)
      }
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