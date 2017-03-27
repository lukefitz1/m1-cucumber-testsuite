var cartFactory = require('../factories/cart-factory.js');
var productFactory = require('../factories/product-factory.js');
var customerFactory = require('../factories/customer-factory.js');
var categoryFactory = require('../factories/category-factory.js');
var sessionFactory = require('../factories/session-factory.js');
var cookie;

module.exports = function() {
	
	this.Given(/^User has products in cart$/, function () {
		return sessionFactory.getCustomerSession('luke.fitzgerald@blueacorn.com', 'pass4luke').then(function(stuff) {
			cookie = stuff;
			return this.webdriver.url("/");
		}.bind(this));

		// return sessionFactory.getCartWithSimpleProduct('batest-simple.html', 1).then(function(stuff) {
		// 	cookie = stuff;
		// 	return this.webdriver.url("/");
		// }.bind(this));

		// productUrl, productQty, attrId, attrOptionId
		// return sessionFactory.getCartWithConfigProduct('batest-config.html', 1, 92, 20).then(function(stuff) {
		// 	cookie = stuff;
		// 	console.log("Cookie value: " + stuff);
		// 	return this.webdriver.url("/");
		// }.bind(this));

		// productUrl, productQty1, attrId1, attrOptionId1, productQty2, attrId2, attrOptionId2
		// return sessionFactory.getCartWithConfigProductTwoAttributes('batest-config2.html', 1, 92, 20, 180, 80).then(function(stuff) {
		// 	cookie = stuff;
		// 	console.log("Cookie value: " + stuff);
		// 	return this.webdriver.url("/");
		// }.bind(this));	
	});

	this.Given(/^User is on checkout$/, function () {
		return this.webdriver.deleteCookie('frontend').then(function() {
			return this.webdriver.setCookie({name: 'frontend', value: cookie})
		}.bind(this));
	});

	this.When(/^User selects Checkout as Guest$/, function () {
		//return this.webdriver.url("/customer/account");
		return this.webdriver.url("/checkout/cart");
		//return this.webdriver.url("/checkout/onepage");
	});

	this.When(/^User clicks continue button$/, function () {
		// Write code here that turns the phrase above into concrete actions
	});

	this.Then(/^User it taken to Billing step of checkout$/, function () {
		// Write code here that turns the phrase above into concrete actions

	});
}