import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [preact(), tailwindcss()],
  // host.docker.internal: the visual tests run in Playwright's Linux image (see scripts/vt.mjs)
  server: { port: 5173, strictPort: true, allowedHosts: ['host.docker.internal'] },
});
