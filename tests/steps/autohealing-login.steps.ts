import { When } from '@cucumber/cucumber';
import { LoginPage } from '../../src/pages/loginPage';

When('I perform auto-healing login with username {string} and password {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.login(username, password);
});
