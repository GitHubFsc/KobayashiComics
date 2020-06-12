// pages/routeSubmitOrder/index.js
import { GetRouteDetail,GetRoutePrice, GetTimePrice, PostMakeRouteOrder, getSign } from '../../utils/axios.js';
import utils from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '', 
    user_phone: '',
    people_num: '',
    children_num: '',
    start_time : '',
    is_deduction: 0,
    user_coupon_id: 0,
    invoice_id: 0,
    coupon: '',
    invoice: '',
    switchChecked: false,
    calendar: true,
    calendar_box: true,
    //日历组件
    calendarConfigB: {
      multi: false, // 是否开启多选,
      inverse: true, // 单选模式下是否支持取消选中,
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      disableMode: { // 禁用某一天之前/之后的所有日期
        type: 'before', // [‘before’, 'after']
        date: '', // 无该属性或该属性值为假，则默认为当天
      },
    },
  },
  /**路由 */
  //支付
  router_topay() {
    let that = this;
    //去支付 计算价格 
    wx.showLoading({
      title: '订单提交中...',
    })
    that.getRoutePrice(res => {
      //路线-月份日期筛选
      that.getTimePrice(res1 => {
        let time = new Date(this.data.start_time+ ' 00:00').getTime();
         let id = res1.data.Response.filter(arr=>{
          if(arr.timespan == time){ return arr}
        })[0].id
        if(id){
          //提交订单
          that.postMakeRouteOrder(id,res2 => {
            console.log(res2);
            //微信支付
            that.postWeChatPay(res2, () => {
              wx.hideLoading()
              wx.showToast({
                title: '支付成功',
                icon: 'none'
              })
              //支付成功跳转到页面
              wx.redirectTo({
                url: './../Afterpayment/index?index=2'
              })
            })
          })
        }else{
          wx.showToast({
            title: '该日期的路线不存在！',
            icon: 'none'
          })
        }
      })
    })
  },
  //发票
  router_invoice() {
    console.log("开发票")
  },
  /*事件*/
  //表单输入 输入监听
  inputWatch(e) {
    let that = this;
    let item = e.currentTarget.dataset.model;
    that.setData({
      [item]: e.detail.value
    });
    if(item=='people_num' || item=='children_num' || item=='start_time'){
      that.getRoutePrice();
    }
  },
  //切换日历
  Switch(e) {
    console.log(e.currentTarget.dataset.index)
    let that = this;
    that.setData({
      calendar: e.currentTarget.dataset.index == 1 ? false : true,
    })
  },
  //打开日历 选择日期
  IntoOtu(e) {
    let that = this;
    that.setData({
      calendar_box: !that.data.calendar_box,
    })
  },
  //关闭日历
  close() {
    let that = this;
    that.setData({
      calendar_box: !that.data.calendar_box
    })
  },
  //取消所有选中
  empty() {
    this.calendar.cancelSelectedDates();
  },
  //积分开关
  switchChange(e) {
    let that = this;
    that.setData({
      switchChecked: e.detail.value,
      is_deduction: e.detail.value ? 0 : 1
    })
    //开启或关闭积分 刷新页面 计算总金额 
    that.getHomestayMarke();
  },

  /**日历组件方法 */
  afterTapDayB(e) {
    let that = this,
      month = utils.formatNumber(e.detail.month),
      day = utils.formatNumber(e.detail.day);
    // console.log('入住时间', e.detail.year, month, day);
    that.setData({
      start_time: e.detail.year + '-' + month + '-' + day
    })
    that.getRoutePrice()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        route_id: options.id
      })
      this.getRouteDetail();
      this.getRoutePrice();
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
    //处理用户优惠券问题 
    let Coupon = wx.getStorageSync('Coupon'),
      Invoice = wx.getStorageSync('Invoice');
    if (Coupon) {
      let time = new Date().getTime();
      //判断优惠券开始时间
      if (Coupon.coupon_begin_timespan <= time && time <= Coupon.coupon_end_timespan) {
        this.setData({
          GoodsCoupon: Coupon,
          user_coupon_id: Coupon.id,
          coupon_money: Coupon.coupon_discount_money
        })
        //用户使用优惠券 刷新页面 计算总金额 
        this.getHomestayMarke();
      }
      // else{
      //   wx.showToast({
      //     title: '该优惠券活动暂未开始！',
      //     icon: 'none',
      //   })
      // }
    }
    //获取用户默认发票
    if (Invoice) {
      this.setData({
        Invoice: Invoice,
        invoice_id: Invoice.id
      })
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
  /**API */
  //路线详情
  getRouteDetail() {
    let user_id = wx.getStorageSync('userId'),
      route_id = this.data.route_id;
    GetRouteDetail({
      user_id: user_id,
      route_id: route_id,
      sign: getSign(`user_id=${user_id}&route_id=${route_id}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          RouteDetail: res.data.Response,
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
  //路线-订单预览/计算金额
  getRoutePrice(callback) {
    let user_id = wx.getStorageSync('userId'),
      { route_id, people_num, children_num, start_time, is_deduction, user_coupon_id, invoice_id } = this.data;
      people_num = people_num?people_num:0;
      children_num = children_num?children_num:0;
      start_time = start_time?new Date(start_time+ ' 00:00').getTime():new Date(utils.getTime()).getTime();
      GetRoutePrice({
      user_id: user_id,
      route_id: route_id,
      people_num: people_num,
      children_num: children_num,
      time: start_time,
      is_deduction: is_deduction,
      user_coupon_id: user_coupon_id,
      invoice_id: invoice_id,
      sign: getSign(`user_id=${user_id}&route_id=${route_id}&people_num=${people_num}&children_num=${children_num}&time=${start_time}&invoice_id=${invoice_id}&user_coupon_id=${user_coupon_id}&is_deduction=${is_deduction}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res)
        this.setData({
          Route: res.data.Response
        })
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //路线-月份日期筛选
  getTimePrice(callback) {
    let route_id = this.data.route_id,
      start_time = new Date(this.data.start_time+ ' 00:00').getTime();
    GetTimePrice({
      route_id: route_id,
      date: start_time,
      sign: getSign(`route_id=${route_id}&date=${start_time}`)
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log(res)
        callback && callback(res)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //路线-提交订单
  postMakeRouteOrder(id,callback) {
    let user_id = wx.getStorageSync('userId'),
      { route_id, user_phone, user_name, people_num, children_num, is_deduction, user_coupon_id, invoice_id } = this.data;
    let datas = [];
    datas.push('user_id=' + user_id)
    datas.push('sign=' + getSign(`user_id=${user_id}`))
    PostMakeRouteOrder({
      body: {
        route_id: route_id,
        route_sku_id: id,
        name: user_name,
        mobile: user_phone,
        people_num: people_num,
        children_num: children_num,
        user_coupon_id: user_coupon_id,
        is_deduction: is_deduction,
        invoice_id: invoice_id,
      }
    }, datas).then(res => {
      if (res.data.ErrCode == 0) {
        callback && callback(res.data.Response)
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: 'none',
        })
      }
    })
  },
  //微信支付
  postWeChatPay(data, callback) {
    let userInfo = wx.getStorageSync('userInfo');
    let order_no = data.order_no,
      price = data.price;
    let openid = userInfo.openId
    let user_id = wx.getStorageSync('userId');
    console.log("order_no", order_no, 'price', price * 100, 'openid', openid, 'user_id', user_id);
    let body = "微信支付"
    let url = '&body=' + body + '&total_fee=' + price * 100 + '&out_trade_no=' + order_no + '&configId=104&trade_type=JSAPI&msgid=' + openid;
    wx.request({
      url: 'https://pays.zztv021.com/payment/wxpay/wxpay.ashx?action=jspayparam' + url,
      success: (res) => {
        wx.hideLoading()
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          success: (item) => {
            if (item.errMsg == "requestPayment:ok") {
              callback && callback(item)
            } else {
              wx.hideLoading()
              wx.showToast({
                title: item.errMsg,
                icon: 'none',
              })
            }
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({
              title: '取消支付！',
              icon: 'none'
            })
            //取消支付 商品订单
            wx.redirectTo({
              url: '../routeOrder/index?index=1',
            })
          }
        });
      }
    });
  }
})