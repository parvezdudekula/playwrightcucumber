import { Page } from '@playwright/test';
import { loginLocators } from '../objectRepository/login/locators';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://your-login-url.com');
  }

  async login(username: string, password: string) {
    await this.page.fill(loginLocators.usernameField, username);
    await this.page.fill(loginLocators.passwordField, password);
    await this.page.click(loginLocators.loginButton);
  }
}
