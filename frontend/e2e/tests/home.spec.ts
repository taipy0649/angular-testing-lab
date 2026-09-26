import { test } from '@playwright/test';

import { HomePage } from '../pages/home.page';

test.describe('Home page', () => {
  test('displays the welcome content', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.expectWelcomeContent();
  });
});
