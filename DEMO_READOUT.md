# Universal, AI-Enhanced Test Automation Framework

## Slide-Ready Summary

### Tech Stack
- **Playwright** (browser automation)
- **CucumberJS** (BDD, data-driven scenarios)
- **TypeScript** (type safety, maintainability)
- **Allure** (advanced reporting)
- **OpenAI API** (AI/ML selector auto-healing)

### Key Features
- **Modular, Generic POMs**: Forms, tables, files—reusable for any web app
- **Dynamic Config Loading**: Selectors, URLs, API endpoints per app/site
- **AI/ML Auto-Healing**: OpenAI-powered selector recovery, Allure-logged
- **Data-Driven Steps**: Cucumber scenario outlines, JSON data
- **Allure Reporting**: Step-level detail, AI healing logs, CI/CD-friendly
- **Plug-and-Play**: Onboard new apps with config only—no code changes

### How It Works
1. Add selector/URL config JSON for your app
2. Framework loads config dynamically (via APP env variable)
3. If selectors break, AI/ML auto-healing attempts recovery and logs to Allure
4. Allure report provides step-by-step and healing insights

### Benefits
- Rapid onboarding for any web app
- Minimal maintenance, maximum reusability
- AI-powered resilience to UI changes
- Clear, actionable reporting for teams and stakeholders

---

## Live Demo Script

### 1. Show the Config-Driven Approach
- Open `src/config/selectorMap.demoqa.json` and `src/config/appConfig.demoqa.json`
- _"To onboard a new app, just add new config files—no code changes required."_

### 2. Run a Test for the Demo App
```bash
APP=demoqa npx cucumber-js --require-module ts-node/register
```
- _"Running tests for the DemoQA app using only config—no code changes."_

### 3. Simulate a Broken Selector
- Edit a selector in `selectorMap.demoqa.json` to an invalid value
- Re-run the test:
```bash
APP=demoqa npx cucumber-js --require-module ts-node/register
```
- _"Selector is broken. Watch as the AI auto-healer attempts to recover and logs the attempt."_

### 4. Show Allure Report
```bash
npm run generate:allure
# Then open allure-report/index.html in browser
```
- _"Allure report shows step-level detail and AI healing logs."_

### 5. Onboard a New App (Optional)
- Copy `selectorMap.demoqa.json` and `appConfig.demoqa.json` to new files for another app
- Update selectors/URLs as needed
- Run tests with `APP=newapp`—no code changes

---

> **Ready for any web application. Minimal config, maximum power.**
