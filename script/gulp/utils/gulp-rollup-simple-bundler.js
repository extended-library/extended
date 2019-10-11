'use strict'

const path = require('path')
const assert = require('assert')
const rollup = require('rollup')
const license = require('rollup-plugin-license')
const terser = require('rollup-plugin-terser')
const pkgDir = require('pkg-dir')

module.exports = (gulp, options) => {
  assert(options, 'The variable "options" must be an object!')
  assert(options.task, '"options.task" must be non-empty string!')

  const task = options.task

  assert(options.name, '"options.name" must be non-empty string!')

  const name = options.name
  const cwd = options.cwd || pkgDir.sync()

  assert(options.input, '"options.input" must be an object!')

  const input = {
    cjs: options.input.cjs || options.input.default,
    esm: options.input.esm || options.input.default,
    umd: options.input.umd || options.input.default,
    amd: options.input.amd || options.input.default,
    iife: options.input.iife || options.input.default,
    system: options.input.system || options.input.default
  }

  assert(options.dist, '"options.dist" must be string!')

  const dist = options.dist

  let licenseContent = '<%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> @ <%= pkg.author %>'

  const version = options.version

  if (version) {
    licenseContent = `<%= pkg.name %> v${version} | <%= pkg.license %> @ <%= pkg.author %>`
  }

  const licenseOpts = {
    cwd,
    banner: {
      commentStyle: 'ignored',
      content: licenseContent
    }
  }

  // CommonJS ---------------------------------------------------------------------------------------------------------*
  gulp.task(`${task}:cjs`, async () => {
    const bundle = await rollup.rollup({
      input: input.cjs,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.cjs.js`),
      format: 'cjs'
    })
  })

  // ES Modules -------------------------------------------------------------------------------------------------------*
  gulp.task(`${task}:esm`, async () => {
    const bundle = await rollup.rollup({
      input: input.esm,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.esm.js`),
      format: 'esm'
    })
  })

  // UMD --------------------------------------------------------------------------------------------------------------*
  gulp.task(`${task}:umd`, async () => {
    const bundle = await rollup.rollup({
      input: input.umd,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.umd.js`),
      format: 'umd'
    })
  })

  gulp.task(`${task}:umd-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.umd,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.umd.min.js`),
      format: 'umd',
      sourcemap: true
    })
  })

  // AMD --------------------------------------------------------------------------------------------------------------*
  gulp.task(`${task}:amd`, async () => {
    const bundle = await rollup.rollup({
      input: input.amd,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.amd.js`),
      format: 'amd'
    })
  })

  gulp.task(`${task}:amd-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.amd,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.amd.min.js`),
      format: 'amd',
      sourcemap: true
    })
  })

  // IIFE -------------------------------------------------------------------------------------------------------------*
  gulp.task(`${task}:iife`, async () => {
    const bundle = await rollup.rollup({
      input: input.iife,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.iife.js`),
      format: 'iife'
    })
  })

  gulp.task(`${task}:iife-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.iife,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.iife.min.js`),
      format: 'iife',
      sourcemap: true
    })
  })

  // SystemJS ---------------------------------------------------------------------------------------------------------*
  gulp.task(`${task}:system`, async () => {
    const bundle = await rollup.rollup({
      input: input.system,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.system.js`),
      format: 'system'
    })
  })

  gulp.task(`${task}:system-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.system,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, `/${name}.system.min.js`),
      format: 'system',
      sourcemap: true
    })
  })

  // ------------------------------------------------------------------------------------------------------------------*
  return {
    name: task,
    tasks: [
      `${task}:cjs`,
      `${task}:esm`,
      `${task}:umd`,
      `${task}:umd-min`,
      `${task}:amd`,
      `${task}:amd-min`,
      `${task}:iife`,
      `${task}:iife-min`,
      `${task}:system`,
      `${task}:system-min`
    ]
  }
}
