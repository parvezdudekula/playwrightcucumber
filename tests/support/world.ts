import { setWorldConstructor, World, IWorldOptions, Before, After } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';

export class CustomWorld extends World {
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

After(async function (scenario) {
  // Cucumber v12+ uses uppercase status values
  if (this.page && scenario.result?.status === 'FAILED') {
    // Capture screenshot
    const screenshot = await this.page.screenshot({ path: `screenshots/${Date.now()}-failed.png`, type: 'png' });
    if (this.attach) {
      await this.attach(screenshot, 'image/png');
    }
    // Optionally, attach video to Allure if needed (requires custom logic)
  }
  await this.closeBrowser();
});
