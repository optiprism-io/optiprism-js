import { defineConfig, type RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const umd: RollupOptions = {
  input: 'src/index.ts',
  output: {
    name: 'optiprism',
    file: 'public/lib/scripts/optiprism-min.umd.js',
    format: 'umd',
  },
  plugins: [
    typescript(),
    resolve({
      browser: true,
    }),
    terser(),
  ],
}

const iife: RollupOptions = {
  input: 'src/snippet-index.ts',
  output: {
    name: 'optiprism',
    file: 'lib/scripts/optiprism-min.js',
    format: 'iife',
  },
  plugins: [
    typescript(),
    resolve({
      browser: true,
    }),
    terser(),
  ],
}

export default defineConfig(umd)
