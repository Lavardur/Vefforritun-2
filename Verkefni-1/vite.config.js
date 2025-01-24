import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom', // Use 'jsdom' since we need DOM APIs like fetch
    exclude: [...configDefaults.exclude],
    setupFiles: './tests/setup.js', // Optional: A setup file to handle additional configs
  },
})
