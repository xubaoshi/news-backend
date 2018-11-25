'use strict'

const fs = require('fs')
const path = require('path')
const sendToWormhole = require('stream-wormhole')

module.exports = function*() {
  const _this = this
  const fileStr = this.request.body.fileName
  const files = fileStr.split(',')
  files.forEach(item => {
    const fromPath = path.join(
      this.app.config.baseDir,
      `app/public/tempUploads/${item}`
    )
    const toPath = path.join(
      this.app.config.baseDir,
      `app/public/uploads/${item}`
    )
    if (fs.existsSync(fromPath)) {
      fs.rename(fromPath, toPath, function(err) {
        if (err) {
          console.log(err)
        }
      })
    }
  })
}
