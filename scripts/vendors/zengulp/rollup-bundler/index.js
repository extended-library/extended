'use strict'

const { task, parallel } = require('gulp')

const path = require('path')
const assert = require('assert')
const rollup = require('rollup')
const license = require('rollup-plugin-license')
const terser = require('rollup-plugin-terser')
const pkgDir = require('pkg-dir')

module.exports = (taskName, options) => {
  assert(options, 'The variable "options" must be an object!')

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

  const name = options.name

  // CommonJS ---------------------------------------------------------------------------------------------------------*
  task(`${taskName}:cjs`, async () => {
    const bundle = await rollup.rollup({
      input: input.cjs,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.cjs.js'),
      format: 'cjs'
    })
  })

  // ES Modules -------------------------------------------------------------------------------------------------------*
  task(`${taskName}:esm`, async () => {
    const bundle = await rollup.rollup({
      input: input.esm,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.esm.js'),
      format: 'esm'
    })
  })

  // UMD --------------------------------------------------------------------------------------------------------------*
  task(`${taskName}:umd`, async () => {
    const bundle = await rollup.rollup({
      input: input.umd,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.umd.js'),
      format: 'umd'
    })
  })

  task(`${taskName}:umd-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.umd,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.umd.min.js'),
      format: 'umd',
      sourcemap: true
    })
  })

  // AMD --------------------------------------------------------------------------------------------------------------*
  task(`${taskName}:amd`, async () => {
    const bundle = await rollup.rollup({
      input: input.amd,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.amd.js'),
      format: 'amd'
    })
  })

  task(`${taskName}:amd-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.amd,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.amd.min.js'),
      format: 'amd',
      sourcemap: true
    })
  })

  // IIFE -------------------------------------------------------------------------------------------------------------*
  task(`${taskName}:iife`, async () => {
    const bundle = await rollup.rollup({
      input: input.iife,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.iife.js'),
      format: 'iife'
    })
  })

  task(`${taskName}:iife-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.iife,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.iife.min.js'),
      format: 'iife',
      sourcemap: true
    })
  })

  // SystemJS ---------------------------------------------------------------------------------------------------------*
  task(`${taskName}:system`, async () => {
    const bundle = await rollup.rollup({
      input: input.system,
      plugins: [
        license(licenseOpts)
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.system.js'),
      format: 'system'
    })
  })

  task(`${taskName}:system-min`, async () => {
    const bundle = await rollup.rollup({
      input: input.system,
      plugins: [
        license(licenseOpts),
        terser.terser()
      ]
    })

    await bundle.write({
      name,
      file: path.join(dist, 'index.system.min.js'),
      format: 'system',
      sourcemap: true
    })
  })

  // ------------------------------------------------------------------------------------------------------------------*
  return [
    taskName,
    parallel(
      `${taskName}:cjs`,
      `${taskName}:esm`,
      `${taskName}:umd`,
      `${taskName}:umd-min`,
      `${taskName}:amd`,
      `${taskName}:amd-min`,
      `${taskName}:iife`,
      `${taskName}:iife-min`,
      `${taskName}:system`,
      `${taskName}:system-min`
    )
  ]
}
