import { Page } from '@playwright/test';
import { AutoHealer } from '../autoHealer';

export class DemoQAFormPage {
  constructor(private page: Page) {}

  async fillField(field: string, value: string) {
    // Use AI/auto-healing for dynamic locator
    const selector = await AutoHealer.findAndHeal(this.page, field.replace(/\s/g, ''));
    if (!selector) throw new Error(`Field ${field} not found`);
    await this.page.fill(selector, value);
  }

  async submit() {
    const selector = await AutoHealer.findAndHeal(this.page, 'Submit');
    if (!selector) throw new Error('Submit button not found');
    await this.page.click(selector);
  }

  async getSuccessMessage() {
    // Try to heal and find the success message
    const selector = await AutoHealer.findAndHeal(this.page, 'SuccessMessage');
    if (!selector) throw new Error('Success message not found');
    return this.page.textContent(selector);
  }
}
