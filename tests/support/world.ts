import { setWorldConstructor, World, IWorldOptions, Before, After } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

class CustomWorld extends World {
  browser: Browser | undefined;
  page: Page | undefined;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser() {
    this.browser = await chromium.launch({ headless: false, slowMo: 200 });
    this.page = await this.browser.newPage();
  }

  async closeBrowser() {
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);

Before(async function () {
  await this.openBrowser();
});

After(async function () {
  await this.closeBrowser();
});
