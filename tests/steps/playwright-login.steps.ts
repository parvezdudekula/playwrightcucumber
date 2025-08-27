import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I navigate to {string}', async function (url) {
  await this.page.goto(url);
});

When('I login with username {string} and password {string}', async function (username, password) {
  // Playwright.dev has no login form; simulate login for demo
  console.log(`Simulating login for user: ${username} / ${password}`);
  await this.page.waitForSelector('text=Get started');
});

Then('the page title should be {string}', async function (expectedTitle) {
  const title = await this.page.title();
  expect(title).toBe(expectedTitle);
});
