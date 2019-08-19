// store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UUID : "N000000",
    movies: [
      { url:'http://nyxplanet-appstorelogo.stor.sinaapp.com/storetop.png' },
    ],
    images: [
      {
        id: '1',
        src:'http://t1.aixinxi.net/o_1d83vpuhdbq21fct28t19nufb9a.png-w.jpg',
        name: '溢奶呛奶预警',
        data: '3元/月'
      }, {
        id: '2',
        src:'http://t1.aixinxi.net/o_1d840127s15ed1ffj3k51e4n998a.png-w.jpg',
        name: '宝宝踢被子提醒',
        data: '5元/月'
      }, {
        id: '3',
        src:'http://t1.aixinxi.net/o_1d84023sl1p4m1kf116qtkgq1lfa.png-w.jpg',
        name: '宝宝发热检测',
        data: '1元/月'
      }, {
        id: '4',
        src:'http://t1.aixinxi.net/o_1d8402kkc1u81rhb3ar15s7vpka.png-w.jpg',
        name: '宝宝清醒提醒',
        data: '1.5元/月'
      }, {
        id: '5',
        src:'http://t1.aixinxi.net/o_1d8403286veciti1r4918341d8ma.png-w.jpg',
        name: '宝宝哭声翻译',
        data: '8元/月'
      },
    ],
    //解析消息后的商品列表
    items:[

    ],
    //定时器,用以有安装中的应用时，每隔一段时间不断请求服务器数据，直到没有安装中的应用
    setInter:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //刷新完成后停止下拉刷新动效
    wx.stopPullDownRefresh();
    //获取applist，刷新items数据
    var that=this;
    wx.request({
      url: 'https://nyxplanet.applinzi.com/AppList',
      header:{
        'content-type': 'application/json'
      },
      method:'POST',
      data: that.data.UUID,
      success:function(res){
        that.analysData(res.data);
      },
      fail:function(res){

      }
    })
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
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.onLoad();
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

  },

  //解析服务器返回消息
  analysData:function(data){
    var i=0;
    var itm = new Array();
    var sepaBeginIndex,sepaEndIndex;

    //判断是否有正在安装的应用，如果没有，关闭定时器
    if(data.WaitApp=='none'){
      this.endSetInter();
    }

    for(var key in data.App){
      var object=new Object();
      object.id=key;
      //分割应用名和地址
      sepaBeginIndex=data.App[key].search("<");
      object.name = data.App[key].slice(0,sepaBeginIndex);
      sepaEndIndex = data.App[key].search(">");
      object.url=data.App[key].slice(sepaEndIndex+1);
      //查找key是否存在AppList中或是否正在安装
      if(data.AppList.indexOf(key)>-1){
        object.status=1;//存在
      } else {
        object.status = 0;//不存在
      }
      if(data.WaitApp==key){
        console.log("had")
        object.status=-1;//安装中
      }
      itm[i]=object;
      i++;
    }
    this.setData({
      items:itm
    })
  },

  //推送app
  newApp:function(e){
    console.log(e.currentTarget.id)
    var newapp = this.data.UUID + '=' + e.currentTarget.id +'=New';
    //post UUID=AppID=New给服务器
    var that = this;
    wx.request({
      url: 'https://nyxplanet.applinzi.com/NewApp',
      data: newapp,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function(res) {
        //获取applist，刷新items数据
        wx.request({
          url: 'https://nyxplanet.applinzi.com/AppList',
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          data: that.data.UUID,
          success: function (res) {
            that.analysData(res.data);
          },
          fail: function (res) {

          }
        });
        //开启定时器
        //this.startSetInter();
      },
      fail: function(res) {
        wx.showToast({
          title: '设备未绑定',
          image: '../../res/images/close-circle.png',
          duration: 2000
        })
      },
      complete: function(res) {},
    })
  },

  //应用app
  useApp:function(e){
    console.log(e.currentTarget.id)
    var useapp = this.data.UUID + '=' + e.currentTarget.id + '=Use';
    //post UUID=AppID=Use给服务器
    wx.request({
      url: 'https://nyxplanet.applinzi.com/AppList',
      data: useapp,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '设备未绑定',
          image: '../../res/images/close-circle.png',
          duration: 2000
        })
      },
      complete: function (res) { },
    })
  },

  //开启定时器
  startSetInter: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        //获取applist，刷新items数据
        var that = this;
        wx.request({
          url: 'https://nyxplanet.applinzi.com/AppList',
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          data: 'N000000',
          success: function (res) {
            that.analysData(res.data);
          },
          fail: function (res) {

          }
        })
      }
      , 2000);
  },

  //关闭定时器
  endSetInter: function () {
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)
  }

})