module.exports = app => {
  class ShopUserService extends app.Service {
    *userList() {
      const queryStr = `
    SELECT 
        shopUser.name AS username,
        shopUser.shopname,
        shopUser.provinceid,
        shopUser.provincename,
        shopUser.cityid,
        shopUser.images,
        shopUser.area
    FROM
        web_shop_user AS shopUser
    WHERE
        shopUser.status = 1;
      `
      let record = yield this.app.mysql.query(queryStr, '')
      return record
    }
    *cityList() {
      const queryStr = `
      SELECT 
          shopUser.cityid AS cityid, shopUser.cityname AS cityname
      FROM
          web_shop_user AS shopUser
      WHERE
          shopUser.status = 1
      GROUP BY shopUser.cityid;
      `
      let record = yield this.app.mysql.query(queryStr, '')
      return record
    }
  }
  return ShopUserService
}
