import { Page } from '@playwright/test';
import { AutoHealer } from '../autoHealer';

export class GenericFilePage {
  constructor(private page: Page) {}

  async uploadFile(inputKey: string, filePath: string) {
    const selector = await AutoHealer.findAndHeal(this.page, inputKey);
    if (!selector) throw new Error('File input not found');
    await this.page.setInputFiles(selector, filePath);
  }

  async downloadFile(downloadKey: string) {
    const selector = await AutoHealer.findAndHeal(this.page, downloadKey);
    if (!selector) throw new Error('Download button not found');
    const [ download ] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.click(selector)
    ]);
    return download.path();
  }
}
