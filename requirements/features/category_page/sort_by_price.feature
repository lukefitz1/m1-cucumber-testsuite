Feature: Sort by price

Scenario: On a PLP, User wants to sort the products by price 
Given User is on product listing page
When User enters changes the sort option to 'Price'
Then Products are sorted by price from low to high (default)