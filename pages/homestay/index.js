// pages/homestay/index.js
import { GetHomestayBanner, GetBoutiqueHomestay, GetHomestay,GetReservationTime, GetHomestayNight,getSign} from '../../utils/axios.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',
    banner :[],
    boutique:[],
    recommend: [],
    page : 1,
    pagesize : 10,
  },
  /*路由*/
  //民宿详情
  router_homestayDetails(e) {
    wx.navigateTo({
      url: '../homestayDetails/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //选择城市
  router_city() {
    wx.navigateTo({
      url: '../city/index'
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let city = wx.getStorageSync('city');
    this.setData({
      city : city
    })
    this.getHomestayBanner();  
    this.getBoutiqueHomestay(city);
    this.getHomestay(city)
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
    let newcity = wx.getStorageSync('city');
    let oldcity = this.data.city;
    if(newcity!=oldcity){
      this.setData({
        city : newcity
      })
      this.getBoutiqueHomestay(newcity);
      this.getHomestay(newcity)
    }else{
      console.log(222)
    }
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
  //民宿banner
  getHomestayBanner() {
    GetHomestayBanner({
      rnd : 1,
      sign : getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          banner : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //精品民宿
  getBoutiqueHomestay(city) {
    GetBoutiqueHomestay({
      keywords : city,
      sign : getSign(`keywords=${city}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          boutique : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  //推荐民宿
  getHomestay(city) {
    let {page,pagesize} = this.data;
    GetHomestay({
      keywords : city,
      page : page,
      pagesize : pagesize,
      sign : getSign(`keywords=${city}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          recommend : res.data.Response
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

})