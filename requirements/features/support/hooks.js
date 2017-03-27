var selenium = require('selenium-standalone');
var settings = require('./settings');

module.exports = function () {

    this.registerHandler('BeforeFeatures', function () {
        // before ALL feature setup here
        require('./db-connection');
    });

    this.Before(function (scenario) {
        // initialize webdriver.io
        this.webdriver = require('webdriverio').remote(settings.webdriverOptions);
        this.expect = require('chai').expect;       
        this.settings = require('./settings');
        return this.webdriver.init();
    });

    this.After(function (scenario) {
        try {
            if (scenario.isFailed()) {/*
                this.webdriver.saveScreenshot('build/tests/' + scenario.getName() + '.png');
                return this.webdriver.screenshot().then(function (screenshot) {
                    scenario.attach(screenshot, 'image/png');
                });*/
            }
        }
        finally {
            // teardown webdriver.io
            // if (this.webdriver != null) {
            //     return this.webdriver.end();
            // }
        }
    });

    this.registerHandler('AfterFeatures', function () {
        // after ALL feature setup here
        var db = require('./db-connection');
        db.end();
    });
};