import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/main.ts',
  output: {
    cleanDir: true,
    codeSplitting: false,
    file: 'dist/index.js',
    format: 'esm',
    minify: false,
  },
  platform: 'node',
});
