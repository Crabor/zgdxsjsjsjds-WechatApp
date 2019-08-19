// pages/bat/bat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con_x: getApp().globalData.con_x,
    con_y: getApp().globalData.con_y,
    //bat: getApp().globalData.ble_in_bat,
    bat:100,
    health: getApp().globalData.ble_in_health,
    //health:100,
    cycle: getApp().globalData.ble_in_chargecycle,
    temp: getApp().globalData.ble_in_temp_mos
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  onShow: function () {
    getApp().globalData.senes = 0
    this.setData({
      health: getApp().globalData.ble_in_health,
      cycle: getApp().globalData.ble_in_chargecycle,
      temp_a: getApp().globalData.ble_in_temp_mos,
      temp_b: getApp().globalData.ble_in_temp_bat
    })
  },


  onShareAppMessage: function () {
  }
})