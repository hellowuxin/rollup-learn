import pkg from './package.json';

export default {
  input: 'src/main.js',
  external: ['react'],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'auto' },
    { file: pkg.module, format: 'es', exports: 'auto' }
  ]
}