var productFactory = require('../factories/product-factory');

module.exports = function () {

	this.Given(/^User is in simple product page$/, function () {
		return productFactory.getSimpleProduct().then(function(product) {
			
			//output product info array
			//console.log(product.info);
			//out url_path attribute 
			//console.log(product.info["url_path"]);

			var path = product.info["url_path"]["$value"];
			return this.webdriver.url("/" + path);
		}.bind(this));
	});

	this.Given(/^Product is in stock$/, function () {
		//assuming product we selected is in stock
		return this.webdriver.isVisible("span=In stock").then(function (isVisible) {
        	this.expect(isVisible).to.be.true;
        }.bind(this));
	});

	this.When(/^User clicks Add To Cart button$/, function () {
		return this.webdriver.element("#product_addtocart_form").click("span=Add to Cart");
	});

	this.Then(/^The product is added to the cart$/, function () {
		return this.webdriver.isVisible("span=Retro Chic Eyeglasses was added to your shopping cart.").then(function (isVisible) {
            this.expect(isVisible).to.be.true;
        }.bind(this));
	});

}