const { test, expect } = require('@playwright/test');
import { User } from '../../models';
import { setupDatabase } from '../setupDatabase.js';

test.beforeEach(async ({}) => {
  await setupDatabase();
});

test('user can sign in', async ({ page }) => {
  const user = await User.build({
    username: 'admin',
    email: 'admin@localhost.com',
  });
  await user.setPassword('password123');
  await user.save();

  await page.goto('/login');
  await page.locator('[aria-label="Username"]').fill(user.username);
  await page.locator('[aria-label="Password"]').fill('password123');
  await page.locator('[aria-label="Login Button"]').click();

  // wait for the db to update
  await new Promise((resolve) => setTimeout(resolve, 300));
  await user.reload();

  await page.locator('[aria-label="2FA Code Input"]').fill(user.twoFactorCode);
  await page.locator('[aria-label="Verify 2FA Button"]').click();
  await expect(page).toHaveURL('/admin/');
});
