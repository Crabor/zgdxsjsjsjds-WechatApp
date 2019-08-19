// pages/choose/choose.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    con_x: getApp().globalData.con_x,
    con_y: getApp().globalData.con_y,
    UUID: getApp().globalData.UUID,
    serviceID: "",
    characterID: "",
    connect_ok: false,
    ble_in: "",
    icon_name:"choose_con",
    opacity_c:0,
    opacity_s:0.5,
    movies: [
      { url: 'http://honeycomb-ui.stor.sinaapp.com/swiper1.png' },
      { url: 'http://honeycomb-ui.stor.sinaapp.com/swiper2.png' },
      { url: 'http://honeycomb-ui.stor.sinaapp.com/swiper3.png' },
      { url: 'http://honeycomb-ui.stor.sinaapp.com/swiper4.png' }
    ] 
  },

  click_bd: function(){
    wx.navigateTo({
      url: '../newdevice/newdevice'
    });
  },

  click_connect: function(){
    this.setData({
      UUID: getApp().globalData.UUID
    })
    this.connect(this);
  },

  connect: function (that) {
    wx.showToast({
      title: "正在连接中",
      icon: 'loading',
      duration: 3500
    });
    that.openBluetooth()
    setTimeout(function () {
      console.log("start bluetooth");
      that.createBLEConnection()
    }.bind(that), 300)
    setTimeout(function () {
      if (that.data.connect_ok == true) {
        that.getBLEDeviceServices()
      }
    }.bind(that), 1800)
    setTimeout(function () {
      if (that.data.connect_ok == true) {
        that.getBLEDeviceCharacteristics()
      }
    }.bind(that), 2300)
    setTimeout(function () {
      if (that.data.connect_ok == true) {
        that.startnotify()
        setTimeout(function () {
          if (getApp().globalData.bleicon == "choose_con") {
            that.connect(that)
          }else{
            wx.showToast({
              title: "连接成功",
              icon: 'success',
              duration: 1000
            });
            that.setData({
              icon_name: "choose_con_ok",
              opacity_c: 0
            })
            
            var hex = '08090000000001';
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
          }
        }.bind(that), 500)
      } else {
        wx.showToast({
          title: "连接失败",
          icon: 'none',
          duration: 1000
        });
      }
    }.bind(that), 3000)
  },

  click_shop: function () {
  },

  click_ins: function () {
  },

  click_us: function () {
  },

  /*onPageScroll: function (res) {
    res.scrollTop
  },*/

  onShow: function () {
    var that=this;

    wx.getStorage({
      key: 'scan_UUID',
      success: function (res) {
        that.setData({
          opacity_s: 0,
          opacity_c: getApp().globalData.bleopacity
        })
      },
      fail: function (res) {
      }
    })

    if (getApp().globalData.bleicon == "connect_ok") {
      this.setData({
        icon_name: "choose_con_ok",
        opacity_c: 0
      })
    }

    wx.onBLEConnectionStateChange(function (res) {
      console.log(`device ${res} state has changed, connected: ${res.connected}`)
      if (res.connected==true){
      }else{
        console.log("断开连接")
        that.setData({
          opacity_c: 0.5,
          icon_name: "choose_con"
        })
        getApp().globalData.bleicon = "choose_con";
        getApp().globalData.bleopacity = 0.5;
        wx.closeBluetoothAdapter({
          success: function (res) {
            console.log(res)
          }
        })
      }
    })
  },

  //初始化蓝牙适配器
  openBluetooth: function () {
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(res.errMsg)
        // success
      },
    })
  },
  //连接低功耗蓝牙设备
  createBLEConnection: function () {
    var that = this;
    console.log("uuid:", that.data.UUID);
    wx.createBLEConnection({
      deviceId: that.data.UUID,
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          connect_ok: true
        })
      },
      fail: function (res) {
        console.log(res)
        that.setData({
          connect_ok: false
        })
      },
      complete: function (res) {
        // complete
      }
    })
  },
  //断开与低功耗蓝牙设备的连接
  closeBLEConnection: function () {
    var that = this;
    console.log(that.data.UUID);
    wx.closeBLEConnection({
      deviceId: that.data.UUID,
      success: function (res) {
        console.log(res)
      }
    })
  },
  //获取蓝牙设备所有 service（服务）
  getBLEDeviceServices: function () {
    var that = this;
    wx.getBLEDeviceServices({
      deviceId: that.data.UUID,
      success: function (res) {
        // success
        console.log('device services:', res.services)
        var a;
        for (a = 0; a < res.services.length; a++) {
          if (res.services[a].uuid.indexOf('FFE0') > -1) {
            break;
          }
        }
        that.setData({
          serviceID: res.services[a].uuid
        })
        console.log('device services:', res.services[a].uuid)
      },
      fail: function (res) {
        // fail
        console.log("fail ", res);
      },
      complete: function (res) {
        // complete
        console.log("over ", that.data.UUID);
      }
    })
  },
  //获取蓝牙设备所有 characteristic
  getBLEDeviceCharacteristics: function () {
    var that = this;
    wx.getBLEDeviceCharacteristics({
      deviceId: that.data.UUID,
      serviceId: that.data.serviceID,
      success: function (res) {
        console.log('device getBLEDeviceCharacteristics:', res.characteristics)
        var a;
        for (a = 0; a < res.characteristics.length; a++) {
          if (res.characteristics[a].uuid.indexOf('FFE1') > -1) {
            break;
          }
        }
        that.setData({
          characterID: res.characteristics[a].uuid
        })
        console.log('device services:', that.data.characterID)
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },

  startnotify: function () {
    var that = this;
    wx.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能 
      deviceId: that.data.UUID,
      serviceId: that.data.serviceID,
      characteristicId: that.data.characterID,
      success: function (res) {
        console.log('notifyBLECharacteristicValueChange success', res.errMsg)
      },
      complete: function (res) {
        console.log('over', res)
      }
    }),
    wx.onBLECharacteristicValueChange(function (res) {
      console.log('now:', res.value)
      var hexArr = Array.prototype.map.call(
        new Uint8Array(res.value),
        function (bit) {
          return ('00' + bit.toString(16)).slice(-2)
        }
      )

      var ble_buffer = hexArr.join('');
      console.log('change: ', ble_buffer);
      getApp().globalData.bleicon = "connect_ok";
      getApp().globalData.ble_in = ble_buffer; 
      getApp().globalData.bleopacity = 0;
      
      getApp().globalData.ble_in_health = parseInt(ble_buffer.substring(2, 4),16);
      getApp().globalData.ble_in_chargecycle = parseInt(ble_buffer.substring(4, 8),16);
      getApp().globalData.ble_in_temp_mos = parseInt(ble_buffer.substring(8, 10),16);
      getApp().globalData.ble_in_temp_bat = parseInt(ble_buffer.substring(10, 12),16);
      getApp().globalData.ble_in_speed = parseInt(ble_buffer.substring(12, 14),16);
      getApp().globalData.ble_in_bat = parseInt(ble_buffer.substring(14, 16),16);
    })
    getApp().globalData.serviceId = that.data.serviceID;
    getApp().globalData.characteristicId = that.data.characterID;
  }
})