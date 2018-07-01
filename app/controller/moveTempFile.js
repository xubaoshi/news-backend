'use strict'

const fs = require('fs')
const path = require('path')
const sendToWormhole = require('stream-wormhole')

module.exports = function * () {
  const _this = this;
  const fromPath = path.join(
    this.app.config.baseDir,
    `app/public/tempUploads/${this.request.body.fileName}`
  )
  const toPath = path.join(
    this.app.config.baseDir,
    `app/public/uploads/${this.request.body.fileName}`
  )
  if(fs.existsSync(fromPath)) {
    fs.rename(fromPath, toPath, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }
}
