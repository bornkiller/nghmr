/**
 * @description - rollup configuration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  entry: 'index.js',
  plugins: [
    eslint({
      include: ['*.js']
    }),
    resolve({
      jsnext: true,
      modulesOnly: true
    }),
    babel({
      exclude: ['**/*.css', '**/*.scss']
    })
  ],
  targets: [
    { format: 'cjs', dest: 'dist/core.common.js' }
  ]
};
