function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
  onReady: function(res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',

  data: {
    src: '',
    bindKeyInput: '',
    danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }
    ]
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  //发送弹幕
  bindSendDanmu: function() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  //播放
  bindPlay: function() {
    this.videoContext.play()
  },
  //暂停
  bindPause: function() {
    this.videoContext.pause()
  },
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  //获取视频
  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        wx.showToast({
          title: res.tempFilePath,
          icon: 'none'
        })
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  }
})