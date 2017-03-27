var fs = require('fs');

var userSettings = fs.existsSync(__dirname + '/settings.user.js') 
    ? require('./settings.user')
    : { };

var mergedSettings = {

    'baseUrl': userSettings.baseUrl || 'http://smyth.dev/',

    webdriverOptions:  {
        baseUrl: userSettings.baseUrl || 'http://smyth.dev/',
        host: 'localhost',
        port: 4444,
        waitforTimeout: 30 * 1000,
        // logLevel: 'silent',
        screenshotPath: __dirname + '/build/tests/',
        desiredCapabilities: {
            browserName: process.env.SELENIUM_BROWSER 
                || userSettings.browserName
                || 'chrome'
        }
    }
};

module.exports = mergedSettings;