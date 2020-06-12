// pages/applyForSale/index.js
import { GetRefoundMoney, GetRefoundType,GetCateGoryList, PostOrderRefound, PostHomestayReturnOrder,PostRouteOrder,getSign } from '../../utils/axios.js';
var utils = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_no: null,
    Money: 0,
    refund_voucher: [],
    boolean: false,
    refund: false,
    reason_text: '',
    reason_reason: '',
    refund_type: '',
    refund_reason_id: '',
    ImgList : [],
    amount: "",
    refund_instruction: "",
    refundReasonList: [],
    type : 1,
  },

  /**事件 */
  //文件上传
  file() {
    let that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        wx.showLoading({
          title: '文件上传中...',
        })
        that.postUploadFile(res.tempFilePaths,res=>{
          wx.hideLoading();
        });
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  //图片预览
  preview(e) {
    let ImgList = this.data.ImgList.map((x) => {
      return x.img_url
    })
    console.log(ImgList);
    wx.previewImage({
      current: e.target.dataset.src,
      urls: ImgList
    })
  },
  //关闭抽屉
  boxdialog() {
    this.setData({
      boolean: false
    })
  },
  //处理抽屉
  boxdialog_bottom() {
    this.setData({
      boolean: true
    })
  },
  //原因 类型 抽屉
  refund(e) {
    console.log(e);
    this.setData({
      boolean: true
    })
    if (e.currentTarget.dataset.type == "type") {
      this.setData({
        refund: true
      })
    } else {
      this.setData({
        refund: false
      })
    }
  },
  //退款类型选择
  onlytype(e) {
    this.setData({
      refund_type: e.target.dataset.id,
      reason_text: e.target.dataset.text,
      boolean: false
    })
  },
  //退款原因选择
  notOnlytype(e) {
    this.setData({
      refund_reason_id: e.target.dataset.id,
      reason_reason: e.target.dataset.text,
      boolean: false
    })
  },
  //退款金额失焦
  refundAmount(e) {
    this.setData({
      amount: e.detail.value
    })
  },
  //退款说明
  bindTextAreaBlur(e) {
    this.setData({
      refund_instruction: e.detail.value
    })
  },
  //申请退款
  ApplyForRefund(){
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    if(that.data.type==1){
      that.postOrderRefound(res=>{
        wx.hideLoading();
        wx.redirectTo({
          url: '../afterSalesOrders/index?index=4',
        })
      })
    }else if(that.data.type==2){
      that.postHomestayReturnOrder(res=>{
        wx.hideLoading();
        wx.redirectTo({
          url: '../homestayOrder/index?index=4',
        })
      })
    }else{
      that.postRouteOrder(res=>{
        wx.hideLoading();
        wx.redirectTo({
          url: '../routeOrder/index?index=4',
        })
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.order_id){
      this.setData({
        order_id: options.order_id,
        order_goods_id : options.order_goods_id,
        Money : options.money?options.money:0,
        type : options.type?options.type:1
      })
      if(options.type){
        this.getCateGoryList()
      }else{
        this.getRefoundType();
        this.getRefoundMoney();
      } 
     
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
  /**API */    
  //获取退款金额
  getRefoundMoney(){
    let user_id = wx.getStorageSync('userId');
    let { order_id,order_goods_id } = this.data;
    GetRefoundMoney({
      user_id: user_id,
      order_id : order_id,
      order_goods_id : order_goods_id,
      sign : getSign(`user_id=${user_id}&order_id=${order_id}&order_goods_id=${order_goods_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          Money: res.data.Response.pay_money
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //申请退款-退款类型/退款原因 商品
  getRefoundType(){
    GetRefoundType({
      rnd :1,
      sign : getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          reason_text: res.data.Response.type_list[0].title,
          reason_reason: res.data.Response.reason_list[0].title,
          refund_type: res.data.Response.type_list[0].id,
          refund_reason_id: res.data.Response.reason_list[0].id,
          type_list: res.data.Response.type_list,
          reason_list : res.data.Response.reason_list,
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //申请退款-退款原因 路线 民宿
  getCateGoryList(){
    GetCateGoryList({
      rnd :1,
      sign : getSign(`rnd=1`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          reason_reason: res.data.Response[0].title,
          refund_reason_id: res.data.Response[0].id,
          reason_list : res.data.Response,
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //商品-申请退款
  postOrderRefound(callback){
    let user_id = wx.getStorageSync('userId');
    let {amount,order_id,order_goods_id,refund_type,refund_reason_id,refund_instruction,ImgList} = this.data;
    ImgList = ImgList.map(arr=>{
      return arr.img_url
    })
    if(amount&&refund_instruction){}else{
      wx.hideLoading();
      wx.showToast({
        title: '请输入退款金额或退款原因',
        icon: 'none'
      })
      return false
    }
    let datas = [];
    datas.push('user_id=' + user_id);
    datas.push('money=' + amount);
    datas.push('sign=' + getSign(`user_id=${user_id}&money=${amount}`));
    PostOrderRefound({
      body :{
        order_id : order_id,
        order_goods_id : order_goods_id, 
        type_id : refund_type,
        reason_id : refund_reason_id,
        remark : refund_instruction,
        img_url : ImgList,
      }
    },datas).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.hideLoading();
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none'
        })
      }
    })
  }, 
  //民宿-申请退款
  postHomestayReturnOrder(callback){
    let user_id = wx.getStorageSync('userId');
    let {amount,order_id,order_goods_id,refund_reason_id,refund_instruction} = this.data;
    if(amount&&refund_instruction){}else{
      wx.hideLoading();
      wx.showToast({
        title: '请输入退款金额或退款原因',
        icon: 'none'
      })
      return false
    }
    let datas = [];
    datas.push('user_id=' + user_id);
    datas.push('sign=' + getSign(`user_id=${user_id}`));
    PostHomestayReturnOrder({
      body :{
        order_id : order_id,
        order_goods_id : order_goods_id, 
        price : amount,
        category_id : refund_reason_id,
        remark : refund_instruction,
      }
    },datas).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.hideLoading();
        wx.showToast({
          title: res.data.ErrMsg + '三秒后返回上一页',
          icon: 'none'
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 3000)
      }
    })
  },
  //路线-申请退款
  postRouteOrder(callback){
    let user_id = wx.getStorageSync('userId');
    let {amount,order_id,order_goods_id,refund_reason_id,refund_instruction} = this.data;
    if(amount&&refund_instruction){}else{
      wx.hideLoading();
      wx.showToast({
        title: '请输入退款金额或退款原因',
        icon: 'none'
      })
      return false
    }
    let datas = [];
    datas.push('user_id=' + user_id);
    datas.push('route_order_id=' + order_id);
    datas.push('route_order_detail_id=' + order_goods_id);
    datas.push('sign=' + getSign(`user_id=${user_id}&route_order_id=${order_id}&route_order_detail_id=${order_goods_id}`));
    PostRouteOrder({
      body :{
        money : amount,
        category_id : refund_reason_id,
        remark : refund_instruction,
      }
    },datas).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.hideLoading();
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none'
        })
      }
    })
  },
  //文件上传
  postUploadFile(arr,callback) {
    console.log(arr);
    let that = this;
    let ImgList = that.data.ImgList;
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      wx.uploadFile({
        url: 'https://xiaolinmanhua.zztv021.com/api/Lib/PostUploadFile?rnd=1&sign=' + getSign(`rnd=1`),
        filePath: arr[i],
        name: 'file',
        formData: {},
        success(res) {
          console.log("res2222", res);
          var p = JSON.parse(res.data);
          console.log(p)
          if (p.ErrCode == 0) {
            ImgList.push({
              "img_url": p.Response
            })
            console.log("ImgList", ImgList);
            that.setData({
              ImgList
            })
            callback && callback(res)
          } else {
            wx.showToast({
              title: p.ErrMsg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
})