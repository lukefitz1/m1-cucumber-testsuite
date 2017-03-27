var expect = require('chai').expect;
var settings = require('../../support/settings');

module.exports = function () {

    //gherkin lingo, doesn't really need to be implmented as it is the default state
    this.Given(/^User is not logged in as a customer$/, function () { });

    this.Given(/^Email address "([^"]*)" is not associated with a customer account$/, function (email) {
        //check to make sure user doesnt exist, throw exception if they do
    });

    this.When(/^User enters email address "([^"]*)" into newsletter input field$/, function (email) {
        return this.webdriver.url(settings.baseUrl).setValue('#newsletter', email);
    });

    this.When(/^Clicks subscribe button$/, function () {
        return this.webdriver.click("button=Subscribe");
    });

    this.Then(/^Newsletter subscription success message is displayed$/, function () {
        return this.webdriver.isVisible("span=Thank you for your subscription.").then(function (isVisible) {
            expect(isVisible).to.be.true;
        });
    });

}