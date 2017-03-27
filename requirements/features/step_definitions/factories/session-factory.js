var magentoApi = require('./api');
var soap = require('soap');
var db = require('../../support/db-connection');
var Q = require('q');
var _ = require('lodash');
var api = magentoApi();
var available_sort_by_array = ['price'];
var settings = require('../../support/settings');
var request = require('request');
var cheerio = require('cheerio');

module.exports = {

    /**
     * Creates a logged in user session, returns cookie value
     *
     * @param un
     * @param pw
     * @return sessionId
     */
    getCustomerSession: function(un, pw) {

        return Q.Promise(function(resolve, reject) {
            var cookieJar = request.jar();
            request = request.defaults({jar:cookieJar});

            request(settings.baseUrl + '/customer/account/login/', function(error, response, body) {

                var $ = cheerio.load(body);
                var formKey = $('input[name="form_key"]').val();
                //var cookie = request.cookie('XDEBUG_SESSION=XDEBUG_ECLIPSE');

                request.post(settings.baseUrl + '/customer/account/loginPost/', {
                    form:
                    {
                        form_key: formKey, 
                        'login[username]': un, 
                        'login[password]': pw
                    }
                }, function(error, response, body) {
                    console.log(body)

                    var sessionCookieIndex = _.findLastIndex(response.headers["set-cookie"], function(cookie) {
                        return cookie.match(/^frontend=(\w+);/);
                    });

                    var sessionCookie = response.headers["set-cookie"][sessionCookieIndex];
                    var sessionId = sessionCookie.match(/^frontend=(\w+);/)[1];
                    resolve(sessionId);
                })
            });
        });
    },

    /**
     * Creates a session that includes a simple product already in the cart, and returns the cookie value
     *
     * @param productUrl
     * @param productQty // optional (defaults to 1)
     * @return sessionId
     */
    getCartWithSimpleProduct: function(productUrl, productQty) {

        return Q.Promise(function(resolve, reject) {
            var cookieJar = request.jar();
            request = request.defaults({jar:cookieJar});

            request(settings.baseUrl + productUrl, function(error, response, body) {

                var $ = cheerio.load(body);
                var formKey = $('input[name="form_key"]').val();
                var formAction = $('form[id="product_addtocart_form"]').attr('action');
                var productId = $('.no-display > input[name="product"]').val();
                //var cookie = request.cookie('XDEBUG_SESSION=XDEBUG_ECLIPSE');
                
                request.post(formAction, {
                    form:
                    {
                        form_key: formKey, 
                        product: productId, 
                        qty: productQty
                    }
                }, function(error, response, body) {
                    console.log(response);
                    
                    var sessionCookieIndex = _.findLastIndex(response.headers["set-cookie"], function(cookie) {
                        return cookie.match(/^frontend=(\w+);/);
                    });

                    var sessionCookie = response.headers["set-cookie"][sessionCookieIndex];
                    var sessionId = sessionCookie.match(/^frontend=(\w+);/)[1];

                    resolve(sessionId);
                })
            });
        });

    },

    /**
     * Creates a session that includes a configurable product with 1 attribute already in the cart, and returns the cookie value
     *
     * @param productUrl
     * @param productQty // optional (defaults to 1)
     * @param attrId
     * @param attrOptionId
     * @return sessionId
     */
    getCartWithConfigProduct: function(productUrl, productQty, attrId, attrOptionId) {

        return Q.Promise(function(resolve, reject) {
            var superAttr = 'super_attribute[' + attrId + ']'; 
            var cookieJar = request.jar();
            request = request.defaults({jar:cookieJar});

            request(settings.baseUrl + productUrl, function(error, response, body) {

                var $ = cheerio.load(body);
                var formKey = $('input[name="form_key"]').val();
                var formAction = $('form[id="product_addtocart_form"]').attr('action');
                var productId = $('.no-display > input[name="product"]').val();
                // var cookie = request.cookie('XDEBUG_SESSION=XDEBUG_ECLIPSE');

                request.post(formAction, {
                    form:
                    {
                        form_key: formKey,
                        product: productId,
                        [superAttr]: attrOptionId,
                        qty: productQty
                    }
                }, function(error, response, body) {
                    var sessionCookieIndex = _.findLastIndex(response.headers["set-cookie"], function(cookie) {
                        return cookie.match(/^frontend=(\w+);/);
                    });

                    var sessionCookie = response.headers["set-cookie"][sessionCookieIndex];
                    var sessionId = sessionCookie.match(/^frontend=(\w+);/)[1];

                    resolve(sessionId);
                })
            });
        });

    },

        /**
     * Creates a session that includes a configurable product with 2 attribute already in the cart, and returns the cookie value
     *
     * @param productUrl
     * @param productQty // optional (defaults to 1)
     * @param attrId1
     * @param attrOptionId1
     * @param attrId2
     * @param attrOptionId2
     * @return sessionId
     */
    getCartWithConfigProductTwoAttributes: function(productUrl, productQty, attrId1, attrOptionId1, attrId2, attrOptionId2) {

        return Q.Promise(function(resolve, reject) {
            var superAttr1 = 'super_attribute[' + attrId1 + ']'; 
            var superAttr2 = 'super_attribute[' + attrId2 + ']'; 
            var cookieJar = request.jar();
            request = request.defaults({jar:cookieJar});

            request(settings.baseUrl + productUrl, function(error, response, body) {

                var $ = cheerio.load(body);
                var formKey = $('input[name="form_key"]').val();
                var formAction = $('form[id="product_addtocart_form"]').attr('action');
                var productId = $('.no-display > input[name="product"]').val();
                // var cookie = request.cookie('XDEBUG_SESSION=XDEBUG_ECLIPSE');

                request.post(formAction, {
                    form:
                    {
                        form_key: formKey,
                        product: productId,
                        [superAttr1]: attrOptionId1,
                        [superAttr2]: attrOptionId2,
                        qty: productQty
                    }
                }, function(error, response, body) {
                    var sessionCookieIndex = _.findLastIndex(response.headers["set-cookie"], function(cookie) {
                        return cookie.match(/^frontend=(\w+);/);
                    });

                    var sessionCookie = response.headers["set-cookie"][sessionCookieIndex];
                    var sessionId = sessionCookie.match(/^frontend=(\w+);/)[1];

                    resolve(sessionId);
                })
            });
        });

    }

}