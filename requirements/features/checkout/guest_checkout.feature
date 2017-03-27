Feature: Guest checkout

Background:
Given User has products in cart
And User is on checkout

@Native
Scenario: User selects Checkout as Guest
When User selects Checkout as Guest
And User clicks continue button
Then User it taken to Billing step of checkout