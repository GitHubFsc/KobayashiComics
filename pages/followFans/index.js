// pages/followFans/index.js
import {GetMyFocus,GetFansList,GetCanCelFocus,GetFocus,getSign} from '../../utils/axios.js';
import utils from './../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page : 1,
    pagesize : 10,
    user_list: [],
    pageflag : false
  },
  /*路由*/
  //他人主页
  router_homepage(e){
    wx.navigateTo({
      url: '../homepage/index?id='+ e.currentTarget.dataset.id+'&type=1',
    })
  }, 
  /*事件*/
  unsubscribe(e){
    console.log("取消关注", e.currentTarget.dataset.id)
    let that = this,
    id = e.currentTarget.dataset.id;
    that.getCanCelFocus(id,()=>{
      that.setData({
        pageflag  : false
      })
      if(that.data.type==0){
        that.getMyFocus()
      }else{
        that.getFansList()
      }
    })
  },
  attention(e){
    console.log("关注", e.currentTarget.dataset.id)
    let that = this,
    id = e.currentTarget.dataset.id;
    that.getFocus(id,()=>{
      that.setData({
        pageflag  : false
      })
      if(that.data.type==0){
        that.getMyFocus()
      }else{
        that.getFansList()
      }
    })
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.type == 0? "关注":"粉丝"
    })
    this.setData({
      type : options.type,
      user_id : options.id
    })
    if(options.type==0){
      this.getMyFocus()
    }else{
      this.getFansList()
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
    let that = this;
    that.setData({
      pageflag : true,
      page: that.data.page + 1
    })
    if(that.data.type==0){
      that.getMyFocus()
    }else{
      that.getFansList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //我的关注
  getMyFocus(){
    let {user_id,page,pagesize,pageflag,user_list} = this.data;
    GetMyFocus({
      user_id: user_id,
      page : page,
      pagesize : pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr=>{
          if(pageflag){
            user_list.push(arr)
          }
        })
        if(!pageflag){
          user_list = res.data.Response
        }
        this.setData({
          user_list 
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //我的粉丝
  getFansList(){
    let {user_id,page,pagesize,pageflag,user_list} = this.data;
    GetFansList({
      user_id: user_id,
      page : page,
      pagesize : pagesize,
      sign: getSign(`user_id=${user_id}&page=${page}&pagesize=${pagesize}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr=>{
          if(pageflag){
            user_list.push(arr)
          }
        })
        if(!pageflag){
          user_list = res.data.Response
        }
        this.setData({
          user_list 
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //添加关注
  getFocus(id,callback){
    let user_id = wx.getStorageSync('userId');
    GetFocus({
      user_id: user_id,
      fuser_id : id,
      sign: getSign(`user_id=${user_id}&fuser_id=${fuser_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  //取消关注
  getCanCelFocus(id,callback){
    let user_id = wx.getStorageSync('userId');
    GetCanCelFocus({
      user_id: user_id,
      id : id,
      sign: getSign(`user_id=${user_id}&id=${id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        callback && callback()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  }
})