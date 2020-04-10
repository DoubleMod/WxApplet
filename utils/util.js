const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getAccessToken: getAccessToken
}

var getAccessToken = function () {
console.log("ooookkkk")
  // var that = this
  // let APPID = "wx861a2d761e54d2f7"
  // let APPSECRET = "82e69ed352a00c625d733884037defde"
  // wx.request({
  //   url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
  //   method: 'GET',
  //   success: (res) => {
  //     console.log(res)
  //     console.log(res.data.access_token)
  //     that.setData({
  //       access_token: res.data.access_token
  //     })
  //   },
  //   fail: (res) => {
  //     console.log(res)
  //   },
  // })
}
