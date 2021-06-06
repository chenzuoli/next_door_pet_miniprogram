// request get 请求
const getData = (url, param) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync("token")
      },
      data: param,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

// request post 请求
const postData = (url, param) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: param,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "token": wx.getStorageSync("token")
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        console.log(err)
        reject(err)
      }
    })
  })
}

// loading加载提示
const showLoading = () => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
      mask: true,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

// 关闭loading
const hideLoading = () => {
  return new Promise((resolve) => {
    wx.hideLoading()
    resolve()
  })
}

module.exports = {
  getData,
  postData,
  showLoading,
  hideLoading
}