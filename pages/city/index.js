// pages/city/index.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var city = require('../../libs/city.js');
var qqmapsdk = new QQMapWX({
  key: 'H6VBZ-KIL6K-JC2JD-AMD4R-3FXI5-DMFDF'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    cityData: {},
    _py: ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"],
    hidden: true,
    showPy: 'A',
    scrollTopId:'A',
    city : '上海市',
    location:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
  },
  //使用经纬度获取城市名
  getLocation() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log('当前所在城市数据：', res);
            //address 城市
            that.setData({
              address: res.result.address_component.city,
              cityData: city.all
            })
          }
        });
      }
    })
  },
  //获取城市列表
  // getCityList() {
  //   let that = this;
  //   //调用获取城市列表接口
  //   qqmapsdk.getCityList({
  //     success: function (res) { //成功后的回调
  //       //console.log('城市数据：', res.result[1]); //打印城市数据
  //       that.setData({
  //         cityData: city.all
  //       })
  //     },
  //     fail: function (error) {
  //       console.error(error);
  //     },
  //     complete: function (res) {
  //       console.log(res);
  //     }
  //   });
  // },
  //选择定位城市
  positionCity(){
    let city = this.data.city;
    wx.setStorageSync('city', city);
    wx.navigateBack({
      delta: 1
    })
  },
  //选择城市
  selectCity: function (e) {
    var dataset = e.currentTarget.dataset;
    this.setData({
      city: dataset.fullname,
      location: {
        latitude: dataset.lat,
        longitude: dataset.lng
      }
    });
    wx.setStorageSync('city', dataset.fullname);
    wx.navigateBack({
      delta: 1
    })
  },
  //获取文字信息
  getPy: function (e) {
    this.setData({
      hidden: false,
      showPy: e.target.id,
    })
  },

  setPy: function (e) {
    this.setData({
      hidden: true,
      scrollTopId: this.data.showPy
    })
  },
  //滑动选择城市
  tMove: function (e) {
    var y = e.touches[0].clientY,
      offsettop = e.currentTarget.offsetTop;

    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      var num = parseInt((y - offsettop) / 12);
      this.setData({
        showPy: this.data._py[num]
      })
    };
  },
  //触发全部开始选择
  tStart: function () {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd: function () {
    this.setData({
      hidden: true,
      scrollTopId: this.data.showPy
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