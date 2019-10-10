'use strict'

const tap = require('gulp-tap')

module.exports = callback => tap(file => {
  callback(file.contents.toString(), file)
})
