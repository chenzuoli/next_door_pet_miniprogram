// pages/photography/photography.js

var userUtil = require('../../utils/userUtil')
var get_photographies_url = 'https://pipilong.pet:7449/photography/get_photographies'

Page({

  /**
   * Page initial data
   */
  data: {
    work: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // 小程序分享
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    // var work_id = options.id
    this.getPhotographies()
  },

  // 获取摄影作品列表
  getPhotographies() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: get_photographies_url,
        method: 'get',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          this.getAuthorAvatars(result.data.data)
          resolve(result)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getAuthorAvatars(work) {
    console.log(work)
    work.forEach(element => {
      userUtil.getUserInfo(element.open_id).then((res) => {
        element.avatar_url = res.avatar_url
        this.setData({
          work: work
        })
      })
    })
  },

  dataInfo(data) {
    var work = JSON.stringify(data.currentTarget.dataset.work)
    wx.navigateTo({
      url: '../photography_info/moments?work=' + work,
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})