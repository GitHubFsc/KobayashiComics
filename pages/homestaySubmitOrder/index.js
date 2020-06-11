// pages/homestaySubmitOrder/index.js
import {GetHomestayMarke,PostHomestayReservation,GetPointRule,GetHomestayList, getSign} from '../../utils/axios.js';
import utils from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    homestay : '',
    begin_time : '',
    end_time :'',
    peopleNumList: ['1人','2人','3人','4人','5人','6人'],
    peopleNum : '1人',
    num : 1,
    Tenant_nmae :'',
    Tenant_userId :[],
    Tenant_phone:'',
    switchChecked : false,
    peopleBox :true,
    calendar_box : true,
    calendar  : true,
    user_coupon_id : 0,
    is_deduction :  0,
    invoice_id : 0,
    coupon_money : 0,
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
    calendarConfigA: {
      multi: false, // 是否开启多选,
      inverse: true, // 单选模式下是否支持取消选中,
      onlyShowCurrentMonth: true, // 日历面板是否只显示本月日期
      disableMode: { // 禁用某一天之前/之后的所有日期
        type: 'before', // [‘before’, 'after']
        date: '', // 无该属性或该属性值为假，则默认为当天
      },
    }

  },
  /**路由 */
  //支付
  router_topay(){
    let that = this;
    //去支付 计算价格 
    that.getHomestayMarke(res=>{
      console.log(res);
      //提交订单
      that.postHomestayReservation(res=>{
        console.log(res);
        //微信支付
        that.postWeChatPay(res,data=>{
          wx.showToast({
            title: '支付成功',
            icon:'none'
          })
          //支付成功跳转到页面
          wx.redirectTo({
            url: './../Afterpayment/index?index=1'
          })
        })
      })
    })
    
  },
  //优惠券
  router_shoppingVoucher() {
    wx.navigateTo({
      url: './../shoppingVoucher/index'
    })
  },
  //发票
  router_invoice() {
    wx.navigateTo({
      url: './../invoice/index'
    })
  },
  //添加入住人
  router_addResident(){
    wx.navigateTo({
      url: './../addResident/index'
    })
  },
  /*事件*/
  //选择入住人数
  bindPickerChange(e){
    let that = this;
    that.setData({
      peopleNum: that.data.peopleNumList[e.detail.value],
      num : ++e.detail.value
    })
  },
  //租客信息开关
  Tenant(){
    let that = this;
    that.setData({
      peopleBox: !that.data.peopleBox
    })
  },
  //选择租客信息
  determine(){
    let that = this;
    let {peopleBox,Tenant_userId,HomestayList} = that.data;
    let arr = [];
    HomestayList.map(item=>{
      if(item.userflag){
        arr.push(item.name)
        Tenant_userId.push(item.id)
      }
    })
    that.setData({
      peopleBox: !peopleBox,
      Tenant_nmae : arr.join(','),
      Tenant_userId,
    })
    //确认租客信息调用接口 只为刷新页面数据
    that.getHomestayMarke();
  },
  //选择租客
  Selected(e){
    let that = this;
    let HomestayList = that.data.HomestayList;
    HomestayList[e.currentTarget.dataset.index].userflag = !HomestayList[e.currentTarget.dataset.index].userflag,
    that.setData({
      HomestayList
    })
  },
  //切换日历
  Switch(e) {
    console.log(e.currentTarget.dataset.index)
    let that = this;
    that.setData({
      calendar : e.currentTarget.dataset.index == 1 ? false : true,
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
  //计算所有天数
  CalculateDays() {
    let that = this;
    let begin_time = that.data.selectInto,
    end_time = that.data.selectOut;
    let date1 = new Date(begin_time).getTime();
    let date2 = new Date(end_time).getTime();
    let days = Math.floor((date2 - date1) / (24 * 3600 * 1000));
    // console.log('共',days,'晚')
    that.setData({
      days
    })
  },
  /**日历组件方法 */
  afterTapDayB(e) {
    let that = this,
      month = utils.formatNumber(e.detail.month),
      day = utils.formatNumber(e.detail.day);
    // console.log('入住时间', e.detail.year, month, day);
    that.setData({
      begin_time: e.detail.year+'-'+month + '-' + day
    })
    if (that.data.end_time) {
      that.CalculateDays()
    }
  },
  afterTapDayA(e) {
    let that = this,
      month = utils.formatNumber(e.detail.month),
      day = utils.formatNumber(e.detail.day);
    // console.log('离开时间', e.detail.year, month, day);
    that.setData({
      end_time: e.detail.year+'-'+month + '-' + day
    })
    if (that.data.begin_time) {
      that.CalculateDays()
    }
  },
  //积分开关
  switchChange(e){
    let that = this;
    that.setData({
      switchChecked : e.detail.value,
      is_deduction : e.detail.value? 0 : 1
    })
    //开启或关闭积分 刷新页面 计算总金额 
    that.getHomestayMarke();
  },
  //手机号输入框失焦
  mobileBlur(e){
    this.setData({
      mobile : e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      homesta_id : options.id,
      homesta_sku_id : options.homesta_sku_id,
      begin_time : utils.ymr(Number(options.begin_time)),
      end_time : utils.ymr(Number(options.end_time)),
    })
    this.getPointRule();
    this.getHomestayList();
    this.getHomestayMarke();
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
      if(Coupon.coupon_begin_timespan<=time&&time<=Coupon.coupon_end_timespan){
        this.setData({
          GoodsCoupon: Coupon,
          user_coupon_id : Coupon.id,
          coupon_money : Coupon.coupon_discount_money
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
    if(Invoice){
      this.setData({
        Invoice: Invoice,
        invoice_id : Invoice.id
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
  //民宿-提交订单预览/计算金额
  getHomestayMarke(callback){
    let user_id = wx.getStorageSync('userId');
    let {homesta_id,homesta_sku_id,begin_time,end_time,user_coupon_id,num,is_deduction} = this.data;
    begin_time = new Date(begin_time).getTime();
    end_time = new Date(end_time).getTime();
    GetHomestayMarke({
      user_id :user_id,
      homesta_id :homesta_id,
      homesta_sku_id :homesta_sku_id,
      begin_time :begin_time,
      end_time :end_time,
      user_coupon_id :user_coupon_id,
      num :num,
      is_deduction :is_deduction,
      sign : getSign(`user_id=${user_id}&homesta_id=${homesta_id}&homesta_sku_id=${homesta_sku_id}&begin_time=${begin_time}&end_time=${end_time}&user_coupon_id=${user_coupon_id}&num=${num}&is_deduction=${is_deduction}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res)
        this.setData({
          homestay : res.data.Response,
          coupon_money : res.data.Response.coupon_money
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
  //民宿-提交订单
  postHomestayReservation(callback){
    let user_id = wx.getStorageSync('userId');
    let {homesta_id,homesta_sku_id,begin_time,end_time,mobile,user_coupon_id,num,Tenant_userId,is_deduction,invoice_id} = this.data;
    begin_time = new Date(begin_time).getTime();
    end_time = new Date(end_time).getTime();
    let datas = [];
    datas.push('user_id=' + user_id)
    datas.push('sign=' + getSign(`user_id=${user_id}`))
    PostHomestayReservation({
      body:{
        homestay_id : homesta_id,
        homesta_sku_id : homesta_sku_id,
        start_time : begin_time,
        end_time : end_time,
        number : num,
        user_information_id :Tenant_userId,
        mobile : mobile,
        user_coupon_id : user_coupon_id,
        is_deduction : is_deduction,
        invoice_id : invoice_id
      }
    },datas).then(res=>{
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
  //积分规则
  getPointRule(){
    GetPointRule({
      rnd : 1,
      sign : getSign(`rnd=1`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        this.setData({
          MyPoint : res.data.Response
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
  //获取入住人列表
  getHomestayList(){
   let user_id = wx.getStorageSync('userId'); 
    GetHomestayList({
      user_id : user_id,
      sign : getSign(`user_id=${user_id}`)
    }).then(res=>{
      if (res.data.ErrCode == 0) {
        console.log(res);
        res.data.Response.map(arr=>{
          arr.userflag = false
        })
        this.setData({
          HomestayList : res.data.Response
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
            wx.switchTab({
              url: '../homestayOrder/index?index=1',
            })
          }
        });
      }
    });
  }
})