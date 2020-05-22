// pages/Feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemImgs: [],
    problemVal :'',
    telVal : '',
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
  //文本框失焦
  TextAreaBlur(e){
    let that = this;
    that.setData({
      problemVal : e.detail.value
    })
  },
  //文本框确认
  TextAreaConfirm(e){
    let that = this;
    that.setData({
      problemVal : e.detail.value
    })
  },
  //手机号输入款失焦
  TelBlur(e){
    let that = this;
    that.setData({
      telVal : e.detail.value
    })
  },
  //提交
  submit() {

  },
  //清空手机号
  teldel(){
    let that = this;
    that.setData({
      telVal : ''
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