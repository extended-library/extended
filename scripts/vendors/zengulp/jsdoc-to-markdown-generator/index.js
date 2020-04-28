'use strict'

const fs = require('fs')
const path = require('path')
const tap = require('gulp-tap')
const jsdoc2md = require('jsdoc-to-markdown')

function generate (options, source) {
  let plugin = []

  if (typeof options === 'string') {
    plugin = options
  }

  options = options && typeof options === 'object' ? options : {}

  if (options.plugin) {
    plugin = options.plugin
  }

  let headingDepth = 2

  if (options.headingDepth) {
    headingDepth = options.headingDepth
  }

  return jsdoc2md.renderSync({
    source,
    plugin,
    'heading-depth': headingDepth,
    // https://github.com/jsdoc2md/jsdoc-to-markdown/issues/110
    'no-gfm': true,
    // https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/docs/API.md#jsdoc2mdgetjsdocdataoptions--promise
    'no-cache': true
  })
}

function pipe (options) {
  return tap(async file => {
    file.basename = options.rename || 'doc.md'
    file.contents = Buffer.from(generate(options, file.contents.toString()))
  })
}

pipe.fromFile = (filePath, options) => {
  const content = fs.readFileSync(path.normalize(filePath), 'utf-8')
  return generate(options, content)
}

module.exports = pipe
