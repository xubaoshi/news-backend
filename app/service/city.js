module.exports = app => {
  class CityService extends app.Service {
    *citys() {
      const queryStr = `select city.cityid,city.provinceid,city.city,province.province from web_cities as city
      inner join web_provinces as province on city.provinceid = province.provinceid;`
      let record = yield this.app.mysql.query(queryStr, '')
      return record
    }
  }
  return CityService
}
