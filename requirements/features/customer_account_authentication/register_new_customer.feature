Feature: Register new customer
As a new user
I would like to be able to register for an account
And I would like for the registration page to prevent me from registering if I don't enter valid values

Background:
Given User is not signed in (guest)
And User does not already have an account

@Native
Scenario: User attempts to register without required Fields
When I do not provide the following required Fields
| First Name |
| Last Name |
| Email |
| Password |
| Confirm Password |
Then I am prevented from registering
And and required field error messages are displayed for all these fields

@Native
Scenario: User attempts to register with passwords that don't match
When I enter "pass4luke" as the Password and "passw0rd" as the Confirm Password
Then I am prevented from registering
And the passwords don't match validation message is displayed

@Native
Scenario: User attempts to register with an invalid
When I enter "luke.fitzgerald@blueacorn" as the Email address
Then I am prevented from registering
And an invalid email address message is displayed

@Native
Scenario: User attempts to register with valid data with newsletter selected
When User registers with the following data
| First Name          | Luke               |
| Last Name           | Fitzgerald         |
| Email               | test@blueacorn.com |
| Password            | pass4test          |
| Confirm Password    | pass4test          |
| Newsletter Selected | true               |
Then User is taken to account dashboard
And Confirmation message is displayed
And User is registered for newsletters

@Native
Scenario: User attempts to register with valid data without newsletter selected
When I register with valid registration data
And the Newsletter checkbox is not selected
Then User is not registered for newsletters
