// app.js
var login_url = 'https://pipilong.pet:7449/photography/open_id'
const api = require('./api/api.js')

App({
  // 全局数据中暴露用户信息和api
  globalData: {
    userInfo: {
      phone: "",
      open_id: "",
      union_id: "",
      token: "",
    },
    api
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    }),
  
    // 登录
    wx.login({ // 登录
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success: res => {
        wx.request({
          url: login_url,
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            js_code: res.code
          },
          success(res) {
            console.log("login success.")
            console.log(res.data)
            //必须先清除，否则res.header['Set-Cookie']会报错
            wx.removeStorageSync('sessionid');
            //储存res.header['Set-Cookie']
            wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
            wx.setStorageSync('open_id', res.data.data.open_id)
          },
          fail(err) {
            console.log("login failed.")
          }
        });
      }
    });
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
  
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('isFirst', res.userInfo)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
})
