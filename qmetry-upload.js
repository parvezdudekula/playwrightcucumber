// QMetry Upload Plugin for Playwright+Cucumber+Allure
// Usage: node qmetry-upload.js
// Requires QMetry API credentials and project info as environment variables or config

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// --- CONFIG ---
const QMETRY_URL = process.env.QMETRY_URL || 'https://qmetry.yourdomain.com/rest/api/latest/importresult';
const QMETRY_API_KEY = process.env.QMETRY_API_KEY || '<YOUR_API_KEY>';
const QMETRY_PROJECT = process.env.QMETRY_PROJECT || '<YOUR_PROJECT_KEY>';
const QMETRY_TESTSUITE = process.env.QMETRY_TESTSUITE || '<YOUR_TESTSUITE_ID>';
const ALLURE_RESULTS_DIR = path.resolve(__dirname, 'allure-results');

// --- MAIN ---
async function main() {
  // Find all Cucumber JSON files in allure-results
  const files = fs.readdirSync(ALLURE_RESULTS_DIR).filter(f => f.endsWith('.json'));
  if (!files.length) {
    console.error('No JSON result files found in', ALLURE_RESULTS_DIR);
    process.exit(1);
  }

  for (const file of files) {
    const filePath = path.join(ALLURE_RESULTS_DIR, file);
    const data = fs.readFileSync(filePath, 'utf-8');
    let json;
    try {
      json = JSON.parse(data);
    } catch (e) {
      console.warn('Skipping invalid JSON:', file);
      continue;
    }
    // Prepare QMetry payload (basic mapping)
    const payload = {
      project: QMETRY_PROJECT,
      testSuite: QMETRY_TESTSUITE,
      resultFileType: 'cucumber',
      result: Buffer.from(data).toString('base64'),
      // Add more fields as needed
    };
    try {
      const res = await axios.post(QMETRY_URL, payload, {
        headers: {
          'apiKey': QMETRY_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      console.log(`Uploaded ${file} to QMetry:`, res.data);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.response ? err.response.data : err.message);
    }
  }
}

main();
