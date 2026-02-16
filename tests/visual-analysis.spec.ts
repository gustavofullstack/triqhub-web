import { test, expect } from '@playwright/test';

const BASE_URL = 'https://triqhub.com';

test.describe('Análise Visual Detalhada', () => {
  
  test('Capturar elementos específicos - Desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Capturar header
    const header = page.locator('header');
    await header.screenshot({ path: 'test-results/visual/header-desktop.png' });

    // Capturar hero section
    const hero = page.locator('section').first();
    await hero.screenshot({ path: 'test-results/visual/hero-desktop.png' });

    // Capturar features
    const features = page.locator('#recursos, section').nth(1);
    await features.screenshot({ path: 'test-results/visual/features-desktop.png' });

    // Capturar CTA
    const cta = page.locator('section').last();
    await cta.screenshot({ path: 'test-results/visual/cta-desktop.png' });
  });

  test('Capturar elementos específicos - Mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    // Capturar header
    const header = page.locator('header');
    await header.screenshot({ path: 'test-results/visual/header-mobile.png' });

    // Capturar hero section
    const hero = page.locator('section').first();
    await hero.screenshot({ path: 'test-results/visual/hero-mobile.png' });

    // Scroll para features
    await page.evaluate(() => document.querySelector('#recursos')?.scrollIntoView());
    await page.waitForTimeout(500);
    
    const features = page.locator('#recursos');
    await features.screenshot({ path: 'test-results/visual/features-mobile.png' });

    // Abrir menu mobile e capturar
    const menuButton = page.locator('button.md\\:hidden');
    if (await menuButton.count() > 0) {
      await menuButton.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/visual/menu-mobile-open.png' });
    }
  });

  test('Verificar espaçamento e padding', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar se elementos tocam as bordas
    const edgeIssues = await page.evaluate(() => {
      const issues: string[] = [];
      const viewportWidth = window.innerWidth;
      
      document.querySelectorAll('body *').forEach((el) => {
        const element = el as HTMLElement;
        const rect = element.getBoundingClientRect();
        const style = window.getComputedStyle(element);
        
        // Verificar elementos que tocam ou ultrapassam as bordas
        if (rect.left < 0 || rect.right > viewportWidth + 5) {
          if (style.position !== 'fixed' && style.position !== 'absolute') {
            issues.push(`${element.tagName}.${element.className?.split(' ')[0]}: left=${rect.left}, right=${rect.right}, viewport=${viewportWidth}`);
          }
        }
      });
      
      return issues.slice(0, 10); // Limitar a 10 issues
    });

    if (edgeIssues.length > 0) {
      console.log('Elementos nas bordas:', edgeIssues);
    }
  });

  test('Verificar z-index e sobreposições', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar elementos com z-index alto
    const zIndexElements = await page.evaluate(() => {
      const elements: { selector: string; zIndex: string }[] = [];
      
      document.querySelectorAll('*').forEach((el) => {
        const style = window.getComputedStyle(el);
        const zIndex = style.zIndex;
        
        if (zIndex !== 'auto' && parseInt(zIndex) > 10) {
          elements.push({
            selector: `${el.tagName}.${el.className?.toString().split(' ')[0] || ''}`,
            zIndex: zIndex,
          });
        }
      });
      
      return elements;
    });

    console.log('Elementos com z-index alto:', zIndexElements);
  });

  test('Análise de cores e contraste', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Verificar textos com possíveis problemas de contraste
    const contrastIssues = await page.evaluate(() => {
      const issues: { text: string; color: string; bgColor: string }[] = [];
      
      document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a').forEach((el) => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;
        
        // Textos muito claros em fundos claros
        if (color.includes('rgb(156, 163, 175)') || color.includes('rgb(156, 163, 175)')) {
          // gray-400
          issues.push({
            text: el.textContent?.substring(0, 30) || '',
            color: color,
            bgColor: bgColor,
          });
        }
      });
      
      return issues.slice(0, 5);
    });

    console.log('Possíveis problemas de contraste:', contrastIssues);
  });

  test('Verificar animações em mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    // Verificar se animações estão causando problemas de performance
    const animationElements = await page.evaluate(() => {
      const elements: string[] = [];
      
      document.querySelectorAll('[class*="motion"], [class*="animate"]').forEach((el) => {
        elements.push(el.tagName);
      });
      
      return {
        count: elements.length,
        types: [...new Set(elements)],
      };
    });

    console.log('Elementos com animação:', animationElements);

    // Scroll pela página e verificar se há lag
    const startTime = Date.now();
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    const scrollTime = Date.now() - startTime;

    console.log(`Tempo de scroll: ${scrollTime}ms`);
    
    if (scrollTime > 3000) {
      console.warn('⚠️ Scroll pode estar lento devido a animações');
    }
  });

  test('Verificar imagens e assets', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    const imageInfo = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      return images.map(img => ({
        src: img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        loaded: img.complete && img.naturalWidth > 0,
      }));
    });

    console.log('Imagens na página:', imageInfo);

    const brokenImages = imageInfo.filter(img => !img.loaded);
    if (brokenImages.length > 0) {
      console.warn('⚠️ Imagens quebradas:', brokenImages);
    }
  });
});
