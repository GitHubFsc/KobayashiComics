// pages/productDetails/index.js
import { GetGoodsDetail, GetMyCollection,GetAddMyCar,GetGoodsSize,getSign } from '../../utils/axios.js';
import utils from './../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    colorIdx: null,
    sizeIdx: null,
    num: 1,
    popUpLayerflag: true,
    collectLflag: false,
    pul_confirm: false,
    steps : 3,
    loading: false,
    GoodsDetail :''
  },
  /*路由*/
  //分享
  router_dynamic(e) {
    wx.navigateTo({
      url: '../dynamic/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //客服
  router_service(e) {
    wx.navigateTo({
      url: '../dynamic/index?id=' + e.currentTarget.dataset.id,
    })
  },
  //购物车
  router_shoppingcart() {
    wx.navigateTo({
      url: '../shoppingcart/index',
    })
  },
  //更多评价
  router_appraise() {
    wx.navigateTo({
      url: '../appraise/index',
    })
  },
  /*事件*/

  //轮播图
  swiperChange: function (e) {
    var that = this;
    that.setData({
      current: e.detail.current
    })
  },
  //收藏
  collectL(e) {
    // console.log(e.currentTarget.dataset.id)
    var that = this;
    let GoodsDetail  = that.data.GoodsDetail
    that.getMyCollection(res=>{
      GoodsDetail.is_collection = ! GoodsDetail.is_collection;
      that.setData({
        GoodsDetail
      })
      wx.showToast({
        title: res.data.ErrMsg,
        icon: "none"
      })
    })
  },
  //规格弹框
  popUpLayer(e) {
    var that = this;
    let flag = false;
    if (e.currentTarget.dataset.type) {
      flag = false
    } else {
      flag = true
    }
    that.setData({
      pul_confirm: flag,
      popUpLayerflag: !that.data.popUpLayerflag
    })
  },
  //选择颜色
  color(e) {
    var that = this;
    that.setData({
      colorIdx: e.currentTarget.dataset.id
    })
  },
  //选择尺寸
  size(e) {
    var that = this;
    that.setData({
      sizeIdx: e.currentTarget.dataset.id
    })
  },
  //改变数量
  Update_num(e) {
    var that = this;
    let num = that.data.num;
    if (e.currentTarget.dataset.index == 1) {
      num <= 1 ? num = 1 : num--
    } else {
      num++
    }
    that.setData({
      num
    })
  },
  //确认 加入购物车/立即购买
  confirm(e) {
    let that = this;
    if (that.data.pul_confirm) {
      console.log("加入购物车")
      that.getAddMyCar(res=>{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      })
    } else {
      that.getGoodsSize(res=>{
        let arr=[], data = {};
        data.car_id = 0;
        data.sku_id = res.data.Response[0].id;
        data.goods_id = res.data.Response[0].goods_id;
        data.number = this.data.num;
        arr.push(data)
        wx.navigateTo({
          url: '../productSubmitOrder/index?arr=' + JSON.stringify(arr),
        })
        that.setData({
          popUpLayerflag: true
        })
      })
    }
  },
  /**API */
  //获取手机号
  getPhoneNumber(e) {
    let that = this;
    that.setData({
      loading: true,
    })
    app.getPhoneNumber(e,(data)=>{
      console.log("手机号回调",data)
      if(data){
        that.setData({
          steps : 1 ,
          loading: false,
        })
      }
    })
  },
  //获取用户信息
  getUserInfo(e) {
    let that = this;
    that.setData({
      loading: true
    })
    app.getUserInfo(e,(data)=>{
      console.log("用户回调",data)
      if(data){
        that.setData({
          steps : 2 ,
          loading: false,
        })
      }
    })
  },
  //用户登录
  UserLogin() {
    var that = this;
    app.login((data)=>{
      console.log("登录成功",data)
      if(data){
        that.setData({
          steps : 3 ,
          loading: false,
        })
        this.getGoodsDetail();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user_id = wx.getStorageSync('userId');
    if (user_id) {
      this.setData({
        steps : 3 ,
        goods_id : options.id
      })
      this.getGoodsDetail();
    } else {
      this.setData({
        steps : 0,
        goods_id : options.id
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

  },
  /**API */
  //商品详情
  getGoodsDetail(){
    let user_id = wx.getStorageSync('userId');
    let goods_id = this.data.goods_id;
    GetGoodsDetail({
      user_id: user_id,
      goods_id: goods_id,
      sign: getSign(`user_id=${user_id}&goods_id=${goods_id}`)
    }).then(res=>{
      if(res.data.ErrCode==0){
        res.data.Response.eval.map(item=>{
          item.add_timespan = utils.formatTime(new Date(item.add_timespan))
        })
        this.setData({
          GoodsDetail : res.data.Response
        })
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //添加/取消 收藏
  getMyCollection(callback){
    let user_id = wx.getStorageSync('userId');
    let goods_id = this.data.goods_id;
    GetMyCollection({
      user_id: user_id,
      goods_id: goods_id,
      sign: getSign(`user_id=${user_id}&goods_id=${goods_id}`)
    }).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //加入购物车
  getAddMyCar(callback){
    let user_id = wx.getStorageSync('userId');
    let {goods_id,colorIdx,sizeIdx,num,GoodsDetail} = this.data;
    let parent_sku_parameter_type = GoodsDetail.goods_sku_parameter[0].parent_sku_parameter_type,
        parent_size_id = GoodsDetail.sku_list[0].parent_size_id;
    GetAddMyCar({
      goods_id :goods_id,
      user_id : user_id,
      parent_sku_parameter_type : parent_sku_parameter_type,
      sku_parameter_type_id : colorIdx,
      parent_size_id : parent_size_id,
      size_id : sizeIdx,
      num : num,
      sign: getSign(`goods_id=${goods_id}&user_id=${user_id}&parent_sku_parameter_type=${parent_sku_parameter_type}&sku_parameter_type_id=${colorIdx}&parent_size_id=${parent_size_id}&size_id=${sizeIdx}&num=${num}`)
    }).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //确认下单 第一步 商品规格筛选
  getGoodsSize(callback){
    let {goods_id,colorIdx,sizeIdx,num,GoodsDetail} = this.data;
    let parent_sku_parameter_type = GoodsDetail.goods_sku_parameter[0].parent_sku_parameter_type,
        parent_size_id = GoodsDetail.sku_list[0].parent_size_id;
    GetGoodsSize({
      goods_id :goods_id,
      parent_sku_parameter_type : parent_sku_parameter_type,
      sku_parameter_type_id : colorIdx,
      parent_size_id : parent_size_id,
      size_id : sizeIdx,
      // num : num,  &num=${num}
      sign: getSign(`goods_id=${goods_id}&parent_sku_parameter_type=${parent_sku_parameter_type}&sku_parameter_type_id=${colorIdx}&parent_size_id=${parent_size_id}&size_id=${sizeIdx}`)
    }).then(res=>{
      if(res.data.ErrCode==0){
        callback && callback(res)
      }else{
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },


})