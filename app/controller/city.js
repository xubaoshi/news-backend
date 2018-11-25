module.exports = function*() {
  const response = { success: false, message: '操作失败' }
  const result = yield this.service.city.citys()
  const citys = []
  if (result) {
    // 处理 city 集合
    if (result && result.length > 0) {
      result.forEach(city => {
        const index = citys.findIndex(item => {
          return city.provinceid === item.value
        })
        if (index !== -1) {
          citys[index]['children'].push({
            label: city.city,
            value: city.cityid
          })
        } else {
          const children = [{ label: city.city, value: city.cityid }]
          citys.push({
            label: city.province,
            value: city.provinceid,
            children
          })
        }
      })
    }
    response.message = '操作成功'
    response.success = true
    response.data = citys
  }
  this.body = response
  this.status = 200
}
