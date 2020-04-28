'use strict'

const { task, src, dest, series, parallel } = require('gulp')

const path = require('@nodewell/path')
const debug = require('gulp-debug')
const generator = require('./vendors/zengulp/jsdoc-to-markdown-generator')
const replacer = require('./vendors/zengulp/embedded-doc-template-replacer')
const bundler = require('./vendors/zengulp/rollup-bundler')

const plugin = '@richrdkng/dmd-plugin-simple-nodejs-project'

task('copy-files', async () => {
  src([
    path('@/README*'),
    path('@/LICENSE*')
  ])
    .pipe(debug())
    .pipe(dest(path('@/dist')))
})

task('build:docs:api', async () => {
  src(path('@/src/index.js'))
    .pipe(generator({ rename: 'API.md', plugin }))
    .pipe(dest(path('@/docs')))
})

task('build:docs:readme', async () => {
  src(path('@/README*'))
    .pipe(replacer({ API: generator.fromFile(path('@/src/index.js'), { plugin }) }))
    .pipe(dest(path('@')))
})

task(...bundler('build:bundle', {
  name: 'duration',
  version: process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION,
  input: {
    default: path('@/src/bundle.js'),
    esm: path('@/src/index.js')
  },
  dist: path('@/dist/')
}))

task('build',
  series(
    'build:docs:readme',
    parallel(
      'copy-files',
      'build:docs:api',
      'build:bundle'
    )
  )
)
