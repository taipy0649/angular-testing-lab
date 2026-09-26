import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  private readonly heading: Locator;
  private readonly description: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', {
      level: 1,
      name: 'Angular Testing Lab',
    });
    this.description = page.getByText('Angularの開発とテストを、役割の明確な構成で学べます。', {
      exact: true,
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async expectWelcomeContent(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.description).toBeVisible();
  }
}
