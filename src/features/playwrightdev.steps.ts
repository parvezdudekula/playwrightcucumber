
import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiRequest } from '../api/apiClient';
import { queryDB } from '../db/dbUtils';

// Step to query the DB for user with a given id
Then('I query the DB for user with id {int}', async function (userId) {
  this.dbResult = await queryDB('SELECT name FROM users WHERE id = $1', [userId]);
});

// Step to check the DB result for a specific name
Then('the DB result should have name {string}', function (expectedName) {
  if (!this.dbResult || this.dbResult.length === 0) {
    throw new Error('No DB result found');
  }
  expect(this.dbResult[0].name).toBe(expectedName);
});



Given('I send a GET request to {string}', async function (url) {
  this.apiResponse = await apiRequest({ url, method: 'GET' });
});

Then('the API response should have {string} as {string}', function (field, expected) {
  expect(this.apiResponse[field]).toBe(expected);
});



Then('the {string} button should be visible', async function (buttonText) {
  if (!this.page) throw new Error('Playwright page is not initialized.');
  let isVisible = false;
  let errorMsg = '';
  try {
    const button = await this.page.getByRole('link', { name: buttonText });
    await button.waitFor({ state: 'visible', timeout: 10000 });
    isVisible = await button.isVisible();
  } catch (e) {
    errorMsg = (e as any).message;
  }
  if (!isVisible) {
    // Fallback: try text selector
    try {
      await this.page.waitForSelector(`text=${buttonText}`, { state: 'visible', timeout: 10000 });
      isVisible = await this.page.isVisible(`text=${buttonText}`);
    } catch (e) {
      errorMsg += '\n' + (e as any).message;
    }
  }
  if (!isVisible) {
    const html = await this.page.content();
    console.error(`Locator for \"${buttonText}\" not found or not visible after waiting.\nError: ${errorMsg}\nPage HTML:\n${html}`);
  }
  expect(isVisible).toBeTruthy();
});
