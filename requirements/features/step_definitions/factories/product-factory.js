var magentoApi = require('./api');
var soap = require('soap');
var db = require('../../support/db-connection');
var Q = require('q');
var _ = require('lodash');
var api = magentoApi();

module.exports = {

    buildProductDataArray: function(prodName, urlKey, cat) {
        return { 
            categories: { item: 58 },
            websites:{ item: 1 },
            name: prodName,
            description: 'Test Description',
            short_description: 'Test Short description',
            categories: { item: cat }, // doesnt work
            weight: '1',
            status: '1',
            url_key: urlKey,
            visibility: '4', // 4 = catalog, search
            price: '1.00',
            tax_class_id: 'None',
            stock_data: {
                qty: '1000',
                is_in_stock: 1
            }
        };
    },

    buildProductCustomAttributeReturnArray: function(code) {
        return {          
            'additional_attributes': {
                'key': code
            }
        };
    },

    buildProductCustomAttributeUpdateArray: function(code, value) {
        var test = {
            "name":"Product name new1",
            "additional_attributes":{
                "single_data": { 
                    "item": {
                        "key":"test_attribute",
                        "value":233
                    }
                }
            }
        };
        return test;
    },

    /**
     * Allows user to access all product info
     *
     * @param int prodId
     * @return array
     */
	getProductInfo: function(prodId) {
		
        if (prodId == '') {
            console.log("No product ID was given");
            return;
        }

		return Q.Promise(function (resolve, reject) {
			api.getClientSession().then(function(client) {
				client.catalogProductInfo({
                    sessionId: client.session,
                    productId: prodId 
                }, function (err, result) {
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
     * Allows you to create a product
     * Only product type (simple, configurable, giftcard, etc), product name, sku, attribute set, urlKey, and category 
     * are parameters (all other attributes have default values set), but more can be added
     *
     * @param string prodType 
     * @param string prodName
     * @param string sku
     * @param string attrSet
     * @param string urlKey
     * @param string cat
     * @return int result
     */
    createProduct: function(prodType, prodName, sku, attrSet, urlKey, cat) {
        
        var prod = this.buildProductDataArray(prodName, urlKey, cat);

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogProductCreate({
                    sessionId: client.session,
                    type: prodType,
                    set: attrSet, //4 = default attribute set
                    sku: sku,
                    productData: prod
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
     * Allows you to retrieve the list of product attribute sets
     *
     * @return array
     */
    getProductAttributeSets: function() {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogProductAttributeSetList({
                    sessionId: client.session
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
     * Allows you to retrieve the list of stock data for one product by product SKU
     *
     * @param string prodSku
     * @returns int stock
     */
    getProductStock: function(prodSku) {
        //handles wanting just 1 product's stock, instead of multiple
        //prodSku can be either a sku or id
        if (prodSku == null) {
            console.log("prodSku is not defined");
            return;
        } else {
            prods = [prodSku];
        }

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogInventoryStockItemList({
                    sessionId: client.session,
                    products: prods
                }, function(err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    prod = result["result"]["item"]["qty"]["$value"];
                    resolve(prod);
                });
            });
        });
    },

    /**
     * Allows you to retrieve the list of stock data for multiple products by product SKU
     *
     * @param array prodSku
     * @returns array result
     */
    getProductsStock: function(prodSkus) {
        //handles multiple products stock requests
        //prodSku can be either skus or ids
        if (prodSkus == null) {
            console.log("prodSkus is not defined");
            return;
        }

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogInventoryStockItemList({
                    sessionId: client.session,
                    products: prodSkus
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
     * Allows you to update a product's stock
     *
     * @param string prodSku
     * @param string updateQty
     * @param int inStockFlag
     * @return int result
     */
    updateProductStock: function(prodSku, updateQty, inStockFlag) {
        //prodSku = product SKU
        //updateQty (string) = amount Qty is to be updated too 
        //inStockFlag = 0 (out of stock), 1 (in stock)

        if (prodSku == null || updateQty == null || inStockFlag == null) {
            console.log("Not all arguments are defined");
            return;
        } else {
            stockData = {
                'qty': updateQty,
                'is_in_stock' : inStockFlag
            }
        }
        
        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogInventoryStockItemUpdate({
                    sessionId: client.session,
                    product: prodSku,
                    data: stockData
                }, function(err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                })
            });
        });
    },

    /**
     * Allows you to update a native magento product attribute
     *
     * @param string productSku
     * @param string attributeCode
     * @param string value
     * @return boolean
     */
    updateProductAttribute: function(productSku, attributeCode, value) {
        
        var updateData = {};
        updateData[attributeCode] = value;

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogProductUpdate({
                    sessionId: client.session,
                    product: productSku,
                    productData: updateData
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
     * Allows you to retrieve the list of product attributes
     *
     * @param setId
     * @return array result
     */
    getCatalogProductAttributeList: function(setId) {
        
        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogProductAttributeList({
                    sessionId: client.session,
                    setId: 4
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
     * Allows you to access custom product attribute options for a product
     *
     * @param string productSku
     * @param string attributeCode
     * @return array options_container
     */
    getProductCustomAttributeArray: function(productSku, attributeCode) {
        var attributeData = this.buildProductCustomAttributeReturnArray(attributeCode);

        return Q.Promise(function (resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogProductInfo({
                    sessionId: client.session,
                    productId: productSku, //product sku
                    attributes: attributeData
                }, function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    arr = result.info.options_container;
                    resolve(arr);
                });
            });
        });
    },

    /**
     * Allows you to update a custom product attribute
     *
     * @param string productSku
     * @param string attributeCode
     * @param int optionId
     * @return boolean
     */
    updateCustomProductAttribute: function(productSku, attributeCode, optionId) {

        if (productSku == null || attributeCode == null || optionId == null) {
            console.log("Not all arguments are defined");
            return;
        } else {
            var attributeData = this.buildProductCustomAttributeUpdateArray(attributeCode, optionId);
        }

        console.log(attributeData);

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogProductUpdate({
                    sessionId: client.session,
                    product: productSku,
                    productData: attributeData
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