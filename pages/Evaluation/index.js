// pages/Evaluation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemImgs: [],
    problemVal: '',
    order_no: '',
    LitUp: 0,
    Unlit: 5,
    submit :true
  },
  /*路由*/
  //返回首页
  router_home(){
    wx.switchTab({
      url: '../index/index'
    })
  },
  /*事件*/
  //上传图片
  addImg() {
    let that = this;
    let problemImgs = that.data.problemImgs;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        res.tempFilePaths.map(item => {
          problemImgs.push({
            img_url: item
          })
        })
        that.setData({
          problemImgs
        })
      }
    })

  },
  //图片预览
  previewImage(e) {
    let that = this;
    let problemImgs = that.data.problemImgs.map(item => {
      return item.img_url;
    })
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: problemImgs // 需要预览的图片http链接列表
    })
  },
  //删除图片
  delete(e) {
    let that = this;
    let problemImgs = that.data.problemImgs;
    problemImgs.splice(e.currentTarget.dataset.index, 1);
    that.setData({
      problemImgs
    })
  },
  //文本框失焦
  TextAreaBlur(e) {
    let that = this;
    that.setData({
      problemVal: e.detail.value
    })
  },
  //文本框确认
  TextAreaConfirm(e) {
    let that = this;
    that.setData({
      problemVal: e.detail.value
    })
  },
  //评价星星
  star(e) {
    let that = this;
    let LitUp = that.data.LitUp;
    let Unlit = that.data.Unlit;
    let num = e.currentTarget.dataset.index;
    if (e.currentTarget.dataset.type == 0) {
      LitUp = num - 1
      Unlit = 5 - LitUp
    } else {
      LitUp = num + LitUp
      Unlit = 5 - LitUp
    }
    that.setData({
      LitUp,
      Unlit
    })
  },
  //提交
  submit() {
    let that = this;
    that.setData({
      submit :false
    })
  },
  //
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.order_no) {
      this.setData({
        order_no: options.order_no
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