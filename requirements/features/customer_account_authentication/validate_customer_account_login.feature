Feature: Validate customer account login

Background:
Given I am not signed in (guest)
And I have a user with the following details

| Firstname			| Bob                   |
| Lastname          | Jones	     			|
| Email				| Bob@blueacorn.com 	|
| Password			| pass4Bob 				|

Scenario: User attempts to sign in with invalid password
When I enter "Bob@blueacorn.com" and "pass4Luke" as the credentials
And click sign in button
Then "Invalid login or password." error message is displayed

Scenario: User attempts to sign in with an invalid account
When I enter "Bob1@blueacorn.com" and "pass4Bob" as the credentials
And click sign in button
Then "Invalid login or password." error message is displayed

Scenario: User attempts to sign in with improperly formatted email
When I enter "luke.fitzgerald" as the email
And remove focus from the email field
Then "Please enter a valid email address. For example johndoe@domain.com." validation error is displayed

Scenario: User attempts to sign in with valid credentials
When I enter "Bob@blueacorn.com" and "pass4Bob" as the credentials
And click sign in button
Then I am directed to customer dashboard
And "Hello, Bob Jones!" is displayed on the dashboard
