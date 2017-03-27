var magentoApi = require('./api');
var soap = require('soap');
var db = require('../../support/db-connection');
var Q = require('q');
var _ = require('lodash');
var api = magentoApi();

module.exports = {

    /**
     * Edit system config settings
     *
     * @param string path
     * @param value
     * @return boolean
     */
	editSysConfig: function(configPath, configValue) {

		return Q.Promise(function(resolve, reject) {
			api.getClientSession().then(function(client) {
				client.shoppingCartCreate({
					sessionId: client.session,
					path: configPath,
					value: configValue
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