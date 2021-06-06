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
  },
})
