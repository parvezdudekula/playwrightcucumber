console.log('DEBUG: generic.steps.ts loaded by Cucumber');

import { Given, When, Then, BeforeAll } from '@cucumber/cucumber';
import { GenericFormPage } from '../../src/pages/genericFormPage';
import { GenericTablePage } from '../../src/pages/genericTablePage';
import { GenericFilePage } from '../../src/pages/genericFilePage';
import { sendApiRequest } from '../../src/api/apiUtils';
import { expect } from '@playwright/test';
import { loadSelectorMap } from '../../src/config/selectorMapLoader';
import { loadAppConfig, getUrl, getApiEndpoint } from '../../src/config/appConfig';

// Load selector map and app config dynamically based on APP env variable (default: demoqa)
BeforeAll(async function() {
  try {
    const app = process.env.APP || 'demoqa';
    console.log('BeforeAll: loading selector map for', app);
    await loadSelectorMap(app);
    await loadAppConfig(app);
    console.log('BeforeAll: loaded selector map and app config');
  } catch (err) {
    console.error('BeforeAll hook failed:', err);
    throw err;
  }
});


When('I fill the form with:', async function (dataTable) {
  const formPage = new GenericFormPage(this.page);
  for (const { field, value } of dataTable.hashes()) {
    await formPage.fillField(field, value);
  }
});

Given('I navigate to the {string} page', async function (pageKey) {
  const url = getUrl(pageKey);
  if (!url) throw new Error(`URL for page key ${pageKey} not found in app config`);
  await this.page.goto(url);
});

When('I send a {word} request to the {string} endpoint', async function (method, endpointKey) {
  const endpoint = getApiEndpoint(endpointKey);
  if (!endpoint) throw new Error(`API endpoint for key ${endpointKey} not found in app config`);
  this.apiResponse = await sendApiRequest(method, endpoint);
});

When('I upload the file {string} using {string}', async function (filePath, inputKey) {
  const filePage = new GenericFilePage(this.page);
  await filePage.uploadFile(inputKey, filePath);
});

When('I send a {word} request to {string}', async function (method, url) {
  this.apiResponse = await sendApiRequest(method, url);
});

Then('the API response should have status {int}', function (status) {
  expect(this.apiResponse.status).toBe(status);
});
