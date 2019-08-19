// pages/ble/ble.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animation_a: {},
    animation_b: {},
    animation_c: {},
    con_x: getApp().globalData.con_x,
    con_y: getApp().globalData.con_y,

    userInfo: {} ,
    username:"",
    key:"",

    point:"1000",
    uptxt:"",
    opa:0,
    hei:0,
    hei2:0,
    imagesrc:"",

    postres:{}
  },

  animation:function(that,mode){
    setTimeout(function () {
      if(mode==1){
        that.setData({
          opa: that.data.opa + 0.1
        })
        if (that.data.opa < 0.8) that.animation(that,mode);
      }else{
        that.setData({
          opa: that.data.opa - 0.1
        })
        if (that.data.opa > 0) that.animation(that, mode);
      }
    }.bind(this), 30)
  },

  close:function(){
    this.animation(this, 0);
    this.setData({
      uptxt: "",
      hei: 0,
      hei2:0
    })
  },

  tap_a:function(){
    wx.navigateTo({
      url: '../bike/bike'
    });
  },

  tap_b: function () {
    wx.navigateTo({
      url: '../bat/bat'
    });
  },

  tap_c: function () {
    wx.navigateTo({
      url: '../newdevice/newdevice'
    });
  },

  tap_d: function () {
    /*
    this.getui("coupon");
    this.animation(this, 1);
    var coupon_data = this.data.postres.coupon.split('-');
    this.setData({
      uptxt: "您的优惠券到期时间：\n20" + coupon_data[0] + '年' + coupon_data[1] + '月' + coupon_data[2] + '日'
    })*/
  },

  out:function(){
    getApp().globalData.user = "";
    getApp().globalData.key = "";
    wx.navigateTo({
      url: '../code/code'
    });
  },

  tap_e: function () {
    wx.navigateTo({
      url: '../can/can'
    });
  },

  onLoad: function (options) {
    getApp().globalData.senes = 0;
    var that = this
    /*getApp().getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
        username: getApp().globalData.user,
        key: getApp().globalData.key
      })
      var postdata = that.data.username + '-' + that.data.key;
      var Util = require('../../util.js');
      wx.request({
        url: 'https://honeycomb.applinzi.com/user',
        data: Util.json2Form({
          data: postdata
        }),
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data.report)
          if (res.data.report=='r'){
            that.setData({
              point: res.data.point
              ,postres:res.data
            })
          }else{
            that.setData({
              point: '--'
            })
            wx.showToast({
              title: "账号密码错误",
              icon: 'loading',
              duration: 3000
            });
          }
        },
        fail: function (res) {
          wx.showToast({
            title: "未连接到服务器",
            icon: 'loading',
            duration: 1000
          });
        }
      });
    })  */
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

  onShareAppMessage: function () {
  }
})