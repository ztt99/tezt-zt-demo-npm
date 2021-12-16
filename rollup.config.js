import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
// import { eslint } from 'rollup-plugin-eslint'
import typescript from '@rollup/plugin-typescript'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
// import lessModules from 'rollup-plugin-less-modules'
import serve from 'rollup-plugin-serve'

const processor = (code, id) => {
  const postCssOptions = {
    from: undefined,
    to: undefined,
    map: {
      prev: code.map,
    },
  }

  return postcss([
    autoprefixer({
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        // 'last 2 versions', // 所有主流浏览器最近2个版本
      ],
      grid: true,
    }),
  ])
    .process(code.css, postCssOptions)
    .then((result) => {
      return {
        css: result.css,
        map: result.map,
      }
    })
}
export default [
  {
    input: 'src/main.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'boundle',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        exclude: 'node_modules/**', // 防止打包node_modules下的文件
        runtimeHelpers: true, // 使plugin-transform-runtime生效
      }),
      terser(),
      // lessModules({
      //   output: 'dist/index.css',
      //   options: { sourceMap: {} },
      //   processor,
      // }),
    ],
  },
]
