import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'index.jsx',
  external: ['react', 'react-dom', 'prop-types'],
  output: [
    {
      file: 'dist/promise-modal.esm.js',
      format: 'es',
    },
  ],
  plugins: [
    resolve({ extensions: ['.jsx', '.js', '.tsx'] }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.jsx', '.js', '.tsx'], 
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react']
    }),
  ],
}