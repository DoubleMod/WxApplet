//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'openid',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'

    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  subscribeMessages: function(e) {
    console.log(e)
    wx.requestSubscribeMessage({
      tmplIds: [
        'SwD53z0XNpjHIOAN8GmRfPyAa6NpHML10vX49do7Szk',
        'CbohoFAIJwfwjOhbwmi5Ff3SPuX3tbnmW8vwaghX32k'
      ],
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  syncOpenid: function(e) {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          that.setData({
            motto: res.code
          })
          wx.request({
            url: 'http://192.168.0.108:8900/syncOpenid',
            data: {
              code: res.code
            },
            success(res) {
              console.log(res.data)
              wx.showToast({
                title: res.data, //标题
                icon: 'none',
                duration: 2000
              })
              // that.setData({
              //   motto: res.data
              // })

            }
          })
        } else {
          console.log('login failed', +res.errMsg)
        }
      }
    })
  }
})