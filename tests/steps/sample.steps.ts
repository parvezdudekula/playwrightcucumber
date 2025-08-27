
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { step } from 'allure-js-commons';


Given('I navigate to the Playwright website', { timeout: 60000 }, async function () {
  await step('Navigate to the Playwright website', async () => {
    await this.page.goto('https://playwright.dev');
  });
});

When('I check the title of the page', async function () {
  await step('Check the title of the page', async () => {
    this.title = await this.page.title();
  });
});

Then('the title should be {string}', async function (expectedTitle) {
  await step(`Assert the title is ${expectedTitle}`, async () => {
    expect(this.title).toBe(expectedTitle);
  });
});
