import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['spec/system/*'],
    include: ['spec/models/*'],
    environment: 'node',
    globals: true,
    fileParallelism: false,
    setupFiles: ['./spec/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'spec/',
        'config/',
      ]
    },
  }
});