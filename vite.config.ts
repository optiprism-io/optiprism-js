import { defineConfig } from 'vitest/config'
import path from 'node:path'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  root: 'src/demo',
  appType: 'mpa',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: './../../dist',
  test: {
    root: 'src',
    environment: 'jsdom',
    mockReset: true,
  },
})
