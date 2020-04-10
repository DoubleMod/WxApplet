var util = require('../../utils/util.js')
Page({
  data: {
    src: ""
  },
  gotoShow: function() {
    var _this = this
    var urll = "";
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        
        wx.request({
          url: 'http://127.0.0.1:8900/HDPic',
          data:{
            pic:""
          },
          method:"get",
          success: function (res) {
            console.log(" request ok")
            urll =res.data
            console.log(urll)
          },fail(){
            console.log("request fail")
          }
        })
        // success
        console.log(res)
        _this.setData({
          src: res.tempFilePaths
        })
        var tempFilePaths= res.tempFilePaths
        wx.uploadFile({
          url: "hhttps://api.weixin.qq.com/cgi-bin/media/get?access_token=31_c9qBdmoOH-YllFJczPy_qZglxuEM7v52V0Q2dx6fkgHtIjMAT-Ra8VeeYQhsP3c6ABW3QyQh7LQ0HQ1Vq7jPOsu2m5tyxydn2eFPXtFPl3ARxzm-q8FMA4OluxJH7CBP1crJOjlXVnbb96pJCBQbAJAKJY", //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'img',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
          },
          formData: {
            'user': 'test' //其他额外的formdata，可不写 
          },
          fail: function (res) {
            console.log(' uploadFile fail');
          },
          success: function (res) {
            var data = res.data;
            console.log(data);
            console.log(' uploadFile ok');
          },
        }
        )
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      imgUrl: e.detail.value
    })
  },
})