import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ... Specify options here.
    includes: ['docs/**/*/.test.js'],
    exclude: ['src/**', 'node_modules']
  },
});