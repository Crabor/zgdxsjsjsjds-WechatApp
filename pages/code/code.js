Page({
  data: {
    focus: false,
    inputValue: '',
    animation_key: {},
    animation_name: {},
    con_x: getApp().globalData.con_x,
    con_y: getApp().globalData.con_y
  },
  breakoutpage: function(){
    wx.switchTab({
      url: '../choose/choose'
    })
  },
  bindinput_name: function (e) {
    var that = this;
    if (e.detail.cursor == 11) {
      var animation = wx.createAnimation({
        duration: 1000, //speed
        timingFunction: "ease", //effect
      })
      animation.translateX("-400px").step();
      this.setData({
        animation_name: animation.export()
      })

      var animation = wx.createAnimation({
        duration: 1000, //speed
        timingFunction: "ease", //effect
      })
      animation.translateY("-1400px").step();
      this.setData({
        animation_key: animation.export()
      })
      wx.setStorage({
        key: "user",
        data: e.detail.value
      })
      getApp().globalData.user = e.detail.value
    }
  },
  bindinput_key: function (e) {
    var that = this;
    if(e.detail.cursor==11){
      wx.showToast({
        title: "设置成功",
        icon: 'success',
        duration: 2000
      });
      wx.setStorage({
        key: "key",
        data: e.detail.value
      }),
      setTimeout(function () {
        wx.switchTab({
          url: '../choose/choose'
        })
      }.bind(that), 1000)
      getApp().globalData.key = e.detail.value
    }
  },
})