import { expect, test } from '@playwright/test';

const siteUrl = 'http://127.0.0.1:5173/';
const viewports = [
  { width: 1920, height: 1080 },
  { width: 1440, height: 900 },
  { width: 1280, height: 800 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 375, height: 812 },
  { width: 320, height: 568 },
];

for (const viewport of viewports) {
  test(`Hero sem sobreposição em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(siteUrl, { waitUntil: 'networkidle' });

    const metrics = await page.locator('.hero').evaluate((hero) => {
      const copy = hero.querySelector('.hero-copy').getBoundingClientRect();
      const title = hero.querySelector('h1').getBoundingClientRect();
      const photo = hero.querySelector('.hero-photo').getBoundingClientRect();
      const lineHeight = Number.parseFloat(getComputedStyle(hero.querySelector('h1')).lineHeight);
      const intersects = !(
        title.right <= photo.left
        || title.left >= photo.right
        || title.bottom <= photo.top
        || title.top >= photo.bottom
      );

      return {
        horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        intersects,
        titleInsideCopy: title.left >= copy.left - 1 && title.right <= copy.right + 1,
        photoInsideViewport: photo.left >= -1 && photo.right <= window.innerWidth + 1,
        titleLines: Math.round(title.height / lineHeight),
      };
    });

    expect(metrics.horizontalOverflow).toBeLessThanOrEqual(1);
    expect(metrics.intersects).toBe(false);
    expect(metrics.titleInsideCopy).toBe(true);
    expect(metrics.photoInsideViewport).toBe(true);
    if (viewport.width >= 1024) {
      expect(metrics.titleLines).toBeGreaterThanOrEqual(2);
      expect(metrics.titleLines).toBeLessThanOrEqual(4);
    }
  });
}

test('a expansão animada da foto continua ativa no desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(siteUrl, { waitUntil: 'networkidle' });

  const initialPhoto = await page.locator('.hero-photo').boundingBox();
  await page.evaluate(() => window.scrollTo(0, 738));
  await page.waitForTimeout(2500);
  const expandedPhoto = await page.locator('.hero-photo').boundingBox();
  const messageOpacity = await page.locator('.hero-photo-message').evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));

  expect(expandedPhoto.width).toBeGreaterThan(initialPhoto.width * 1.5);
  expect(expandedPhoto.height).toBeGreaterThan(initialPhoto.height * 1.2);
  expect(messageOpacity).toBeGreaterThan(0);
});
