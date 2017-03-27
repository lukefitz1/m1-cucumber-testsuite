var expect = require('chai').expect;
var customerFactory = require('../factories/customer-factory');
var settings = require('../../support/settings');

module.exports = function () {
    this.Given(/^I am not signed in \(guest\)$/, function () {
        // handled by before hook
    });

    this.Given(/^I have a user with the following details$/, function (table) {
        var user = table.rowsHash();

        var customer = {
            'firstname': user.Firstname,
            'lastname': user.Lastname,
            'email': user.Email,
            'password': user.Password
        };

        this.customer = customer;

        return customerFactory.get(this.customer.email).then(function (result) {
            if (result === null) {
                return customerFactory.create(customer);
            }
        });
    });

    this.When(/^click sign in button$/, function () {
        return this.webdriver.click("//button[contains(., 'Login')]");
    });

    this.Then(/^"([^"]*)" error message is displayed$/, function (errMessage) {
        return this.webdriver.waitForVisible("span=" + errMessage).then(function (isVisible) {
            expect(isVisible).to.be.true;
        });
    });

    this.Then(/^"([^"]*)" validation error is displayed$/, function (errMessage) {
        return this.webdriver.waitForVisible(".validation-advice=" + errMessage).then(function (isVisible) {
            expect(isVisible).to.be.true;
        });
    });

    this.When(/^I enter "([^"]*)" and "([^"]*)" as the credentials$/, function (email, password) {
        return this.webdriver.url(settings.baseUrl + 'customer/account/login/')
            .setValue('#email', email)
            .setValue('#pass', password);
    });

    this.Then(/^I am directed to customer dashboard$/, function () {
        return this.webdriver.getUrl(function (url) {
            expect(url).to.match(/account/);
        });
    });

    this.Then(/^"([^"]*)" is displayed on the dashboard$/, function (message) {
        return this.webdriver.isVisible(".hello*=" + message).then(function (isVisible) {
            expect(isVisible).to.be.true;
        });
    });

    this.When(/^I enter "([^"]*)" as the email$/, function (email) {
        return this.webdriver.url(settings.baseUrl + 'customer/account/login/')
            .setValue('#email', email);
    });

    this.When(/^remove focus from the email field$/, function () {
        return this.webdriver.click('#pass');
    });
};