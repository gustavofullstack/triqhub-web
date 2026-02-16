import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://triqhub.com';

// Viewports
const viewports = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

// Interface para problemas
interface LayoutIssue {
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  viewport: string;
  element?: string;
  details?: string;
}

const allIssues: LayoutIssue[] = [];

test.describe('Análise Detalhada de Responsividade - TriqHub', () => {
  
  for (const [key, viewport] of Object.entries(viewports)) {
    test.describe(`${key.toUpperCase()} (${viewport.width}x${viewport.height})`, () => {
      let page: Page;

      test.beforeEach(async ({ browser }) => {
        page = await browser.newPage({ viewport });
      });

      test.afterEach(async () => {
        await page.close();
      });

      test('Homepage - Análise completa', async () => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000); // Aguardar animações

        // Screenshots
        await page.screenshot({ 
          path: `test-results/detailed/homepage-${key}-full.png`, 
          fullPage: true 
        });
        await page.screenshot({ 
          path: `test-results/detailed/homepage-${key}-viewport.png` 
        });

        // 1. Verificar overflow horizontal
        const overflowResult = await page.evaluate(() => {
          const body = document.body;
          const html = document.documentElement;
          return {
            scrollWidth: html.scrollWidth,
            clientWidth: html.clientWidth,
            bodyScrollWidth: body.scrollWidth,
            hasHorizontalScroll: html.scrollWidth > html.clientWidth,
          };
        });

        if (overflowResult.hasHorizontalScroll) {
          allIssues.push({
            category: 'Overflow Horizontal',
            severity: 'high',
            description: `Página tem scroll horizontal indesejado`,
            viewport: key,
            details: `scrollWidth: ${overflowResult.scrollWidth}px, clientWidth: ${overflowResult.clientWidth}px`,
          });
        }

        // 2. Verificar Header
        const headerCheck = await page.evaluate(() => {
          const header = document.querySelector('header');
          if (!header) return { found: false };
          
          const rect = header.getBoundingClientRect();
          const style = window.getComputedStyle(header);
          
          return {
            found: true,
            visible: rect.height > 0,
            height: rect.height,
            position: style.position,
            hasLogo: !!header.querySelector('img'),
            logoVisible: header.querySelector('img')?.checkVisibility() ?? false,
          };
        });

        if (!headerCheck.found) {
          allIssues.push({
            category: 'Header',
            severity: 'critical',
            description: 'Header não encontrado na página',
            viewport: key,
          });
        } else if (!headerCheck.visible) {
          allIssues.push({
            category: 'Header',
            severity: 'critical',
            description: 'Header não está visível',
            viewport: key,
          });
        } else if (headerCheck.hasLogo && !headerCheck.logoVisible) {
          allIssues.push({
            category: 'Header',
            severity: 'high',
            description: 'Logo no header não está visível',
            viewport: key,
          });
        }

        // 3. Verificar Menu Mobile (apenas para mobile e tablet)
        if (key === 'mobile' || key === 'tablet') {
          const menuButton = page.locator('button:has(svg[class*="lucide-menu"]), button:has(svg[class*="Menu"])');
          
          if (await menuButton.count() > 0) {
            const buttonBox = await menuButton.boundingBox();
            
            if (buttonBox) {
              // Verificar tamanho mínimo para touch
              if (buttonBox.width < 44 || buttonBox.height < 44) {
                allIssues.push({
                  category: 'Touch Target',
                  severity: 'medium',
                  description: 'Botão do menu mobile muito pequeno para touch',
                  viewport: key,
                  details: `Tamanho: ${Math.round(buttonBox.width)}x${Math.round(buttonBox.height)}px (mínimo recomendado: 44x44px)`,
                });
              }
            }
            
            // Tentar abrir o menu
            try {
              await menuButton.click({ timeout: 5000 });
              await page.waitForTimeout(500);
              
              await page.screenshot({ 
                path: `test-results/detailed/menu-open-${key}.png` 
              });
              
              // Verificar se o menu abriu
              const menuVisible = await page.evaluate(() => {
                const mobileMenu = document.querySelector('[class*="mobile-menu"], nav.md\\:hidden, div.md\\:hidden');
                return mobileMenu?.checkVisibility() ?? false;
              });
              
              if (!menuVisible) {
                allIssues.push({
                  category: 'Menu Mobile',
                  severity: 'high',
                  description: 'Menu mobile não abre corretamente ao clicar',
                  viewport: key,
                });
              }
            } catch (e) {
              allIssues.push({
                category: 'Menu Mobile',
                severity: 'high',
                description: 'Erro ao interagir com botão do menu mobile',
                viewport: key,
                details: String(e),
              });
            }
          } else {
            allIssues.push({
              category: 'Menu Mobile',
              severity: 'medium',
              description: 'Botão de menu mobile não encontrado',
              viewport: key,
            });
          }
        }

        // 4. Verificar CTAs
        const ctaButtons = await page.locator('a:has-text("Começar"), a:has-text("Criar Loja"), button:has-text("Começar")').all();
        
        for (const cta of ctaButtons) {
          const box = await cta.boundingBox();
          if (box && (box.width < 44 || box.height < 44)) {
            const text = await cta.textContent();
            allIssues.push({
              category: 'Touch Target',
              severity: 'low',
              description: `CTA "${text?.substring(0, 20)}" pequeno para touch`,
              viewport: key,
              details: `Tamanho: ${Math.round(box.width)}x${Math.round(box.height)}px`,
            });
          }
        }

        // 5. Verificar imagens
        const brokenImages = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          return images
            .filter(img => img.naturalWidth === 0)
            .map(img => ({
              src: img.src,
              alt: img.alt,
            }));
        });

        for (const img of brokenImages) {
          allIssues.push({
            category: 'Imagem',
            severity: 'medium',
            description: `Imagem não carregou: ${img.alt || 'sem alt'}`,
            viewport: key,
            details: img.src,
          });
        }

        // 6. Verificar textos legíveis
        const textIssues = await page.evaluate(() => {
          const issues: { text: string; fontSize: string; color: string }[] = [];
          const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, label');
          
          textElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const fontSize = parseFloat(style.fontSize);
            
            // Verificar tamanho mínimo de fonte
            if (fontSize < 12) {
              issues.push({
                text: el.textContent?.substring(0, 30) || '',
                fontSize: style.fontSize,
                color: style.color,
              });
            }
          });
          
          return issues;
        });

        for (const issue of textIssues) {
          allIssues.push({
            category: 'Legibilidade',
            severity: 'medium',
            description: `Texto muito pequeno: "${issue.text}..."`,
            viewport: key,
            details: `Fonte: ${issue.fontSize}`,
          });
        }

        // 7. Verificar Footer
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);
        
        const footerCheck = await page.evaluate(() => {
          const footer = document.querySelector('footer');
          if (!footer) return { found: false };
          
          const rect = footer.getBoundingClientRect();
          return {
            found: true,
            visible: rect.height > 0 && rect.bottom <= window.innerHeight + rect.height,
            height: rect.height,
          };
        });

        if (!footerCheck.found) {
          allIssues.push({
            category: 'Footer',
            severity: 'medium',
            description: 'Footer não encontrado',
            viewport: key,
          });
        }

        // Screenshot final com scroll no final
        await page.screenshot({ 
          path: `test-results/detailed/homepage-${key}-footer.png` 
        });
      });

      test('Página de Preços - Análise', async () => {
        await page.goto(`${BASE_URL}/precos`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        await page.screenshot({ 
          path: `test-results/detailed/pricing-${key}-full.png`, 
          fullPage: true 
        });

        // Verificar cards de preço
        const priceCards = await page.locator('[class*="pricing"], [class*="card"]').all();
        
        for (let i = 0; i < priceCards.length; i++) {
          const card = priceCards[i];
          const box = await card.boundingBox();
          
          if (box) {
            // Verificar se o card está muito largo em mobile
            if (key === 'mobile' && box.width > viewport.width - 32) {
              allIssues.push({
                category: 'Layout',
                severity: 'medium',
                description: `Card de preço muito largo em mobile`,
                viewport: key,
                details: `Largura: ${Math.round(box.width)}px, Viewport: ${viewport.width}px`,
              });
            }
          }
        }

        // Verificar overflow
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        if (hasOverflow) {
          allIssues.push({
            category: 'Overflow Horizontal',
            severity: 'high',
            description: 'Página de preços tem scroll horizontal',
            viewport: key,
          });
        }
      });

      test('Página de Contato - Análise', async () => {
        await page.goto(`${BASE_URL}/contato`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        await page.screenshot({ 
          path: `test-results/detailed/contact-${key}-full.png`, 
          fullPage: true 
        });

        // Verificar formulário
        const formInputs = await page.locator('input, textarea, select').all();
        
        for (const input of formInputs) {
          const box = await input.boundingBox();
          if (box && box.width < 200 && key !== 'mobile') {
            allIssues.push({
              category: 'Formulário',
              severity: 'low',
              description: 'Campo de formulário muito estreito',
              viewport: key,
              details: `Largura: ${Math.round(box.width)}px`,
            });
          }
        }
      });
    });
  }
});

// Teste de navegação entre páginas
test('Navegação entre páginas', async ({ browser }) => {
  const page = await browser.newPage({ viewport: viewports.mobile });
  
  await page.goto(BASE_URL);
  await page.waitForTimeout(2000);
  
  // Tentar navegar para preços
  try {
    const precosLink = page.locator('a:has-text("Preços"), a:has-text("precos")');
    if (await precosLink.count() > 0) {
      await precosLink.first().click();
      await page.waitForTimeout(1000);
      
      await page.screenshot({ 
        path: 'test-results/detailed/navigation-to-pricing.png' 
      });
    }
  } catch (e) {
    allIssues.push({
      category: 'Navegação',
      severity: 'high',
      description: 'Erro ao navegar para página de preços',
      viewport: 'mobile',
      details: String(e),
    });
  }
  
  await page.close();
});

// Relatório final
test.afterAll(() => {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║         RELATÓRIO DE RESPONSIVIDADE - TRIQHUB.COM            ║');
  console.log('╚════════════════════════════════════════════════════════════════╝');
  console.log('\n');

  if (allIssues.length === 0) {
    console.log('✅ NENHUM PROBLEMA ENCONTRADO!\n');
  } else {
    // Agrupar por severidade
    const critical = allIssues.filter(i => i.severity === 'critical');
    const high = allIssues.filter(i => i.severity === 'high');
    const medium = allIssues.filter(i => i.severity === 'medium');
    const low = allIssues.filter(i => i.severity === 'low');

    console.log(`📊 TOTAL DE PROBLEMAS: ${allIssues.length}\n`);
    console.log(`   🔴 Críticos: ${critical.length}`);
    console.log(`   🟠 Altos: ${high.length}`);
    console.log(`   🟡 Médios: ${medium.length}`);
    console.log(`   🟢 Baixos: ${low.length}`);
    console.log('\n');

    // Imprimir por categoria
    const categories = [...new Set(allIssues.map(i => i.category))];
    
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('PROBLEMAS POR CATEGORIA:');
    console.log('═══════════════════════════════════════════════════════════════════\n');

    for (const category of categories) {
      const categoryIssues = allIssues.filter(i => i.category === category);
      console.log(`\n📁 ${category.toUpperCase()} (${categoryIssues.length} problemas)`);
      console.log('─'.repeat(50));
      
      for (const issue of categoryIssues) {
        const severityIcon = {
          critical: '🔴',
          high: '🟠',
          medium: '🟡',
          low: '🟢',
        }[issue.severity];
        
        console.log(`  ${severityIcon} [${issue.viewport.toUpperCase()}] ${issue.description}`);
        if (issue.details) {
          console.log(`     └─ ${issue.details}`);
        }
      }
    }

    console.log('\n');
    console.log('═══════════════════════════════════════════════════════════════════');
    console.log('SUGESTÕES DE CORREÇÃO:');
    console.log('═══════════════════════════════════════════════════════════════════\n');

    // Sugestões baseadas nos problemas encontrados
    const suggestions: { category: string; suggestion: string }[] = [];
    
    if (allIssues.some(i => i.category === 'Overflow Horizontal')) {
      suggestions.push({
        category: 'Overflow Horizontal',
        suggestion: 'Adicione overflow-x: hidden no body e verifique elementos com width fixo que excedem a viewport. Use max-width: 100% em containers.',
      });
    }
    
    if (allIssues.some(i => i.category === 'Touch Target')) {
      suggestions.push({
        category: 'Touch Target',
        suggestion: 'Aumente o tamanho mínimo dos botões para 44x44px. Use padding adicional ou min-width/min-height.',
      });
    }
    
    if (allIssues.some(i => i.category === 'Menu Mobile')) {
      suggestions.push({
        category: 'Menu Mobile',
        suggestion: 'Verifique se o botão do menu está dentro de uma área clicável adequada e se o menu está sendo renderizado corretamente.',
      });
    }
    
    if (allIssues.some(i => i.category === 'Legibilidade')) {
      suggestions.push({
        category: 'Legibilidade',
        suggestion: 'Aumente o tamanho mínimo de fonte para 14px em mobile. Use unidades relativas (rem) para melhor escalabilidade.',
      });
    }

    for (const s of suggestions) {
      console.log(`🔧 ${s.category}:`);
      console.log(`   ${s.suggestion}\n`);
    }
  }

  console.log('\n📸 Screenshots salvos em: test-results/detailed/');
  console.log('═══════════════════════════════════════════════════════════════════\n');
});
