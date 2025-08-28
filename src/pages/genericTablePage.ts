import { Page } from '@playwright/test';
import { AutoHealer } from '../autoHealer';

export class GenericTablePage {
  constructor(private page: Page) {}

  async filterBy(columnKey: string, value: string) {
    const filterSelector = await AutoHealer.findAndHeal(this.page, `${columnKey}Filter`);
    if (!filterSelector) throw new Error(`Filter for ${columnKey} not found`);
    await this.page.fill(filterSelector, value);
  }

  async goToPage(pageNumber: number) {
    const pageSelector = await AutoHealer.findAndHeal(this.page, `Page${pageNumber}`);
    if (!pageSelector) throw new Error(`Page ${pageNumber} selector not found`);
    await this.page.click(pageSelector);
  }

  async getRows() {
    const rowSelector = await AutoHealer.findAndHeal(this.page, 'TableRow');
    if (!rowSelector) throw new Error('Table row selector not found');
    return this.page.$$(rowSelector);
  }
}
