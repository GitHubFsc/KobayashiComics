// pages/Feedback/index.js
import { PostAddFeedback, PostUploadFile, getSign,} from '../../utils/axios.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    problemImgs: [],
    problemVal: '',
    telVal: '',
  },
  /*事件*/
  //上传图片
  addImg() {
    let that = this;
    let problemImgs = that.data.problemImgs,
      imgArr = [];
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        res.tempFilePaths.map(item => {
          imgArr.push({
            img_url: item
          })
        })
        console.log(imgArr);
        for (let i = 0; i < imgArr.length; i++) {
          console.log(imgArr[i].img_url);
          wx.uploadFile({
            url: 'https://xiaolinmanhua.zztv021.com/api/Lib/PostUploadFile?rnd=1&sign=' + getSign(`rnd=1`),
            filePath: imgArr[i].img_url,
            name: 'file',
            formData: {},
            success(res) {
              var p = JSON.parse(res.data);
              console.log(p)
              if (p.ErrCode == 0) {
                problemImgs.push({
                  img_url: p.Response
                })
                console.log("problemImgs", problemImgs);
                that.setData({
                  problemImgs
                })
              } else {
                wx.showToast({
                  title: p.ErrMsg,
                  icon: 'none'
                })
              }
            }
          })
        }
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
  //手机号输入款失焦
  TelBlur(e) {
    let that = this;
    that.setData({
      telVal: e.detail.value
    })
  },
  //提交
  submit() {
    let that = this;
    that.postAddFeedback(res => {
      console.log(res);
      wx.showToast({
        title: res.data.ErrMsg,
        icon: 'none'
      })
      wx.navigateBack({
        delta: 1
      })
    })
  },
  //清空手机号
  teldel() {
    let that = this;
    that.setData({
      telVal: ''
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

  },
  //提交反馈
  postAddFeedback(callback) {
    let user_id = wx.getStorageSync('userId');
    let {
      problemImgs,
      problemVal,
      telVal
    } = this.data;
    if (!problemVal) {
      wx.showToast({
        title: '请输入您要反馈的问题',
        icon: 'none',
      })
      return false;
    }
    if (!telVal) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
      })
      return false;
    }
    let img_url = [];
    if (problemImgs.length > 0) {
      img_url = problemImgs.map(res => {
        return res.img_url;
      })
    }
    console.log(img_url)
    let datas = [];
    datas.push('user_id=' + user_id)
    datas.push('sign=' + getSign(`user_id=${user_id}`))
    PostAddFeedback({
      body: {
        content: problemVal,
        img_url: img_url,
        mobile: telVal
      }
    }, datas).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none'
        })
      }
    })
  }
})