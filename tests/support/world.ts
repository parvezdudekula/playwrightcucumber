import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Page } from 'playwright';

class CustomWorld {
  page: Page;

  constructor() {
    this.page = null!;
  }

  async init() {
    const browser = await chromium.launch();
    this.page = await browser.newPage();
  }
}

setWorldConstructor(CustomWorld);
