var magentoApi = require('./api');
var soap = require('soap');
var db = require('../../support/db-connection');
var Q = require('q');
var _ = require('lodash');
var api = magentoApi();

module.exports = {

    buildCustomerArray: function() {
        return {
            "mode":"customer",
            "customer_id": 143,
            "firstname":"Luke",
            "lastname":"Fitzgerald",
            "email": "luke.fitzgerald@blueacorn.com",
            "password": "pass4luke",
            "confirmation": "true",
            "website_id": 1,
            "group_id": 1,
            "store_id": 1
        };
    },

    /**
     * Allows you to retrieve full information about the shopping cart
     *
     * @param int cartQuoteId
     * @return array
     */
    getCartInfo: function(cartQuoteId) {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.shoppingCartInfo({
                    sessionId: client.session,
                    quoteId: cartQuoteId,
                }, function(err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    },

    /**
     * Creates an empty shopping cart
     *
     * @return int cartId
     */
	createEmptyCart: function() {

		return Q.Promise(function(resolve, reject) {
			api.getClientSession().then(function(client) {
				client.shoppingCartCreate({
					sessionId: client.session,
                    storeId: "1"
				}, function(err, result) {
					if (err) {
						reject(err);
						return;
					}
					resolve(result);
				});
			});
		});
	},

    /**
     * Allows you to add product(s) to cart
     * Products are passed to method in an array
     * 
     * @param int cartQuoteId
     * @param array prodArray
     * @return boolean
     */
    addProductToCartQuote: function(cartQuoteId, prodArray) {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.shoppingCartProductAdd({
                	sessionId: client.session,
                	quoteId: cartQuoteId,
                	products: prodArray
                }, function(err, result) {
                	if (err) {
                		reject(err);
                		return;
                	}
                	resolve(result);
                });
            });
        });
    },

    /**
     * Allows you to add information about the customer to a shopping cart
     *
     * @param int cartQuoteId
     * @return boolean
     */
    setCartCustomer: function(cartQuoteId) {
    	var customerData = this.buildCustomerArray();

    	return Q.Promise(function(resolve, reject) {
    		api.getClientSession().then(function(client) {
    			client.shoppingCartCustomerSet({
    				sessionId: client.session,
    				quoteId: cartQuoteId,
    				customer: customerData,
                    store: 1
    			}, function(err, result) {
    				if (err) {
    					reject(err);
    					return;
    				}
    				resolve(result);
    			});
    		});
    	});
    }

}