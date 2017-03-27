Feature: Sign up for newsletter in footer as guest and registered user

Scenario: Signing up for newsletter as a registered user
Given User is signed in and their email is "newsletter-test@blueacorn.com"
When User enters "newsletter-test@blueacorn.com" into newsletter input field
And Clicks subscribe button
Then Newsletter subscription success message is displayed

Scenario: Signing up for newsletter as a guest user
Given User is not logged in as a customer
And Email address "newsletter-test3@blueacorn.com" is not associated with a customer account
When User enters email address "newsletter-test3@blueacorn.com" into newsletter input field
And Clicks subscribe button
Then Newsletter subscription success message is displayed

Scenario: As a guest user, when attempting to sign up for a newsletter with an email that is already associated with a customer account
Given User is not logged in as a customer
And Email address "clay@example.com" is associated with a customer account
When User enters email address "clay@example.com" into newsletter input field
And Clicks subscribe button
Then Newsletter error message is displayed

Scenario: As a registered user, when attempting to sign up for a newsletter with an email that is already associated with a different customer account
Given User is logged in as a customer
And Email address "newsletter-test5@blueacorn.com" is associated with a different customer account
When User enters email address "newsletter-test5@blueacorn.com" into newsletter input field
And Clicks subscribe button
Then Newsletter error message is displayed
