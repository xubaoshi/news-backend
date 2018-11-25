module.exports = app => {
  class BannerService extends app.Service {
    *list() {
      const queryStr = `select banner.images from web_banner as banner;`
      let record = yield this.app.mysql.query(queryStr, '')
      return record
    }
  }
  return BannerService
}
