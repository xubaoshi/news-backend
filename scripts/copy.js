#!/usr/bin/env node

let fs = require('fs-extra')

let cssDir = './app/view/public/public/css'
let jsDir = './app/view/public/public/js'
let distCssDir = './app/public/css'
let distJsDir = './app/public/js'

let cleanDir = './app/view/public/public'

fs.removeSync(distCssDir)
fs.removeSync(distJsDir)
console.log('clean dist dir success')

fs.copy(cssDir, distCssDir, function(error) {
  if (error) {
    return console.error(error)
  }
  console.log('copy css to dist success')
  fs.copy(jsDir, distJsDir, function(error) {
    if (error) {
      return console.error(error)
    }
    console.log('copy js to dist dir success')
    fs.removeSync(cleanDir)
  })
})
