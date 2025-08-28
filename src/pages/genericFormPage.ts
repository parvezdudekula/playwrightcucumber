import { Page } from '@playwright/test';
import { AutoHealer } from '../autoHealer';

export class GenericFormPage {
  constructor(private page: Page) {}

  async fillField(fieldKey: string, value: string) {
    const selector = await AutoHealer.findAndHeal(this.page, fieldKey);
    if (!selector) throw new Error(`Field ${fieldKey} not found`);
    await this.page.fill(selector, value);
  }

  async submit(submitKey: string = 'Submit') {
    const selector = await AutoHealer.findAndHeal(this.page, submitKey);
    if (!selector) throw new Error('Submit button not found');
    await this.page.click(selector);
  }

  async getMessage(messageKey: string) {
    const selector = await AutoHealer.findAndHeal(this.page, messageKey);
    if (!selector) throw new Error('Message not found');
    return this.page.textContent(selector);
  }
}
