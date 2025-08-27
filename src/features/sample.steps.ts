import { Given, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/loginPage';
import { assertEqual } from '../assertions/customAssertions';
import { apiRequest } from '../api/apiClient';
import { queryDB } from '../db/dbUtils';

Given('I login with {string} and {string}', async function (username, password) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goto();
  await loginPage.login(username, password);
});

Then('the API returns user {string}', async function (expectedName) {
  const data = await apiRequest({ url: 'https://jsonplaceholder.typicode.com/users/1', method: 'GET' });
  assertEqual(data.name, expectedName, 'API user name mismatch');
});

Then('the DB has user {string}', async function (expectedName) {
  const rows = await queryDB('SELECT name FROM users WHERE id = $1', [1]);
  assertEqual(rows[0].name, expectedName, 'DB user name mismatch');
});
