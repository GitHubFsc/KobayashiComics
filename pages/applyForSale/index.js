// pages/applyForSale/index.js
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
    reason_text: "仅退款",
    reason_reason: "七天无理由退款",
    refund_type: 1,
    refund_reason_id: 11,
    amount: "",
    refund_instruction: "",
    refundReasonList: []
  },
  file() {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("res1111", res);
        let imgArr = [];
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          let item = res.tempFilePaths[i];
          imgArr.push({
            "img_url": item
          })
        }
        console.log(imgArr);
        let refund_voucher = that.data.refund_voucher;
        for (let i = 0; i < imgArr.length; i++) {
          console.log(imgArr[i].img_url);
          wx.uploadFile({
            url: 'https://xiaolinmanhua.zztv021.com/api/Lib/PostUploadFile?rnd=1&sign=' + getSign(`rnd=1`),
            filePath: imgArr[i].img_url,
            name: 'file',
            formData: {},
            success(res) {
              console.log("res2222", res);
              var p = JSON.parse(res.data);
              console.log(p)
              if(p.ErrCode == 0){
                refund_voucher.push({
                  "img_url": p.Response
                })
                console.log("refund_voucher", refund_voucher);
                that.setData({
                  refund_voucher
                })
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
  },
  preview(e) {
    let urls = this.data.refund_voucher.map((x) => {
      return x.img_url
    })
    console.log(urls);
    wx.previewImage({
      current: e.target.dataset.src,
      urls: urls
    })
  },
  boxdialog() {
    this.setData({
      boolean: false
    })

  },
  boxdialog_bottom() {
    this.setData({
      boolean: true
    })
  },
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
  onlytype(e) {
    this.setData({
      refund_type: e.target.dataset.id,
      reason_text: e.target.dataset.text,
      boolean: false
    })
  },
  notOnlytype(e) {
    this.setData({
      refund_reason_id: e.target.dataset.id,
      reason_reason: e.target.dataset.text,
      boolean: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      order_no: options.order_no
    })
    if (app.globalData.userid) {
      this.applyForSale()
    } else {
      app.callbackuserid = res => {
        this.applyForSale()
      }
    }
  },
  applyForSale() {
    let {
      order_no
    } = this.data;
    console.log(app.globalData.userid);
    console.log(order_no);
    GetApplyForRefundsMoney({
      user_id: app.globalData.userid,
      order_no
    }).then(res => {
      if (res.data.ErrCode == 0) {
        this.setData({
          Money: res.data.Response.money
        })
        this.RefundReasonList()
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },

  ApplyForRefund() {
    let {
      order_no,
      amount,
      refund_type,
      refund_reason_id,
      refund_instruction,
      refund_voucher
    } = this.data;
    PostApplyForRefunds({
      user_id: app.globalData.userid,
      amount,
      order_no,
      refund_type,
      refund_reason_id,
      refund_instruction,
      refund_voucher
    }).then(res => {
      if (res.data.ErrCode == 0) {
        wx.redirectTo({
          url: '../afterSalesOrders/index',
        })
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  RefundReasonList() {
    GetRefundReasonList({
      rnd: Rnd()
    }).then(res => {
      this.setData({
        refundReasonList: res.data.Response
      })
    })
  },
  refundAmount(e) {
    this.setData({
      amount: e.detail.value
    })
  },
  bindTextAreaBlur(e) {
    this.setData({
      refund_instruction: e.detail.value
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