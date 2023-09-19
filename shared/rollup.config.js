const typescript = require('@rollup/plugin-typescript')
const glob = require('glob')

module.exports = {
  input: glob.sync(
    [
      'src/**/*.ts'
    ],
    {
      ignore:
      [
        'src/**/*.test.ts'
      ]
    }
  ),

  output: {
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    dir: 'dist'
  },

  external: /@extended\/.*/,

  plugins: [
    typescript()
  ]
}
