import assert from 'assert';
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
  console.log('[STEP] Filling form with data:', dataTable.hashes());
  try {
    const formPage = new GenericFormPage(this.page);
    for (const { field, value } of dataTable.hashes()) {
      try {
        await formPage.fillField(field, value);
        console.log(`[ASSERT] Field '${field}' filled with '${value}'`);
      } catch (err) {
        const error = err as Error;
        console.error(`[ERROR] Failed to fill field '${field}':`, error.message);
        throw new assert.AssertionError({
          message: `[Script Issue] Could not fill field '${field}': ${error.message}`
        });
      }
    }
  } catch (err) {
    const error = err as Error;
    if (error.message && error.message.includes('not found')) {
      throw new assert.AssertionError({
        message: `[Application Issue] Form field missing: ${error.message}`
      });
    }
    throw error;
  }
});


Given('I navigate to the {string} page', async function (pageKey) {
  console.log(`[STEP] Navigating to page: ${pageKey}`);
  try {
    const url = getUrl(pageKey);
    if (!url) {
      console.error(`[ERROR] URL for page key '${pageKey}' not found in app config`);
      throw new assert.AssertionError({
        message: `[Script Issue] URL for page key '${pageKey}' not found in app config`
      });
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log(`[ASSERT] Navigated to ${url}`);
  } catch (err) {
    const error = err as Error;
    if (error.message && (error.message.includes('net::ERR') || error.message.includes('timeout'))) {
      throw new assert.AssertionError({
        message: `[Application Issue] Failed to load page '${pageKey}': ${error.message}`
      });
    }
    throw error;
  }
});


When('I send a {word} request to the {string} endpoint', async function (method, endpointKey) {
  console.log(`[STEP] Sending ${method} request to endpoint: ${endpointKey}`);
  try {
    const endpoint = getApiEndpoint(endpointKey);
    if (!endpoint) {
      console.error(`[ERROR] API endpoint for key '${endpointKey}' not found in app config`);
      throw new assert.AssertionError({
        message: `[Script Issue] API endpoint for key '${endpointKey}' not found in app config`
      });
    }
    this.apiResponse = await sendApiRequest(method, endpoint);
    console.log(`[ASSERT] API response received for ${endpointKey}`);
  } catch (err) {
    const error = err as any;
    if (error.response) {
      throw new assert.AssertionError({
        message: `[Application Issue] API call failed: ${error.response.status} ${error.response.statusText}`
      });
    }
  throw error;
  }
});


When('I upload the file {string} using {string}', async function (filePath, inputKey) {
  console.log(`[STEP] Uploading file '${filePath}' using input '${inputKey}'`);
  try {
    const filePage = new GenericFilePage(this.page);
    await filePage.uploadFile(inputKey, filePath);
    console.log(`[ASSERT] File '${filePath}' uploaded using '${inputKey}'`);
  } catch (err) {
    const error = err as Error;
    if (error.message && error.message.includes('not found')) {
      throw new assert.AssertionError({
        message: `[Application Issue] File input '${inputKey}' not found: ${error.message}`
      });
    }
    throw new assert.AssertionError({
      message: `[Script Issue] Failed to upload file: ${error.message}`
    });
  }
});


When('I send a {word} request to {string}', async function (method, url) {
  console.log(`[STEP] Sending ${method} request to URL: ${url}`);
  try {
    this.apiResponse = await sendApiRequest(method, url);
    console.log(`[ASSERT] API response received for ${url}`);
  } catch (err) {
    const error = err as any;
    if (error.response) {
      throw new assert.AssertionError({
        message: `[Application Issue] API call failed: ${error.response.status} ${error.response.statusText}`
      });
    }
  throw error;
  }
});


Then('the API response should have status {int}', function (status) {
  console.log(`[STEP] Asserting API response status is ${status}`);
  try {
    expect(this.apiResponse.status).toBe(status);
    console.log(`[ASSERT] API response status is ${status}`);
  } catch (err) {
    const error = err as Error;
    throw new assert.AssertionError({
      message: `[Script Issue] API response status assertion failed: ${error.message}`
    });
  }
});
