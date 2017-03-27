Feature: Add to Cart from simple product page

Background:
Given User is in simple product page

@Native
Scenario: User clicks ATC from simple product page in stock
And Product is in stock
When User clicks Add To Cart button
Then The product is added to the cart

@Native
Scenario: User clicks ATC from simple product page out of stock
And Product is out of stock
When User clicks Add To Cart button
Then The product is not added to the cart

@Native
Scenario: User clicks ATC with quantity 2 from simple product page in stock
And Product is in stock with quantity 100
When User changes quantity to 2
When User clicks Add To Cart button
Then The product is added to the cart with quantity 2

@Native
Scenario: User clicks ATC with quantity greater than stock
And Product is in stock with quantity 1
When User changes quantity to 2
When User clicks Add To Cart button
Then Error message displays indicating there is not enough stock
