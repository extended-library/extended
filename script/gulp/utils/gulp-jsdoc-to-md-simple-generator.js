'use strict'

const tap = require('gulp-tap')
const jsdoc2md = require('jsdoc-to-markdown')

module.exports = (options) => tap(file => {
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

  const output = jsdoc2md.renderSync({
    source: file.contents.toString(),
    plugin,
    'heading-depth': headingDepth,
    // https://github.com/jsdoc2md/jsdoc-to-markdown/issues/110
    'no-gfm': true
  })

  file.basename = 'API.md'
  file.contents = Buffer.from(output)
})
