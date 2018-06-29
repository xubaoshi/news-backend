const moment = require('moment')

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow()
exports.inarray = (arr, obj) => {
  let i = arr.length
  while (i--) {
    if (arr[i] === obj) {
      return true
    }
  }
  return false
}
