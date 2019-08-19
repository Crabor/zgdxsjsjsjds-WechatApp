App({
  onLaunch: function () {
    console.log("app onlaunch");
    var that = this;
    wx.getStorage({
      key: 'scan_UUID',
      success: function (res) {
        that.globalData.UUID = res.data;
        console.log("getUUID: ", that.globalData.UUID);
      },
      fail: function (res) {
      }
    }),

      wx.getStorage({
        key: 'user',
        success: function (res) {
          that.globalData.user = res.data;
          console.log("user: ", that.globalData.user);
        },
        fail: function (res) {
        }
      }),
      wx.getStorage({
        key: 'key',
        success: function (res) {
          that.globalData.key = res.data;
          console.log("key: ", that.globalData.key);
        },
        fail: function (res) {
        }
      })

    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model);
        that.globalData.model = res.model;
        that.globalData.con_x = res.windowWidth;
        that.globalData.con_y = res.windowHeight;
      }
    })
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  }
  ,getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }
  //get locationInfo
  ,getLocationInfo: function(cb){
    var that = this;
    if(this.globalData.locationInfo){
        cb(this.globalData.locationInfo)
    }else{
        wx.getLocation({
          type: 'gcj02', 
          success: function(res){
            that.globalData.locationInfo = res;
            cb(that.globalData.locationInfo)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
  }

  ,globalData:{
    userInfo:null
    ,locationInfo: null
    ,senes: -1
    ,con_x: 100
    ,con_y: 100
    ,UUID: ""
    ,islock: false
    , bleicon:"choose_con"
    ,ble_in:""
    ,bleopacity:0.5
    ,serviceId:""
    ,characteristicId:""

    ,ble_in_health:100
    ,ble_in_chargecycle: 0
    ,ble_in_temp_mos:0
    ,ble_in_temp_bat:0
    ,ble_in_speed: 0
    ,ble_in_bat: 0

    ,key:""
    ,user:""

    ,model:""

    ,ip:""
  }
})