// 官网新闻动态接口
module.exports = function * () {
  const response = { success: false, message: '操作失败' }
  let res = 'web_news'
  const tableList = yield this.service.tableinfo.index()
  if (res && this.helper.inarray(tableList, res)) {
    const result = yield this.service.restql.index(res, {},{status:1})
    if (result) {
      response.message = '操作成功'
      response.success = true
      response.data = result
    }
  }
  this.body = response
  this.status = 200
}