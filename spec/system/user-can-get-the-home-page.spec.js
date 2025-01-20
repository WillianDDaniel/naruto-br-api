// @ts-check
const { test, expect } = require('@playwright/test');

test('has title Naruto BR API', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Naruto BR API/);
});

test('has a Documentation link', async ({ page }) => {
  await page.goto('/');

  const nav = page.locator('nav');
  const docLink = nav.getByRole('link', { name: /Documentação/i });
  await expect(docLink).toBeVisible();
  await expect(docLink).toHaveText(/Documentação/i);

  const svgElement = docLink.locator('svg');
  await expect(svgElement).toBeVisible();

  await docLink.click();
  await expect(page).toHaveURL('/documentation/');
});

test('has a Github link to the project', async ({ page }) => {
  await page.goto('/');

  const nav = page.locator('nav');
  const gitHubLink = nav.getByRole('link', { name: /GitHub/i });
  await expect(gitHubLink).toBeVisible();

  const svgElement = gitHubLink.locator('svg');
  await expect(svgElement).toBeVisible();

  const href = await gitHubLink.getAttribute('href');
  expect(href).toBe('https://github.com/WillianDDaniel/naruto-br-api');
});

test('has a link to terms of service page', async ({ page }) => {
  await page.goto('/');

  const footer = page.locator('footer');
  const termsLink = footer.getByRole('link', { name: /Termos de uso/i });
  await expect(termsLink).toBeVisible();

  const href = await termsLink.getAttribute('href');
  expect(href).toBe('/terms');

  await termsLink.click();
  await expect(page).toHaveURL('/terms/');
});

test('has a link to privacy policy page', async ({ page }) => {
  await page.goto('/');

  const footer = page.locator('footer');
  const privacyPolicyLink = footer.getByRole('link', { name: /Privacidade/i });
  await expect(privacyPolicyLink).toBeVisible();

  const href = await privacyPolicyLink.getAttribute('href');
  expect(href).toBe('/privacy');

  await privacyPolicyLink.click();
  await expect(page).toHaveURL('/privacy/');
});

test('has a Documentation link specifically in the footer', async ({ page }) => {
  await page.goto('/');

  const footer = page.locator('footer');
  const docFooterLink = footer.getByRole('link', { name: /Documentação/i });

  await expect(docFooterLink).toBeVisible();

  const href = await docFooterLink.getAttribute('href');
  expect(href).toBe('/documentation');

  await docFooterLink.click();
  await expect(page).toHaveURL('/documentation/');
});
