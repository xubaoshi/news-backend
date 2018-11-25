module.exports = function*() {
  const response = { success: false, message: '操作失败' }
  const result = yield this.service.banner.list()
  if (result) {
    response.message = '操作成功'
    response.success = true
    response.data = result
  }
  this.body = response
  this.status = 200
}
