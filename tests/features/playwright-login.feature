Feature: Playwright.dev Login with Large Dataset
    @all @playwrightdev @login @large-dataset
  Scenario Outline: Login with multiple users from large dataset
    Given I navigate to "https://playwright.dev"
    When I login with username "<username>" and password "<password>"
    Then the page title should be "Fast and reliable end-to-end testing for modern web apps | Playwright"

    Examples:
      | username | password |
      | user1    | pass1    |
      | user2    | pass2    |
      | user3    | pass3    |
      | user4    | pass4    |
      | user5    | pass5    |
