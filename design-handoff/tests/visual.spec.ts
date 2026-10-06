// Compares the built app with the design, screen by screen.
// Run: npx playwright test tests/visual.spec.ts        (app must be running on BASE_URL)
// A screen fails if more than 1% of its pixels differ from reference/<device>/<name>.png.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:5173';
const REF = path.resolve(__dirname, '../reference');
const states: { name: string; state: Record<string, unknown> }[] =
  JSON.parse(fs.readFileSync(path.join(REF, 'states.json'), 'utf8'));

const devices = [
  { id: 'phone', width: 390, height: 844 },
  { id: 'pc', width: 1440, height: 900 },
] as const;

for (const d of devices) {
  test.describe(d.id, () => {
    test.use({ viewport: { width: d.width, height: d.height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    for (const s of states) {
      test(s.name, async ({ page }) => {
        // The app must expose a dev-only hook that puts it into a given state:
        //   window.__setDesignState(state)   (see CLAUDE.md, "Test hook")
        await page.goto(BASE_URL + '/?designTest=1');
        await page.waitForFunction(() => typeof (window as any).__setDesignState === 'function');
        await page.evaluate((st) => (window as any).__setDesignState(st), s.state);
        await page.evaluate(() => (document as any).fonts.ready);
        await page.waitForTimeout(450);
        const shot = await page.screenshot();
        expect(shot).toMatchSnapshot([d.id, `${s.name}.png`], { maxDiffPixelRatio: 0.01, threshold: 0.2 });
      });
    }
  });
}
