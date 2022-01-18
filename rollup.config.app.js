import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import path from 'path'
import postcss from 'rollup-plugin-postcss'

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.tsx',
	output: {
		file: 'public/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
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
    }),
		production && terser() // minify, but only in production
	]
};