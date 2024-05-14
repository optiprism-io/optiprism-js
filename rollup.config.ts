import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    name: 'optiprism',
    file: 'public/lib/scripts/optiprism-min.umd.js',
    format: 'umd',
  },
  plugins: [
    typescript(),
    json(),
    resolve({
      browser: true,
    }),
    terser(),
  ],
})
