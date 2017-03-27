var expect = require('chai').expect;
var settings = require('../../support/settings');

module.exports = function () {

	this.Given(/^Email address "([^"]*)" is associated with a customer account$/, function (email) {
		//need to utilize customer factory class here to get an email with an already existing user account
		//return
	});

	this.Then(/^Newsletter error message is displayed$/, function () {
		return this.webdriver.isVisible("span=There was a problem with the subscription: This email address is already assigned to another user.").then(function (isVisible) {
            expect(isVisible).to.be.true;
        });
	});

}