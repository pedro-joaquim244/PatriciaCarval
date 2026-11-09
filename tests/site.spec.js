import { expect, test } from '@playwright/test';

const siteUrl = 'http://127.0.0.1:5173/';
const expectedMessage = 'Olá, Patrícia! Encontrei seu site e gostaria de obter informações sobre os atendimentos.';

async function collectRuntimeProblems(page) {
  const problems = [];
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => problems.push(`page: ${error.message}`));
  return problems;
}

test.describe('prévia da Patrícia', () => {
  test('desktop: conteúdo, SEO, mídia e links', async ({ page }) => {
    const problems = await collectRuntimeProblems(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(siteUrl, { waitUntil: 'networkidle' });

    await expect(page).toHaveTitle('Psicóloga Patrícia Slonski | Curitiba — PR');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex, nofollow/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Um espaço para acolher e cuidar de você.');
    await expect(page.locator('body')).not.toContainText(/Helena|Ribeirão Preto|CRP 00\/000000/i);

    const visualSystem = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const section = getComputedStyle(document.querySelector('.section-space'));
      return {
        primary: root.getPropertyValue('--color-primary').trim(),
        primaryDark: root.getPropertyValue('--color-primary-dark').trim(),
        primaryLight: root.getPropertyValue('--color-primary-light').trim(),
        lavender: root.getPropertyValue('--color-lavender').trim(),
        surface: root.getPropertyValue('--color-surface-purple').trim(),
        heroDecoration: getComputedStyle(document.querySelector('.hero'), '::before').content,
        sectionPadding: Number.parseFloat(section.paddingTop),
      };
    });
    expect(visualSystem).toMatchObject({
      primary: '#624a76',
      primaryDark: '#463253',
      primaryLight: '#80678f',
      lavender: '#c7b5d1',
      surface: '#eee7f2',
      heroDecoration: 'none',
    });
    expect(visualSystem.sectionPadding).toBeLessThanOrEqual(88);

    const whatsappLinks = page.locator('a[href^="https://wa.me/"]');
    expect(await whatsappLinks.count()).toBeGreaterThan(0);
    for (const link of await whatsappLinks.all()) {
      const href = new URL(await link.getAttribute('href'));
      expect(`${href.origin}${href.pathname}`).toBe('https://wa.me/5541995505016');
      expect(href.searchParams.get('text')).toBe(expectedMessage);
    }

    const internalHrefs = await page.locator('a[href^="#"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')))]);
    for (const href of internalHrefs) {
      expect(href).not.toBe('#');
      expect(await page.locator(href).count()).toBe(1);
    }

    const mapsLinks = page.locator('a[href*="query_place_id=ChIJEWeQIbz73JQRgSwTu7QRSQg"]');
    expect(await mapsLinks.count()).toBeGreaterThanOrEqual(2);
    for (const link of await mapsLinks.all()) {
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
    }

    const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
    expect(JSON.parse(structuredData)['@type']).toBe('ProfessionalService');
    expect(JSON.parse(structuredData).identifier).toBe('CRP 08/24593');

    await expect(page.getByText('CRP 08/24593').first()).toBeVisible();
    await expect(page.getByAltText('Retrato da psicóloga Patrícia Slonski usando roupa vermelha')).toBeVisible();

    await page.locator('.brand-signature').scrollIntoViewIfNeeded();
    await expect(page.getByAltText(/Banner oficial de Patrícia Slonski/)).toBeVisible();

    await page.locator('#consultorio').scrollIntoViewIfNeeded();
    await expect(page.getByAltText('Poltrona e planta no consultório de Patrícia Slonski')).toBeVisible();
    await expect(page.getByAltText('Duas poltronas e mesa no consultório de Patrícia Slonski')).toBeVisible();

    await page.locator('#avaliacoes').scrollIntoViewIfNeeded();
    await expect(page.getByText('Wellington da Cunha')).toBeVisible();
    await expect(page.getByText('Rhael Ribeiro')).toBeVisible();

    await page.locator('#localizacao').scrollIntoViewIfNeeded();
    await expect(page.getByRole('heading', { name: /Consultório em Curitiba/ })).toBeVisible();
    await expect(page.getByAltText('Patrícia Slonski durante um atendimento psicológico')).toBeVisible();
    await expect(page.locator('#localizacao').getByText('Rua São José dos Pinhais, 196/190', { exact: true })).toBeVisible();

    await page.locator('#contato').scrollIntoViewIfNeeded();
    await expect(page.getByAltText('Retrato da psicóloga Patrícia Slonski em seu consultório')).toBeVisible();

    const images = await page.locator('img').all();
    for (const image of images) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    const brokenImages = await page.locator('img').evaluateAll((images) => images
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src));
    expect(brokenImages).toEqual([]);

    const duplicateIds = await page.locator('[id]').evaluateAll((elements) => {
      const ids = elements.map((element) => element.id);
      return ids.filter((id, index) => ids.indexOf(id) !== index);
    });
    expect(duplicateIds).toEqual([]);
    expect(problems).toEqual([]);
  });

  test('mobile: menu, contato e largura responsiva', async ({ page }) => {
    const problems = await collectRuntimeProblems(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(siteUrl, { waitUntil: 'networkidle' });

    const menuButton = page.getByRole('button', { name: 'Abrir menu' });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toHaveClass(/is-open/);
    await expect(page.getByRole('link', { name: /Entre em contato/ }).first()).toBeVisible();

    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(horizontalOverflow).toBeLessThanOrEqual(1);
    expect(problems).toEqual([]);
  });
});
