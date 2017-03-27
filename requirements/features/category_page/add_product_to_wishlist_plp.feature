Feature: Add product to wishlist from category page

@Native
Scenario: Adding product to the wishlist from category page as a guest user who has an account
Given A user is not logged in
When A user clicks the Add to Wishlist link
Then User is taken to account login page
And User logs in with valid credentials
Then Product is added to wishlist

@Native
Scenario: Adding product to the wishlist from category page as a guest user, who doesn't have an account
Given A user is not logged in
When A user clicks the Add to Wishlist link
Then User is taken to account login page
And User registers customer account
Then Product is added to wishlist

@Native
Scenario: Adding product to the wishlist from category page as a registered user
Given A user is logged in as customer
When A user clicks the Add to Wishlist link
Then Product is added to wishlist
