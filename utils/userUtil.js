var util = require('../api/api')
var getUserInfoUrl = "https://pipilong.pet:7449/photography/get_user_by_open_id"

const getUserInfo = open_id => {
  return new Promise((resolve, reject) => {
    util.postData(getUserInfoUrl, {
      open_id: open_id
    }).then((res) => {
      if (res.data != null) {
        resolve(res.data)
      } else {
        reject("查询用户信息失败")
      }
    })
  })
}

module.exports = {
  getUserInfo
}