var app = getApp()
var newmarkers = [{
  id: 0
  , iconPath: "../../res/images/now.png"
  , longitude: 0
  , latitude: 0
  , width: 45
  , height: 45
}];

Page({
  data: {
    map_width: 380 ,
    map_height: 480 ,
    scale: 16 ,
    con_x: getApp().globalData.con_x,
    con_y: getApp().globalData.con_y,
    page_center_lng:0,
    page_center_lat:0
  },

  getnewlocation: function(){
    var that = this;
    app.getLocationInfo(function (locationInfo) {
      newmarkers[0].latitude = locationInfo.latitude;
      newmarkers[0].longitude = locationInfo.longitude;
      that.setData({
        longitude: locationInfo.longitude,
        latitude: locationInfo.latitude,
        page_center_lng: locationInfo.longitude,
        page_center_lat: locationInfo.latitude,
        markers: newmarkers
      })
      console.log('getnewlocation'+locationInfo);
      that.to_sr();
      //that.loadCity(that.data.longitude, that.data.latitude);
    })
  },

  click_loc: function () {
    this.getnewlocation();
    this.setData({
      scale: 16
    });
  },

  controltap: function(e){
    if (e.controlId==1){
      this.click_loc();
    }
    if (e.controlId == 2) {
      this.click_sr();
    }
  },

  marktap: function (e) {
    var that = this;
    that.setData({
      controls: [{
        id: 1,
        iconPath: '../../res/images/loc.png',
        position: {
          left: that.data.con_x-78,
          top: that.data.con_y - 160,
          width: 58,
          height: 56
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: '../../res/images/search.png',
        position: {
          left: 20,
          top: that.data.con_y - 160,
          width: 58,
          height: 56
        },
        clickable: true
      },
      {
        id: 3,
        iconPath: '../../res/images/map_upload.png',
        position: {
          left: that.data.con_x / 12,
          top: that.data.con_x / 12,
          width: that.data.con_x / 6 * 5,
          height: that.data.con_x / 3
        },
        clickable: false,
      },
      {
        id: 4,
        iconPath: '../../res/images/loading.gif',
        position: {
          left: that.data.con_x / 3 + 1,
          top: that.data.con_x / 12 + 1,
          width: that.data.con_x / 3 - 2,
          height: that.data.con_x / 3 - 2
        },
        clickable: false,
      }
      ]
    })
    if (e.markerId != 0) {
      var i;
      for (i = 1; newmarkers[i].id != e.markerId; i++) { }
      wx.downloadFile({
        url: newmarkers[i].web,
        type: 'image/png',
        success: function (res) {
          if (res.statusCode === 200) {
            console.log(res);
            that.setData({
              controls: [{
                id: 1,
                iconPath: '../../res/images/loc.png',
                position: {
                  left: that.data.con_x - 78,
                  top: that.data.con_y - 160,
                  width: 58,
                  height: 56
                },
                clickable: true
              },
                {
                  id: 2,
                  iconPath: '../../res/images/search.png',
                  position: {
                    left: 20,
                    top: that.data.con_y - 160,
                    width: 58,
                    height: 56
                  },
                  clickable: true
                },
              {
                id: 3,
                iconPath: '../../res/images/map_upload.png',
                position: {
                  left: that.data.con_x / 12,
                  top: that.data.con_x / 12,
                  width: that.data.con_x / 6 * 5,
                  height: that.data.con_x / 3
                },
                clickable: false,
              },
              {
                id: 4,
                iconPath: res.tempFilePath,
                position: {
                  left: that.data.con_x / 12 + 1,
                  top: that.data.con_x / 12+1,
                  width: that.data.con_x / 6*5-2,
                  height: that.data.con_x / 3 - 2
                },
                clickable: false,
              }
              ]
            })
          }
        },
        failed:function(res){
          console.log("failed");
        }
      })
    }
  },

  /*loadCity: function (longitude, latitude) {
    var page = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=m7ApG03rvcn0llZfQ8fAnC7QRx1ULO6Q&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // success    
        console.log(res.data.result.addressComponent);
        var city = res.data.result.addressComponent.city;
      },
      fail: function () {
        page.setData({ currentCity: "fail" });
      },

    })
  },*/

  click_sr: function(){
    wx.showToast({
      title: "",
      icon: 'loading',
      duration: 1000
    });
    this.to_sr();
  },

  to_sr: function () {
    console.log("start post")
    var that = this
    if (getApp().globalData.user.length == 0){
      getApp().globalData.user='pre';
      getApp().globalData.key='pre';
    }//注册试用用户（禁止自动刷新）

    //console.log('https://honeycomb.applinzi.com/hive/usr/' + getApp().globalData.user + '/' + getApp().globalData.key + '/' + that.data.page_center_lng + '/' + that.data.page_center_lat);

    wx.request({
      //url: 'https://honeycomb.applinzi.com/hive/usr/' + getApp().globalData.user + '/' + getApp().globalData.key + '/' + that.data.page_center_lng + '/' + that.data.page_center_lat,
      url: 'https://powerhive.chinacloudsites.cn/',
      data:'map',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.length > 1) {
          while (newmarkers.length > 1) {
            newmarkers.pop();
            console.log(newmarkers);
          }
          for (var i = 1; i <= res.data[0]; i++) {
            newmarkers.push(res.data[i]);
            that.setData({
              markers: newmarkers
            })
            console.log(newmarkers);
          }
        }else{
          wx.showToast({
            title: "登录账号密码错误",
            icon: 'none',
            duration: 1000
          });
        }
      },
      failed: function (){
        wx.showToast({
          title: "无法连接到服务器",
          icon: 'none',
          duration: 1000
        });
      }
    })
  },

  onLoad: function (){
    var that = this;
    // 动态设置map的宽和高
    this.setData({
      map_width: this.data.con_x
      , map_height: this.data.con_y
      , controls: [{
        id: 1,
        iconPath: '../../res/images/loc.png',
        position: {
          left: that.data.con_x - 78,
          top: that.data.con_y - 160,
          width: 58,
          height: 56
        },
        clickable: true
      },
        {
          id: 2,
          iconPath: '../../res/images/search.png',
          position: {
            left: 20,
            top: that.data.con_y - 160,
            width: 58,
            height: 56
          },
          clickable: true
        },
      {
        id: 3,
        iconPath: '../../res/images/map_upload.png',
        position: {
          left: that.data.con_x / 12,
          //top: that.data.con_x / 12,
          top: -1000,
          width: that.data.con_x / 6 * 5,
          height: that.data.con_x / 3
        },
        clickable: false,
      },
      {
          id: 4,
          iconPath: '../../res/images/loading.gif',
          position: {
            left: that.data.con_x / 3+1,
            //top: that.data.con_x / 12+1,
            top: -1000,
            width: that.data.con_x / 3-2,
            height: that.data.con_x / 3-2
          },
          clickable: false,
        }
      ]
    })
    console.log("load ok");
    that.getnewlocation();
  },

  regionchange(e) {
    var that = this
    if (e.type=='begin'){
      that.setData({
        controls: [{
          id: 1,
          iconPath: '../../res/images/loc.png',
          position: {
            left: that.data.con_x - 78,
            top: that.data.con_y - 160,
            width: 58,
            height: 56
          },
          clickable: true
        },
          {
            id: 2,
            iconPath: '../../res/images/search.png',
            position: {
              left: 20,
              top: that.data.con_y - 160,
              width: 58,
              height: 56
            },
            clickable: true
          },
        {
          id: 3,
          iconPath: '../../res/images/map_upload.png',
          position: {
            left: that.data.con_x / 12,
            top: -1000,
            width: that.data.con_x / 6 * 5,
            height: that.data.con_x / 3
          },
          clickable: false,
        },
        {
          id: 4,
          iconPath: '../../res/images/loading.gif',
          position: {
            left: that.data.con_x / 12 + 1,
            top: -1000,
            width: that.data.con_x / 6 * 5 - 2,
            height: that.data.con_x / 3 - 2
          },
          clickable: false,
        }
        ]
      })
    }
    if (e.type == 'end') {
      that.mapCtx = wx.createMapContext("map4select");
      that.mapCtx.getCenterLocation({
        success: function (res) {
          newmarkers[0].latitude = res.latitude;
          newmarkers[0].longitude = res.longitude;//重制中心坐标
          that.setData({
            page_center_lng: res.longitude,
            page_center_lat: res.latitude,
            //markers: newmarkers//取消后中心点更快刷新
          })
          //console.log("change latitude and longtitude");
          that.to_sr()
        }
      })
    }
  },

  onShow: function (){
    var that = this;
    this.click_loc();
    getApp().globalData.senes = 0;
  },
})