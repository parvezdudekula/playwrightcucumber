import '../support/world.ts';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

Given('I navigate to the Playwright website', { timeout: 60000 }, async function () {
  await this.page.goto('https://playwright.dev');
});

When('I check the title of the page', async function () {
  this.title = await this.page.title();
});

Then('the title should be {string}', async function (expectedTitle) {
  expect(this.title).toBe(expectedTitle);
});
