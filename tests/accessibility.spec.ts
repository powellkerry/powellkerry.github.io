// tests/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (WCAG AAA) checks', () => {
  test('Home page should have no detectable accessibility violations (AAA)', async ({ page }) => {
    await page.goto('/');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]); 
  });

  test('About page should have no detectable accessibility violations (AAA)', async ({ page }) => {
    await page.goto('/about');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Contact page should have no detectable accessibility violations (AAA)', async ({ page }) => {
    await page.goto('/contact');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Blog page should have no detectable accessibility violations (AAA)', async ({ page }) => {
    await page.goto('/blog');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
