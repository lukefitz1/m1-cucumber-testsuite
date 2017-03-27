var expect = require('chai').expect;

module.exports = function() {

	this.Given(/^User is on product listing page$/, function () {
		//need to pass in category page here instead of statically defining page
	    return this.webdriver.url("http://smyth.dev/women/women-new-arrivals.html").isExisting("body > div.wrapper > div.page > div.main-container.col3-layout > div > div.col-wrapper > div.col-main > div.category-products > div.toolbar > div.sorter > div > div > select").then(function(isExisting) {
	    	expect(isExisting).to.be.true;
	    });
    });

    this.When(/^User enters changes the sort option to 'Price'$/, function () {
        return this.webdriver.selectByVisibleText("body > div.wrapper > div.page > div.main-container.col3-layout > div > div.col-wrapper > div.col-main > div.category-products > div.toolbar > div.sorter > div > div > select","Price");
    });

    this.Then(/^Products are sorted by price from low to high \(default\)$/, function () {
    	//price selector = body > div.wrapper > div.page > div.main-container.col3-layout > div > div.col-wrapper > div.col-main > div.category-products > ul > li > div > div.price-box
    	this.webdriver.elements("body > div.wrapper > div.page > div.main-container.col3-layout > div > div.col-wrapper > div.col-main > div.category-products > ul > li", function(res) {
    		console.log('Test', res);
    	});
    });
}