//index.js
var util = require('../../utils/util.js')
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
  nyInfo: function (e) {
    console.log("success")
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
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
    util.getAccessToken(e)
    // var that = this;
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       that.setData({
    //         motto: res.code
    //       })
    //       wx.request({
    //         url: 'http://192.168.0.108:8900/syncOpenid',
    //         data: {
    //           code: res.code
    //         },
    //         success(res) {
    //           console.log(res.data)
    //           wx.showToast({
    //             title: res.data, //标题
    //             icon: 'none',
    //             duration: 2000
    //           })
    //           // that.setData({
    //           //   motto: res.data
    //           // })

    //         }
    //       })
    //     } else {
    //       console.log('login failed', +res.errMsg)
    //     }
    //   }
    // })
  }
})