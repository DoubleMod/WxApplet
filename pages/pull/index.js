import subscribe from '../../utils/SubscribeMessageUtil'

Page({
  data: {
    src: ''
  },
  //点击订阅代码
  subscriptionNotice: function() {
    wx.requestSubscribeMessage({
      tmplIds: ['SwD53z0XNpjHIOAN8GmRfPyAa6NpHML10vX49do7Szk',
        'CbohoFAIJwfwjOhbwmi5Ff3SPuX3tbnmW8vwaghX32k'
      ],
      success(res) {
        console.log(res)
      }
    })
  },
  //点击订阅代码
  pushMsg: function() {
    wx.request({
      url: 'http://192.168.0.108:8900/pushOneUser',
      data: {
        code: 'ccc'
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
      },
      fail(res) {
        wx.showToast({
          title: '推送失败', //标题
          icon: 'none',
          duration: 2000
        })
        console.log(res.data)
      }
    })
  },
  getHDPic: function() {
    // 微信官方例子
    let that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        that.src = res.tempFilePaths;
        console.log(that.src);
        // that.$apply();
      }
      // wx.chooseImage({
      //   success(res) {
      //     console.log('hit')
      //     const tempFilePaths = "C:\Users\ScreamCute\Desktop\QctqpF0Ll5LDuELvF6QswFuEl8C7kBd8KEfMx8IOTwbmsjigz5pYqt0KHIdboBpv.jpg"
      //     // const tempFilePaths = res.tempFilePaths

      //     console.log(tempFilePaths)
      //     wx.uploadFile({
      //       url: '192.168.0.108:8200/fastDFSClient/uploadImageAndCrtThumbImage', //仅为示例，非真实的接口地址
      //       filePath: tempFilePaths,
      //       // filePath: tempFilePaths[0],
      //       name: 'file',
      //       formData: {
      //         'user': 'test'
      //       },
      //       success(res) {
      //         wx.showToast({
      //           title: 'ok',
      //           icon: 'none'
      //         })
      //         const data = res.data
      //         //do something
      //       },fail(res){
      //         wx.showToast({
      //           title: 'fail',
      //           icon: 'none'
      //         })
      //       }
      //     })
      //   }
    })

  }


})