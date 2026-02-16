import { test, expect, Page, BrowserContext } from '@playwright/test';

const BASE_URL = 'https://triqhub.com';

// Viewports para teste
const viewports = {
  desktop: { width: 1920, height: 1080, name: 'Desktop (1920x1080)' },
  tablet: { width: 768, height: 1024, name: 'Tablet (768x1024)' },
  mobile: { width: 375, height: 667, name: 'Mobile (375x667)' },
};

// Interface para problemas encontrados
interface Issue {
  type: 'overflow' | 'visibility' | 'alignment' | 'image' | 'text' | 'button' | 'other';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  element?: string;
  viewport: string;
  screenshot?: string;
}

const issues: Issue[] = [];

// Função para verificar overflow horizontal
async function checkHorizontalOverflow(page: Page, viewportName: string): Promise<void> {
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  
  if (scrollWidth > clientWidth) {
    issues.push({
      type: 'overflow',
      severity: 'high',
      description: `Overflow horizontal detectado: ${scrollWidth}px > ${clientWidth}px`,
      viewport: viewportName,
    });
  }
}

// Função para verificar elementos visíveis
async function checkVisibleElements(page: Page, viewportName: string): Promise<void> {
  // Verificar header
  const header = page.locator('header, nav, [role="navigation"]').first();
  if (await header.count() > 0) {
    const isVisible = await header.isVisible();
    if (!isVisible) {
      issues.push({
        type: 'visibility',
        severity: 'critical',
        description: 'Header não está visível',
        element: 'header',
        viewport: viewportName,
      });
    }
  }

  // Verificar main content
  const main = page.locator('main, [role="main"], .main-content').first();
  if (await main.count() > 0) {
    const isVisible = await main.isVisible();
    if (!isVisible) {
      issues.push({
        type: 'visibility',
        severity: 'critical',
        description: 'Conteúdo principal não está visível',
        element: 'main',
        viewport: viewportName,
      });
    }
  }

  // Verificar footer
  const footer = page.locator('footer, [role="contentinfo"]').first();
  if (await footer.count() > 0) {
    const isVisible = await footer.isVisible();
    if (!isVisible) {
      issues.push({
        type: 'visibility',
        severity: 'medium',
        description: 'Footer não está visível',
        element: 'footer',
        viewport: viewportName,
      });
    }
  }
}

// Função para verificar imagens quebradas
async function checkBrokenImages(page: Page, viewportName: string): Promise<void> {
  const images = await page.locator('img').all();
  
  for (const img of images) {
    const src = await img.getAttribute('src');
    const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
    
    if (naturalWidth === 0 && src) {
      issues.push({
        type: 'image',
        severity: 'medium',
        description: `Imagem não carregou: ${src}`,
        element: 'img',
        viewport: viewportName,
      });
    }
  }
}

// Função para verificar textos cortados
async function checkTruncatedText(page: Page, viewportName: string): Promise<void> {
  const textElements = await page.locator('h1, h2, h3, h4, h5, h6, p, span, a, button').all();
  
  for (const el of textElements) {
    try {
      const isTruncated = await el.evaluate((element: HTMLElement) => {
        const style = window.getComputedStyle(element);
        if (style.overflow === 'hidden' || style.textOverflow === 'ellipsis') {
          return element.scrollWidth > element.clientWidth;
        }
        return false;
      });
      
      if (isTruncated) {
        const text = await el.textContent();
        issues.push({
          type: 'text',
          severity: 'medium',
          description: `Texto truncado: "${text?.substring(0, 50)}..."`,
          element: el.constructor.name,
          viewport: viewportName,
        });
      }
    } catch {
      // Ignorar erros de elementos não mais presentes
    }
  }
}

// Função para verificar botões
async function checkButtons(page: Page, viewportName: string): Promise<void> {
  const buttons = await page.locator('button, a[role="button"], .btn, [class*="button"]').all();
  
  for (const button of buttons) {
    try {
      const isVisible = await button.isVisible();
      if (!isVisible) continue;
      
      const box = await button.boundingBox();
      if (!box) continue;
      
      // Verificar tamanho mínimo para touch (44x44px recomendado)
      if (box.width < 44 || box.height < 44) {
        const text = await button.textContent();
        issues.push({
          type: 'button',
          severity: 'low',
          description: `Botão muito pequeno para touch (${Math.round(box.width)}x${Math.round(box.height)}px): "${text?.substring(0, 30)}"`,
          element: 'button',
          viewport: viewportName,
        });
      }
    } catch {
      // Ignorar erros
    }
  }
}

// Função para verificar alinhamento
async function checkAlignment(page: Page, viewportName: string): Promise<void> {
  // Verificar se elementos estão fora da viewport
  const elements = await page.locator('body *').all();
  let outOfBoundsCount = 0;
  
  for (const el of elements.slice(0, 50)) { // Limitar para performance
    try {
      const box = await el.boundingBox();
      if (!box) continue;
      
      const viewport = page.viewportSize();
      if (!viewport) continue;
      
      if (box.x < 0 || box.x + box.width > viewport.width + 20) {
        outOfBoundsCount++;
      }
    } catch {
      // Ignorar
    }
  }
  
  if (outOfBoundsCount > 5) {
    issues.push({
      type: 'alignment',
      severity: 'high',
      description: `${outOfBoundsCount} elementos fora dos limites da viewport`,
      viewport: viewportName,
    });
  }
}

// Teste para cada viewport
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
      
      // Aguardar animações
      await page.waitForTimeout(2000);
      
      // Screenshot da homepage
      await page.screenshot({ 
        path: `test-results/homepage-${key}-full.png`, 
        fullPage: true 
      });
      
      // Screenshot da viewport
      await page.screenshot({ 
        path: `test-results/homepage-${key}-viewport.png` 
      });
      
      // Verificações
      await checkHorizontalOverflow(page, viewport.name);
      await checkVisibleElements(page, viewport.name);
      await checkBrokenImages(page, viewport.name);
      await checkTruncatedText(page, viewport.name);
      await checkButtons(page, viewport.name);
      await checkAlignment(page, viewport.name);
      
      // Verificar título
      const title = await page.title();
      expect(title).toBeTruthy();
      
      // Verificar se a página carregou
      await expect(page).toHaveURL(/triqhub\.com/);
    });

    test(`Página de Preços - ${viewport.name}`, async () => {
      await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle' });
      
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: `test-results/pricing-${key}-full.png`, 
        fullPage: true 
      });
      
      await page.screenshot({ 
        path: `test-results/pricing-${key}-viewport.png` 
      });
      
      await checkHorizontalOverflow(page, viewport.name);
      await checkBrokenImages(page, viewport.name);
      await checkButtons(page, viewport.name);
    });

    test(`Página de Contato - ${viewport.name}`, async () => {
      await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });
      
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: `test-results/contact-${key}-full.png`, 
        fullPage: true 
      });
      
      await page.screenshot({ 
        path: `test-results/contact-${key}-viewport.png` 
      });
      
      await checkHorizontalOverflow(page, viewport.name);
      await checkButtons(page, viewport.name);
    });

    test(`Navegação Mobile Menu - ${viewport.name}`, async () => {
      // Apenas para mobile e tablet
      if (key === 'mobile' || key === 'tablet') {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        
        // Procurar botão de menu mobile
        const menuButton = page.locator('[aria-label*="menu"], [class*="menu"], button:has-text("Menu"), [data-testid*="menu"]').first();
        
        if (await menuButton.count() > 0) {
          await menuButton.click();
          await page.waitForTimeout(500);
          
          await page.screenshot({ 
            path: `test-results/menu-open-${key}.png` 
          });
          
          // Verificar se menu está visível
          const menuVisible = await page.locator('nav, [role="navigation"], .mobile-menu, [class*="menu"]').first().isVisible();
          
          if (!menuVisible) {
            issues.push({
              type: 'visibility',
              severity: 'high',
              description: 'Menu mobile não abre corretamente',
              viewport: viewport.name,
            });
          }
        }
      }
    });
  });
}

// Teste específico para verificar elementos específicos
test('Verificar elementos críticos', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  
  // Verificar logo
  const logo = page.locator('img[alt*="logo"], img[src*="logo"], .logo').first();
  if (await logo.count() > 0) {
    const isVisible = await logo.isVisible();
    expect(isVisible).toBe(true);
  }
  
  // Verificar CTAs
  const ctaButtons = page.locator('a:has-text("Começar"), a:has-text("Sign up"), a:has-text("Register"), button:has-text("Começar")');
  const ctaCount = await ctaButtons.count();
  
  if (ctaCount === 0) {
    issues.push({
      type: 'button',
      severity: 'high',
      description: 'Nenhum botão CTA encontrado na homepage',
      viewport: 'all',
    });
  }
  
  // Verificar links de navegação
  const navLinks = page.locator('nav a, header a');
  const navLinkCount = await navLinks.count();
  
  expect(navLinkCount).toBeGreaterThan(0);
});

// Relatório final
test.afterAll(async () => {
  console.log('\n========================================');
  console.log('RELATÓRIO DE RESPONSIVIDADE - TRIQHUB');
  console.log('========================================\n');
  
  if (issues.length === 0) {
    console.log('✅ Nenhum problema crítico encontrado!\n');
  } else {
    console.log(`❌ ${issues.length} problema(s) encontrado(s):\n`);
    
    // Agrupar por severidade
    const critical = issues.filter(i => i.severity === 'critical');
    const high = issues.filter(i => i.severity === 'high');
    const medium = issues.filter(i => i.severity === 'medium');
    const low = issues.filter(i => i.severity === 'low');
    
    if (critical.length > 0) {
      console.log('🔴 CRÍTICO:');
      critical.forEach(i => console.log(`   - [${i.viewport}] ${i.description}`));
      console.log('');
    }
    
    if (high.length > 0) {
      console.log('🟠 ALTO:');
      high.forEach(i => console.log(`   - [${i.viewport}] ${i.description}`));
      console.log('');
    }
    
    if (medium.length > 0) {
      console.log('🟡 MÉDIO:');
      medium.forEach(i => console.log(`   - [${i.viewport}] ${i.description}`));
      console.log('');
    }
    
    if (low.length > 0) {
      console.log('🟢 BAIXO:');
      low.forEach(i => console.log(`   - [${i.viewport}] ${i.description}`));
      console.log('');
    }
  }
  
  console.log('Screenshots salvos em: test-results/');
  console.log('========================================\n');
});
