'use strict'

const gulp = require('gulp')
const bundler = require('../utils/gulp-rollup-simple-bundler')
const path = require('../utils/pathway')

const bundle = bundler(gulp, {
  task: 'build',
  name: 'duration',
  input: {
    default: path('@src/bundle.js'),
    esm: path('@src/index.js')
  },
  dist: path('@root/dist/')
})

gulp.task(bundle.name, gulp.parallel(bundle.tasks))
