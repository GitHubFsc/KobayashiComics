// pages/afterSalesOrders/index.js
const app = getApp()
Page({
  data: {
    recommend :['全部','退款中','退款成功','退款失败'],
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    type: 0,
    page: 1,
    pagesize: 10,
    orderList :[]
  },
  onLoad: function () {

    var that = this;
    /**
     * 获取当前设备的宽高
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    if (app.globalData.userid) {
      // this.getList()
    } else {
      app.callbackuserid = res => {
        // this.getList()
      }
    }
  },

  getList() {
    let {
      type,
      pagesize,
      page,
      currentTab
    } = this.data;
    GetMyApplyForRefunds({
      user_id: app.globalData.userid,
      type,
      page,
      pagesize,
    }).then(res => {
      console.log("res", res)
      if (currentTab == 0) {
        let list0 = this.data.list0;
        res.data.Response.map(item => {
          list0.push(item)
        })
        this.setData({
          list0
        });
      } else if (currentTab == 1) {
        let list1 = this.data.list1;
        res.data.Response.map(item => {
          list1.push(item)
        })
        this.setData({
          list1
        });
      } else if (currentTab == 2) {
        let list2 = this.data.list2;
        res.data.Response.map(item => {
          list2.push(item)
        })
        this.setData({
          list2
        });
      } else {
        let list3 = this.data.list3;
        res.data.Response.map(item => {
          list3.push(item)
        })
        this.setData({
          list3
        });
      }
    })
  },
  CancelRefund(e) {
    GetCancelRequest({
      user_id: app.globalData.userid,
      order_no:e.target.dataset.order_no
    }).then(res => {
      if (res.data.ErrCode == 0) {
        console.log("res",res);
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
        this.orderList();
      } else {
        wx.showToast({
          title: res.data.ErrMsg,
          icon: "none"
        })
      }
    })
  },
  applyAgain(e){
    wx.navigateTo({
      url: '../applyForSale/index?order_no='+e.target.dataset.order_no,
    })
  },
  router_afterSalesOrderDetails(e){
    wx.navigateTo({
      url: '../afterSalesOrderDetails/index?order_no='+e.target.dataset.order_no,
    })
  },
  //  tab切换逻辑
  nav_tab: function (e) {
    console.log(e);
    this.setData({
      currentTab : e.target.dataset.index
    })
    // this.getList();
  },
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    });
    // this.getList();
  },
})