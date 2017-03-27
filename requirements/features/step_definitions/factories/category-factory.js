var magentoApi = require('./api');
var soap = require('soap');
var db = require('../../support/db-connection');
var Q = require('q');
var _ = require('lodash');
var api = magentoApi();
var available_sort_by_array = ['price'];

module.exports = {

	buildCategoryDataArray: function(catName, catUrlKey) {
        return { 
            name: catName,
            is_active: 1,
            available_sort_by: {item: "name"},
            default_sort_by: "name",
            description: 'Test category description',
            is_anchor: 1,
            url_key: catUrlKey,
            include_in_menu: 1
        };
    },

    /**
     * Allows you to retrieve info about a category
     *
     * @param int catId
     * @return array info
     */
    getCategoryInfo: function(catId) {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryInfo({
                    sessionId: client.session,
                    categoryId: catId
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
     * Allows you to create new category and returns it's id
     * Only the category name and URL key are parameters right now
     *
     * @param catName
     * @param catUrlKey
     * @return int id
     */
    createCategory: function(catName, catUrlKey) {

    	var catData = this.buildCategoryDataArray(catName, catUrlKey);   
        
        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryCreate({
                    sessionId: client.session,
                    parentId: 2, //parentId of 2 is the Default Category in mage
                    categoryData: catData
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
     * Allows you to delete a category
     *
     * @param int catId
     * @return boolean
     */
    deleteCategory: function(catId) {

    	if (catId == null) {
    		console.log('Category ID is required');
    		return;
    	}

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryDelete({
                    sessionId: client.session,
                    categoryId: catId
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
     * Allows you to add products to a category
     *
     * @param int catId
     * @param string prodSku
     * @return boolean
     */
    addProdToCategory: function(catId, prodSku) {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryAssignProduct({
                    sessionId: client.session,
                    categoryId: catId,
                    product: prodSku
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
     * Allows you to remove a product from a category
     *
     * @param int catId
     * @param string prodSku
     * @return boolean
     */
    removeProdFromCategory: function(catId, prodSku) {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryRemoveProduct({
                    sessionId: client.session,
                    categoryId: catId,
                    product: prodSku
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
     * Allows you to update a category 
     *
     * @param int catId
     * @param string attribute
     * @param string value
     * @return boolean
     */
    updateCategoryAttribute: function(catId, attribute, value) {

    	var updateData = {};
    	updateData[attribute] = value;

    	return Q.Promise(function(resolve, reject) {
    		api.getClientSession().then(function(client) {
    			client.catalogCategoryUpdate({
    				sessionId: client.session,
    				categoryId: catId,
    				categoryData: updateData
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
     * Allows you to update a category 
     *
     * @param int catId
     * @param array attributeArray
     * @return boolean
     */
    updateCategoryAttributes: function(catId, attributeArray) {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryUpdate({
                    sessionId: client.session,
                    categoryId: catId,
                    categoryData: attributeArray
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
     * Allows you to retrieve the list of category attributes
     *
     * @return array result
     */
    getCategoryAttributes: function() {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryAttributeList({
                    sessionId:client.session
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
     * Allows you to retrieve the attribute options of an attribute
     *
     * @param string attributeCode
     * @return array result
     */
    getCategoryAttributeOptions: function(attributeCode) {

        return Q.Promise(function(resolve, reject) {
            api.getClientSession().then(function(client) {
                client.catalogCategoryAttributeOptions({
                    sessionId:client.session,
                    attributeId: attributeCode
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