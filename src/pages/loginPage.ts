
import { Page } from '@playwright/test';
import { AutoHealer } from '../autoHealer';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://your-login-url.com');
  }

  async login(username: string, password: string) {
    const usernameSelector = await AutoHealer.findAndHeal(this.page, 'usernameInput');
    const passwordSelector = await AutoHealer.findAndHeal(this.page, 'passwordInput');
    const loginBtnSelector = await AutoHealer.findAndHeal(this.page, 'loginButton');
    if (!usernameSelector || !passwordSelector || !loginBtnSelector) {
      throw new Error('One or more login selectors could not be found or healed');
    }
    await this.page.fill(usernameSelector, username);
    await this.page.fill(passwordSelector, password);
    await this.page.click(loginBtnSelector);
  }
}
