import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import path from 'path'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json';
import { defineConfig } from 'rollup'

export default defineConfig([
  {
    input: 'components/index.tsx',
    external: ['react'],
    output: [
      { file: pkg.main, format: 'cjs', exports: 'auto' },
      { file: pkg.module, format: 'es', exports: 'auto' }
    ],
    plugins: [
      alias({
        entries: [
          { find: '@', replacement: path.resolve(__dirname, 'src') },
        ],
      }),
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('development')
        }
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        use: {
          less: { javascriptEnabled: true }
        },
        extract: true
      })
    ]
  }
])