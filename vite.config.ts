import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    // Offline shell: the app, fonts and the artwork everyone sees are cached on the first visit; photos and the
    // big journey map are cached the first time they are shown (cheap phones, slow networks).
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script-defer',
      manifest: {
        name: 'NavGurukul Admission',
        short_name: 'NavGurukul',
        lang: 'en',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFBF3',
        theme_color: '#FFFBF3',
        // icons: add once the app icon artwork is supplied (needed for "Add to home screen")
        icons: [],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html}', 'assets/*.woff2', 'media/{logo,asha,asha-idle,asha-walk,bird,banyan,thali}.webp'],
        // latin-ext subsets are rarely needed: fetched and cached on demand like the photos
        globIgnores: ['**/*latin-ext*'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/media/') || url.pathname.endsWith('.woff2'),
            handler: 'CacheFirst',
            options: { cacheName: 'artwork', expiration: { maxEntries: 40 } },
          },
        ],
      },
    }),
  ],
  // host.docker.internal: the visual tests run in Playwright's Linux image (see scripts/vt.mjs)
  server: { port: 5173, strictPort: true, allowedHosts: ['host.docker.internal'] },
});
