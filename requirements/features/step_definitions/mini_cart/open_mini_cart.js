var expect = require('chai').expect;
var settings = require('../../support/settings');

module.exports = function () {
	
	this.Given(/^User is on homepage$/, function () {
		//need to give webdriver somewhere to go, which is why homepage is here ... can be any page on the site
		return this.webdriver.url(settings.baseUrl);
	});

	this.When(/^User clicks mini cart icon in the header$/, function () {
		return this.webdriver.click("#header > div > div.skip-links > div > div");
	});

	this.Then(/^Mini cart block is displayed$/, function () {
		 return this.webdriver.isVisible("#header-cart").then(function (isVisible) {
            expect(isVisible).to.be.true;
        });
	});

}