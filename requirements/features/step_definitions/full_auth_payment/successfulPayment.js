var expect = require('chai').expect;
var settings = require('../../support/settings');

module.exports = function () {
	this.Given(/^I have a product in my cart$/,function(){
		this.webdriver.url(settings.baseUrl + 'rambler-tumbler-straw-lid/');
	    this.webdriver.click('#jq-purchase-block > div.purchase.block > button');
		return this.webdriver.waitForVisible('#header-cart > div.minicart-wrapper > div.minicart-actions > ul').then(function(){
			//change to https and provide new creds, for checking out on staging
			var env = settings.baseUrl.replace('http', 'https');
			this.url(env + 'checkout/onepage/');
			//this.click('#header-cart > div.minicart-wrapper > div.minicart-actions > ul > li > a');
		});
	});

	this.Given('I am in checkout', function(){
		return this.webdriver.waitForVisible('#login-email').then(function(){
			this.setValue('#login-email', 'test1@test.com');
			this.setValue('#login-password', 'password').then(function(){
				this.click('#checkout-step-login > div:nth-child(2) > div.col-2 > div > button').then(function(){
					this.waitForVisible('#billing-buttons-container > button').then(function(){
						this.click('#billing-buttons-container > button').then(function(){
							this.waitForVisible('#shipping-method-buttons-container > button').then(function(){
								this.click('#shipping-method-buttons-container > button');
							});
						});
					});
				});
			});
		});
	});

	this.When(/^I have submitted my order$/, function(){
		this.webdriver.waitForVisible('#uniform-p_method_cashondelivery').then(function(){
			this.click('#p_method_cashondelivery');
		});

		return this.webdriver.waitForSelected('#p_method_cashondelivery').then(function(){
			this.click('#other-payment-container > div > div > button');
		});
	});

	this.Then(/^my order is created in Magento$/, function(){
		return this.webdriver.waitForVisible('body > div.wrapper > div.page > div.main.col1-layout > div > h2').then(function(){
			this.saveScreenshot('./after.png');
			this.isExisting('body > div.wrapper > div.page > div.main.col1-layout > div > p:nth-child(3) > a').then(function (isExisting) {
        		expect(isExisting).to.be.true;
       		});
		});
	});
}