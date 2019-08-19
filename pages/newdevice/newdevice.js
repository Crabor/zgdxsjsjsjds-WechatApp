// var ip=require("../../data/post.js");
// pages/newdevice/newdevice.js
Page({

  data: {
    UUID:"",
    mode:0,
    moveData1: null,
    moveData2: null,
  },

  saveUUID() {
    var that = this;
    wx.showToast({
      title: "绑定成功" + that.data.UUID,
      icon: 'success',
      duration: 1000
    })
    wx.setStorage({
      key: "scan_UUID",
      data: that.data.UUID
    })
    getApp().globalData.UUID = that.data.UUID;
    console.log("k :" + getApp().globalData.UUID)
    setTimeout(function () {
      wx.navigateBack({
      })}.bind(this) , 1000) 
  },

  click_s: function () {
    var that = this;
    // var ipData = ip.ipData;
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        getApp().globalData.ip = res.result;//保存ip地址到全局变量
        // wx.showModal({
        //   title: '',
        //   content: getApp().globalData.ip,
        // })
        var postdata = "";
        if(that.data.mode==1){
          postdata = "and";
        }else{
          postdata = "ios";
        }
        postdata = postdata +'-C'+res.result;
        var Util = require('../../util.js');
        wx.request({
          url: 'https://honeycomb.applinzi.com/getid',
          data: Util.json2Form({
            data: postdata
          }),
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({
              UUID: res.data
            })
            console.log(res);
            that.saveUUID();
          },
          fail: function (res) {
            wx.showToast({
              title: "未连接到服务器",
              icon: 'failed',
              duration: 1000
            });
          }
        });
      }
    })
  },

  onLoad: function (options) {
    //if(getApp().globalData.model.match("iPhone") === null){
    if(true){
      this.setData({
        mode: 1
      })
    }else{
      wx.showToast({
        title: "暂未开通ios服务",
        icon: 'failed',
        duration: 3000
      })
    }
  },

  onReady:function(options){
    var animation = wx.createAnimation({
      duration: 1000,
      delay: 0,
      timingFunction: "ease",
    });
    animation.scale(0.1).step({ duration: 1000 })
    this.setData({ moveData1: animation.export() })
    var animation = wx.createAnimation({
      duration: 1000,
      delay: 0,
      timingFunction: "ease",
    });
    animation.scale(3).step({ duration: 1000 })
    this.setData({ moveData2: animation.export() })
  }
})