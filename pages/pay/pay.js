// miniprogram/pages/pay/pay.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    args: {
      fee: 1, // 支付金额，单位为分
      paymentArgs: 'A', // 将传递到功能页函数的自定义参数
      currencyType: 'USD' // 货币符号，页面显示货币简写 US$ 
    },
    nonceStr: "",
    package: "",
    paySign: "",
    signType: "",
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    timeStamp: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  transactionOrder: function() {
    var that = this;
    wx.login({
      success(res) {
        if (res.code) {
          var trade = Math.random().toString(15).substr(2, 10);
          wx.request({
            url: 'http://192.168.0.108:8900/pay/wx/doPay',
            method: 'post',
            data: {
              body: "测试支付",
              wxCode: res.code,
              totalFee: 0.01,
              outTradeNo: trade
            },
            success(res) {
              console.log(res.data)
              wx.showToast({
                title: trade, //标题
                icon: 'none',
                duration: 2000
              })

              that.setData({
                nonceStr: res.data.data.nonceStr,
                timeStamp: res.data.data.timeStamp,
                package: res.data.data.package,
                paySign: res.data.data.paySign,
                signType: res.data.data.signType
              })
            }
          })
        } else {
          console.log('login failed', +res.errMsg)
        }
      }
    })
  },
  // 用户支付
  requestPayment: function() {
    var that = this;
    // console.log(this.that.data);
    wx.requestPayment({
      'timeStamp': String(that.data.timeStamp),
      'nonceStr': that.data.nonceStr,
      'package': that.data.package,
      'signType': that.data.signType,
      'paySign': that.data.paySign,
      'success': function(res) {
        console.log(res);
      },
      'fail': function(res) {
        console.log('fail:' + JSON.stringify(res));
      },
      'complete': function(res) {
        //调用订阅消息
        wx.requestSubscribeMessage({
          tmplIds: ['SwD53z0XNpjHIOAN8GmRfPyAa6NpHML10vX49do7Szk'],
          success(res) {
            console.log(res)
          }
        })
      }
    })
  }
})