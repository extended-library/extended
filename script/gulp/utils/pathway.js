'use strict'

const p = require('path')
const pkg = require('pkg-dir')

const ROOT = pkg.sync()
const REGEX_ROOT = /(@)(?=\/)/g
const REGEX_PLACEHOLDER = /@([\w-_]+)/g

const placeholders = {
  root: () => ROOT,
  src: () => p.join(ROOT, '/src')
}

module.exports = (...paths) => {
  const processedPath = paths.map(path => {
    if (path === '@') {
      return placeholders.root()
    }

    path = path.replace(REGEX_ROOT, placeholders.root())
    path = path.replace(REGEX_PLACEHOLDER, (fullMatch, placeholder) => {
      const lowercasePlaceholder = placeholder.toLowerCase()

      switch (lowercasePlaceholder) {
        case 'root':
          return placeholders.root()

        case 'src':
          return placeholders.src()

        default:
          throw new Error(`Cannot found path for placeholder "${fullMatch}".`)
      }
    })

    return path
  })

  return p.normalize(processedPath.join(''))
}
