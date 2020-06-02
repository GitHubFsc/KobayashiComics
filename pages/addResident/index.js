// pages/addOccupants/index.js
import {
  GetCertificateType,
  GetAddHomestayInformation,
  getSign,
} from '../../utils/axios.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    name: '',
    category_id: '',
    number: '',
    typeid : '选择证件类型'
  },

  /**路由 */
  router_back() {
    let that = this;
    that.getAddHomestayInformation(res=>{
      console.log(res);
      wx.navigateBack({
        delta: 1
      })
    })
  },
  /**事件 */
  nameVal(e) {
    this.setData({
      name: e.detail.value
    })
  },
  Category(e) {
    let category = this.data.category;
    this.setData({
      category_id: category[e.detail.value].id,
      typeid : category[e.detail.value].title
    })
  },
  numberVal(e) {
    this.setData({
      number: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCertificateType();
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
  /**API */
  //证件类型
  getCertificateType() {
    GetCertificateType({
      rnd: 1,
      sign: getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode==0) {
        let category = res.data.Response;
        let array = res.data.Response.map(arr=>{
          return arr.title
        })
        console.log(array)
        this.setData({
          array,
          category,
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none'
        })
      }
    })
  },
  //添加入住人信息g
  getAddHomestayInformation(callback) {
    let user_id = wx.getStorageSync('userId');
    let { name, category_id, number } = this.data;
    GetAddHomestayInformation({
      user_id: user_id,
      name: name,
      category_id: category_id,
      number: number,
      sign: getSign(`user_id=${user_id}&name=${name}&category_id=${category_id}&number=${number}`)
    }).then(res => {
      if (res.data.ErrCode==0) {
        console.log(res)
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})