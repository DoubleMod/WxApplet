import subscribe from '../../utils/SubscribeMessageUtil'

Page({
  data: {

  },
  //点击订阅代码
  subscriptionNotice: function() {
    wx.requestSubscribeMessage({
      tmplIds: ['SwD53z0XNpjHIOAN8GmRfPyAa6NpHML10vX49do7Szk',
        'CbohoFAIJwfwjOhbwmi5Ff3SPuX3tbnmW8vwaghX32k'
      ],
      success(res) {
        console.log("1515151515")
      }
    })
  },
  //点击订阅代码
  pushMsg: function() {
    wx.request({
      url: 'http://192.168.0.108:8900/pushOneUser',
      data: {
        code:'ccc'
      },
      success(res) {
        console.log(res.data)
        wx.showToast({
          title: '推送成功', //标题
          icon: 'none',
          duration: 2000
        })
        // that.setData({
        //   motto: res.data
        // })
      }
      ,
      fail(res) {
        wx.showToast({
          title: '推送失败', //标题
          icon: 'none',
          duration: 2000
        })
        console.log(res.data)
      }
    })
  }


})