module.exports = function*() {
  const response = { success: false, message: '操作失败' }
  const result = yield this.service.shopUser.list()
  if (result) {
    response.message = '操作成功'
    response.success = true
    response.data = result
  }
  this.body = response
  this.status = 200
}
;('use strict')
// 用户登录
module.exports = app => {
  class ShopUserController extends app.Controller {
    *index() {
      const response = { success: false, message: '操作失败' }
      const result = yield this.service.shopUser.list()
      if (result) {
        response.message = '操作成功'
        response.success = true
        response.data = result
      }
      this.body = response
      this.status = 200
    }
    *citys() {
      const response = { success: false, message: '操作失败' }
      const result = yield this.service.shopUser.citys()
      if (result) {
        response.message = '操作成功'
        response.success = true
        response.data = result
      }
      this.body = response
      this.status = 200
    }
  }
  return ShopUserController
}
