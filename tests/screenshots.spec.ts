import { test } from '@playwright/test';

const sites = [
  { url: 'https://triqhub.com', name: 'triqhub-web' },
  { url: 'https://app.triqhub.com', name: 'triqhub-app' },
  { url: 'https://admin.triqhub.com', name: 'triqhub-admin' },
  { url: 'https://udiapods.com.br', name: 'udiapods-app' },
];

for (const site of sites) {
  test(`${site.name} mobile screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(site.url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `/tmp/${site.name}-mobile.png`, fullPage: true });
  });
  
  test(`${site.name} desktop screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(site.url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `/tmp/${site.name}-desktop.png`, fullPage: true });
  });
}
