// pages/bike/bike.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seta:0,
    setb:0,
    setc:1
  },

  switch1: function (e) {
    console.log('switch', e.detail.value)
    if (e.detail.value){
      this.setData({
        seta:1
      })
    }else{
      this.setData({
        seta: 0
      })
    }
  },

  slider1: function (e) {
    console.log('slider1', e.detail.value)
    this.setData({
      setb: e.detail.value
    })
  },

  slider2: function (e) {
    console.log('slider2', e.detail.value)
    this.setData({
      setc: e.detail.value
    })
  },

  upload: function (){
    wx.showToast({
      title: "上传成功",
      icon: 'success',
      duration: 1000
    })

    var that = this;
    var hex = '0809030';
    hex += this.data.seta;
    hex += this.data.setb;
    hex += '0';
    hex += this.data.setc;
    hex += '01'
    console.log('error', hex)
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    console.log(typedArray)
    var buffer = typedArray.buffer
    console.log(buffer)

    wx.writeBLECharacteristicValue({
      deviceId: getApp().globalData.UUID,
      serviceId: getApp().globalData.serviceId,
      characteristicId: getApp().globalData.characteristicId,
      value: buffer,
      success: function (res) {
        console.log('writeBLECharacteristicValue success', res)
      },
      failed: function (res) {
        console.log('error', res)
      }
    })
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    getApp().globalData.senes = 0
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