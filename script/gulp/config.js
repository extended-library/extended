'use strict'

const gulp = require('gulp')
const rollup = require('rollup')
const path = require('./utils/pathway')

gulp.task('build', async () => {
  const bundle = await rollup.rollup({
    input: path('@src/index.js'),
    plugins: []
  })

  await bundle.write({
    file: path('@root/dist/library.js'),
    format: 'umd',
    name: 'library',
    sourcemap: true
  })
})
