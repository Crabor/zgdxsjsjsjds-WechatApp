var isscene = false;
// pages/main/main.js
Page({

  data: {
    con_x: getApp().globalData.con_x,
    con_y: getApp().globalData.con_y
  },

  onLoad: function (options) {
    console.log(getApp().globalData.senes);
  },

  /*
  animation: function (that) {
    setTimeout(function () {
      that.setData({
        opa: that.data.opa + 0.1
      })
      if (that.data.opa < 1) that.animation(that);
    }.bind(this), 80)
  },*/

  onReady: function () {
    var that = this;
    /*setTimeout(function () {
      that.animation(that);
    }.bind(this), 1000)*/
    setTimeout(function () {
      getApp().globalData.senes=0;
      if (getApp().globalData.user == '') {
        wx.navigateTo({
          url: '../code/code'
        });
      } else {
        if (getApp().globalData.senes == 0) {
          wx.switchTab({
            url: '../choose/choose'
          });
        }
      }
    }.bind(this), 5000)
  },

  onShow: function () {
    if (getApp().globalData.senes == 0){
      wx.switchTab({
        url: '../choose/choose'
      });
    }
  },
})