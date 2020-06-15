// pages/invoice/index.js
import {getSign,GetMyInvoice,GetDefaultInvoice,GetDelInvoice} from '../../utils/axios.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MyInvoiceList: [],
    page: 1,
    pagesize: 10,
    selected : null,
    getfp : false
  },
  //路由
  //新增发票
  router_addinvoice(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '../addinvoice/index?id=' + e.currentTarget.dataset.id + '&type=' + e.currentTarget.dataset.type,
      })
    } else {
      wx.navigateTo({
        url: '../addinvoice/index',
      })
    }
  },
  /**事件 */
  //设为默认
  select(e){
    let that = this;
    console.log(e);
    let id = e.currentTarget.dataset.id,MyInvoiceList = that.data.MyInvoiceList;
    let Invoice = MyInvoiceList.map(arr=>{
      return arr.id == id;
    })
    wx.setStorageSync('Invoice', Invoice);
    that.setData({
      getfp : false
    })
    that.getDefaultInvoice(e.currentTarget.dataset.id,res=>{
      console.log(res);
      that.getMyInvoice();
    })
  },
  //删除
  del(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      getfp : false
    })
    that.getDelInvoice(id,res=>{
      console.log(res);
      that.getMyInvoice();
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
    this.getMyInvoice()
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
    let that = this;
    that.setData({
      page: that.data.page + 1,
      getfp : true
    })
    that.getMyInvoice()
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
  //获取我的发票
  getMyInvoice() {
    let user_id = wx.getStorageSync('userId');
    let { page, pagesize ,getfp,MyInvoiceList} = this.data;
    GetMyInvoice({
      user_id: user_id,
      page: page,
      pagesize: pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        res.data.Response.map(arr=>{
          if(arr.is_default==1){
            wx.setStorageSync('Invoice', arr);
          }
          if(getfp){
            MyInvoiceList.push(arr)
          }
        })
        if(!getfp){
          MyInvoiceList = res.data.Response;
        }
        this.setData({
          MyInvoiceList
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //设置默认发票
  getDefaultInvoice(id , callback){
    let user_id = wx.getStorageSync('userId');
    GetDefaultInvoice({
      user_id: user_id,
      invoice_id : id,
      sign: getSign(`user_id=${user_id}&invoice_id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //删除发票
  getDelInvoice(id , callback){
    let user_id = wx.getStorageSync('userId');
    GetDelInvoice({
      user_id: user_id,
      invoice_id : id,
      sign: getSign(`user_id=${user_id}&invoice_id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
})