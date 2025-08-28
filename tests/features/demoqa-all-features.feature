
@demoqa
Feature: DemoQA - Full Framework Capabilities

  @demoqa @ui @ai
  Scenario: UI testing with dynamic locators and AI-driven element recognition
    Given I navigate to the "form" page
    When I fill the form with:
      | field      | value      |
      | First Name | John       |
      | Last Name  | Doe        |
      | Email      | john@qa.com|
    # And I submit the form
    # Then I should see a success message

  @demoqa @api
  Scenario: API integration with DemoQA
    When I send a GET request to the "books" endpoint
    Then the API response should have status 200
    # And the response should contain "books"

  @demoqa @auth
  Scenario: Authentication flow
    Given I navigate to the "login" page
    # When I login with username "testuser" and password "Test@123"
    # Then I should see the user profile page

  @demoqa @file
  Scenario: File upload and download
    Given I navigate to the "upload-download" page
    When I upload the file "testfile.txt" using "uploadInput"
    # Then I should see the file uploaded successfully
    # When I download the sample file
    # Then the file should be downloaded to the downloads folder

  @demoqa @table @pagination
  Scenario: Tables, filters, and pagination
    Given I navigate to the "webtables" page
    # When I filter the table by "First Name" with value "Cierra"
    # Then the table should show only rows with "Cierra" in "First Name"
    # When I go to the next page of the table
    # Then the table should update to the next set of rows

  @demoqa @form
  Scenario: Form validations
    Given I navigate to the "form" page
    # When I submit the form without filling required fields
    # Then I should see validation errors for required fields

  @demoqa @workflow
  Scenario: Complex workflow - Add to cart and checkout
    Given I navigate to the "books" page
    # When I add the book "Git Pocket Guide" to the cart
    # And I proceed to checkout
    # Then I should see the order confirmation page

  @demoqa @visual
  Scenario: Visual testing of DemoQA home page
    Given I navigate to the "home" page
    # Then the page should visually match the baseline screenshot

  @demoqa @report
  Scenario: Allure-based custom reporting
    # Given I have executed all scenarios
    # Then the Allure report should show results for all features
