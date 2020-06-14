// pages/personalInformation/index.js
import {getSign,PostSetinfo,GetMyHomePage,PostUploadFile} from '../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    mobile: '',
    date: '',
    selected: true,
    user_img: './../images/userimg2.png'
  },
  /*事件*/
  //昵称失焦
  nickname(e){
    this.setData({
      nickname : e.detail.value
    })
  },
  //号码失焦
  mobile(e){
    this.setData({
      mobile : e.detail.value
    })
  },
  //选择日期
  bindDateChange(e) {
    let that = this;
    that.setData({
      date: e.detail.value
    })
  },
  //选择性别
  selected(e) {
    let that = this;
    if (e.currentTarget.dataset.index == 0) {
      that.setData({
        selected: true
      })
    } else {
      that.setData({
        selected: false
      })
    }
  },
  //修改头像
  modify() {
    let that = this;
    let user_img = that.data.user_img;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        wx.uploadFile({
          url: 'https://xiaolinmanhua.zztv021.com/api/Lib/PostUploadFile?rnd=1&sign=' + getSign(`rnd=1`),
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {},
          success(res) {
            let data = JSON.parse(res.data);
            if(data.ErrCode == 0){
              that.setData({
                user_img : data.Response
              })
            } else {
              wx.showToast({
                title: data.ErrMsg,
                icon: 'none'
              })
            }
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //保存
  save(){
    let openid = wx.getStorageSync('openid');
    let user_id = wx.getStorageSync('userId');
    let {nickname,mobile,date,selected,user_img} = this.data
    let userInfo = wx.getStorageSync('userInfo');
    let datas = [];
    datas.push("user_id="+user_id)
    datas.push('sign='+getSign(`user_id=${user_id}`))
    PostSetinfo({
      body: {
        nickname : nickname,
        avatar : user_img,
        sex : selected?1:2,
        mobile : mobile,
        openid: openid,
        birthday : new Date(date).getTime()
      }
    },datas).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res)
        userInfo.nickname = nickname;
        userInfo.avatar = user_img;
        userInfo.sex = selected?1:2;
        userInfo.mobile = mobile;
        userInfo.openid = openid;
        userInfo.birthday = new Date(date).getTime();
        wx.setStorageSync('userInfo', userInfo)
        wx.switchTab({
          url: './../my/index'
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo'),
    mobile = wx.getStorageSync('phoneNumber');
    if (userInfo) {
      this.setData({
        user_img: userInfo.avatarUrl,
        mobile : mobile,
        selected: userInfo.gender == 1 ? true : false
      })
      this.getMyHomePage()
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

  },
  //获取用户信息
  getMyHomePage(){
    let user_id =  wx.getStorageSync('userId')
    GetMyHomePage({
      user_id: user_id,
      sign: getSign(`user_id=${user_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          nickname : res.data.Response.nickname,
          user_img : res.data.Response.avatar,
        })
        wx.hideLoading()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
})