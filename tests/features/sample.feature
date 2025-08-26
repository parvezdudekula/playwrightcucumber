Feature: Sample feature for Playwright and Cucumber integration

  @sample
  Scenario: Verify the title of a webpage
    Given I navigate to the Playwright website
    When I check the title of the page
    Then the title should be "Fast and reliable end-to-end testing for modern web apps | Playwright"
