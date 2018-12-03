exports.list = function*() {
  const response = { success: false, message: '操作失败' }
  const users = yield this.service.shopUser.userList()
  const userMap = {}
  if (users && users.length > 0) {
    users.forEach(user => {
      const images = user.images ? user.images.split(',') : []
      if (images.length > 0) {
        if (images.length >= 1) {
          user['image'] = images[0]
          user['moreImages'] = images.slice(1, images.length)
        } else {
          user['image'] = images[0]
        }
      }
      if (userMap[user.cityid] && userMap[user.cityid].length > 0) {
        userMap[user.cityid].push(user)
      } else {
        userMap[user.cityid] = [user]
      }
    })
    response.message = '操作成功'
    response.success = true
    response.data = userMap
  }
  this.body = response
  this.status = 200
}
// 2 根据ID获取内容信息
exports.cityList = function*() {
  const response = { success: false, message: '操作失败' }
  const result = yield this.service.shopUser.cityList()
  if (result) {
    response.message = '操作成功'
    response.success = true
    response.data = result
  }
  this.body = response
  this.status = 200
}
