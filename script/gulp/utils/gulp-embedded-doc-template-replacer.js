'use strict'

const tap = require('gulp-tap')

module.exports = data => tap(file => {
  let content = file.contents.toString()

  content = content.replace(
    /(<!---\s*<%\s*)([\w.]+)(\s*--->\n)(.*)(\n?<!---\s*)([\w.]+)(\s*%>\s*--->)/gis,
    (fullMatch, openA, key, openB, content, closeA, _, closeB) => {
      if (key in data) {
        content = data[key]
      } else {
        return fullMatch
      }

      return openA + key + openB + content + closeA + key + closeB
    })

  file.contents = Buffer.from(content)
})
