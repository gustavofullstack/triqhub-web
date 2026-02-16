import { test, expect, Page, BrowserContext } from '@playwright/test';

const BASE_URL = 'https://triqhub.com';

const viewports = {
  desktop: { name: 'Desktop (1920x1080)', width: 1920, height: 1080 },
  tablet: { name: 'Tablet (768x1024)', width: 768, height: 1024 },
  mobile: { name: 'Mobile (375x667)', width: 375, height: 667 },
};

const issues: any[] = [];

async function checkHorizontalOverflow(page: Page, viewportName: string): Promise<void> {
  const hasOverflow = await page.evaluate(() => {
    return document.body.scrollWidth > window.innerWidth;
  });
  
  if (hasOverflow) {
    issues.push({
      type: 'overflow',
      severity: 'high',
      description: 'Overflow horizontal detectado',
      viewport: viewportName,
    });
  }
}

async function checkVisibleElements(page: Page, viewportName: string): Promise<void> {
  const criticalSelectors = [
    { selector: 'header', name: 'Header' },
    { selector: 'footer', name: 'Footer' },
    { selector: 'img[alt*="logo"], img[src*="logo"]', name: 'Logo' },
  ];

  for (const { selector, name } of criticalSelectors) {
    const element = page.locator(selector).first();
    if (await element.count() > 0) {
      const isVisible = await element.isVisible();
      if (!isVisible) {
        issues.push({
          type: 'visibility',
          severity: 'high',
          description: `${name} não está visível`,
          viewport: viewportName,
        });
      }
    }
  }
}

async function checkBrokenImages(page: Page, viewportName: string): Promise<void> {
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.filter(img => !img.complete || img.naturalHeight === 0).length;
  });

  if (brokenImages > 0) {
    issues.push({
      type: 'image',
      severity: 'medium',
      description: `${brokenImages} imagens quebradas`,
      viewport: viewportName,
    });
  }
}

for (const [key, viewport] of Object.entries(viewports)) {
  test.describe(`Responsividade - ${viewport.name}`, () => {
    let page: Page;
    let context: BrowserContext;

    test.beforeAll(async ({ browser }) => {
      context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      page = await context.newPage();
    });

    test.afterAll(async () => {
      await context.close();
    });

    test(`Homepage - ${viewport.name}`, async () => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: `test-results/homepage-${key}-full.png`, 
        fullPage: true 
      });
      
      await checkHorizontalOverflow(page, viewport.name);
      await checkVisibleElements(page, viewport.name);
      await checkBrokenImages(page, viewport.name);
      
      const title = await page.title();
      expect(title).toBeTruthy();
    });

    test(`Página de Preços - ${viewport.name}`, async () => {
      await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ 
        path: `test-results/pricing-${key}-full.png`, 
        fullPage: true 
      });
      
      await checkHorizontalOverflow(page, viewport.name);
    });

    test(`Página de Contato - ${viewport.name}`, async () => {
      await page.goto(`${BASE_URL}/contato`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      await page.screenshot({ 
        path: `test-results/contact-${key}-full.png`, 
        fullPage: true 
      });
      
      await checkHorizontalOverflow(page, viewport.name);
    });

    test(`Navegação Menu - ${viewport.name}`, async () => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      
      // Em mobile (< 768px), verificar se o botão do menu mobile existe e funciona
      if (key === 'mobile') {
        // Procurar botão do menu mobile
        const menuButton = page.locator('button[aria-label*="menu"], button:has(svg)').filter({
          hasText: /menu/i
        }).or(page.locator('button').filter({ has: page.locator('svg') })).first();
        
        // Em mobile, deve existir um botão para abrir o menu
        const buttons = await page.locator('header button').all();
        let foundMenuButton = false;
        
        for (const btn of buttons) {
          const isVisible = await btn.isVisible();
          if (isVisible) {
            foundMenuButton = true;
            break;
          }
        }
        
        expect(foundMenuButton).toBe(true);
      } else {
        // Em tablet e desktop, verificar se a navegação está visível
        const nav = page.locator('header nav, nav').first();
        if (await nav.count() > 0) {
          const isVisible = await nav.isVisible();
          // Em tablet/desktop, a navegação deve estar visível
          expect(isVisible).toBe(true);
        }
      }
    });
  });
}

test('Verificar elementos críticos', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  const logo = page.locator('img[alt*="logo"], img[src*="logo"]').first();
  if (await logo.count() > 0) {
    const isVisible = await logo.isVisible();
    expect(isVisible).toBe(true);
  }
  
  const ctaButtons = page.locator('a:has-text("Começar"), a:has-text("Criar")');
  const ctaCount = await ctaButtons.count();
  expect(ctaCount).toBeGreaterThan(0);
});
