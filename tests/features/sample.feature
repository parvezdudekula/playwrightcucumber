Feature: Sample feature for Playwright and Cucumber integration

  @sample
  Scenario: Verify the title of a webpage

Feature: Playwright.dev End-to-End Validation
  @all @playwrightdev
  Scenario: Validate Playwright.dev homepage with API, DB, and UI
    Given I send a GET request to "https://api.github.com/repos/microsoft/playwright"
    Then the API response should have "full_name" as "microsoft/playwright"
    And I query the DB for user with id 1
    Then the DB result should have name "John Doe"
    When I navigate to "https://playwright.dev"
    Then the page title should be "Fast and reliable end-to-end testing for modern web apps | Playwright"
    And the "Get started" button should be visible
