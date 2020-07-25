import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      exports: 'default'
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'default'
    }
  ],
  plugins: [typescript(), terser()]
}
