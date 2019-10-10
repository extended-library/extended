'use strict'

const gulp = require('gulp')
const path = require('../utils/pathway')
const generator = require('../utils/gulp-jsdoc-to-md-simple-generator')
const content = require('../utils/gulp-tap-content')
const replacer = require('../utils/gulp-embedded-doc-template-replacer')

gulp.task('doc:readme', async () => {
  let api

  await new Promise(resolve => {
    gulp
      .src(path('@src/index.js'))
      .pipe(generator({
        headingDepth: 3,
        plugin: '@richrdkng/dmd-plugin-simple-nodejs-project'
      }))
      .pipe(content(content => { api = content }))
      .on('finish', resolve)
  })

  gulp
    .src(path('@root/README.md'))
    .pipe(replacer({ api }))
    .pipe(gulp.dest(path('@root/')))
})

gulp.task('doc:api', async () => {
  gulp
    .src(path('@src/index.js'))
    .pipe(generator('@richrdkng/dmd-plugin-simple-nodejs-project'))
    .pipe(gulp.dest(path('@root/doc/')))
})

gulp.task('doc', gulp.parallel('doc:readme', 'doc:api'))
