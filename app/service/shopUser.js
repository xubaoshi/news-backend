module.exports = app => {
  class BannerService extends app.Service {
    *list() {
      const queryStr = `SELECT 
      shopUser.name AS username,
      shopUser.shopname,
      shopUser.provinceid,
      shopUser.provincename,
      shopUser.cityid,
      shopUser.images
  FROM
      web_shop_user AS shopUser;`
      let record = yield this.app.mysql.query(queryStr, '')
      return record
    }
  }
  return BannerService
}
