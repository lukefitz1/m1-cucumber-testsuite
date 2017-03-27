#still need to determine how to tell if the full amount has been authorized
Feature: Full Credit Card Payment Authorization
Background: Submitted Order at Checkout
Given I have a product in my cart
And I am in checkout
#And I have submitted my order

Scenario: Successful Authorization
When I have submitted my order
Then my order is created in Magento
