'use strict'

const gulp = require('gulp')
const bundler = require('../utils/gulp-rollup-simple-bundler')
const path = require('../utils/pathway')

const bundle = bundler(gulp, {
  task: 'bundle',
  name: 'duration',
  version: process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION,
  input: {
    default: path('@src/bundle.js'),
    esm: path('@src/index.js')
  },
  dist: path('@root/dist/')
})

gulp.task(bundle.name, gulp.parallel(bundle.tasks))
