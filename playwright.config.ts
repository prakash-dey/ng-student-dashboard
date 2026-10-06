import { defineConfig } from '@playwright/test';
// Runs the handoff's pixel test (design-handoff/tests/visual.spec.ts) against the dev server.
// Snapshots are the design screenshots: design-handoff/reference/<phone|pc>/<name>.png
// Never run with --update-snapshots: that would overwrite the design with your build.
export default defineConfig({
  testDir: './design-handoff/tests',
  snapshotPathTemplate: '{testDir}/../reference/{arg}{ext}',
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: { command: 'npm run dev', url: process.env.BASE_URL ?? 'http://localhost:5173', reuseExistingServer: true },
});
