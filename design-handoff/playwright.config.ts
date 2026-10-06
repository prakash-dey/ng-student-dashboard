import { defineConfig } from '@playwright/test';
// Snapshots are the design screenshots: reference/<phone|pc>/<name>.png
// Never run with --update-snapshots: that would overwrite the design with your build.
export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: '{testDir}/../reference/{arg}{ext}',
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
