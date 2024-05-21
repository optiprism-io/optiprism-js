import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  root: 'src/demo',
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
