// pages/moments/moments.js

var get_photography_url = "https://pipilong.pet:7449/photography/get_photography_by_id"
var get_vote_url = "https://pipilong.pet:7449/photography/get_vote_by_id"
var get_comments_url = "https://pipilong.pet:7449/photography/get_comments"
var api = require("../../api/api")
var userUtil = require("../../utils/userUtil")
Page({

  /**
   * Page initial data
   */
  data: {
    work: '',
    author_avatar_url: '',
    comments: []
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

    var work = JSON.parse(options.work)
    console.log(work)
    this.getPhotography(work.id)
    this.getAuthorAvatar(work.open_id)
    this.getComments(work.id)
  },

  getPhotography(work_id) {
    var that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: get_photography_url,
        data: {
          id: work_id
        },
        method: 'get',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          that.setData({
            work: result.data.data
          })
          resolve(result)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getAuthorAvatar(open_id) {
    var that = this
    userUtil.getUserInfo(open_id).then((res) => {
      that.setData({
        author_avatar_url: res.avatar_url
      })
    })
  },

  getComments(work_id) {
    api.getData(get_comments_url, {
      photography_id: work_id
    }).then((res) => {
      this.getCommenterAvatar(res.data)
    })
  },

  getCommenterAvatar(comments) {
    comments.forEach(comment => {
      userUtil.getUserInfo(comment.open_id).then((res) => {
        console.log(res.avatar_url)
        comment.avatar_url = res.avatar_url
        this.setData({
          comments: comments
        })
      })
    });
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