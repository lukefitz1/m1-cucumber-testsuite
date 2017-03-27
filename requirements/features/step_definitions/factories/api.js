var soap = require('soap');
var Q = require('q');
var settings = require('../../support/settings');

module.exports = function () {
    var cachedClient;
    var cachedSession;

    var api = {
        user: 'api',
        key: 'apiKey',
        wsdl: settings.baseUrl + 'api/v2_soap?wsdl=1'
    };

    /**
     * Creates new soap client
     *
     * @return string cachedClient
     */
    function getClient() {
        return Q.Promise(function(resolve, reject) {
            if (cachedClient != null) {
                return resolve(cachedClient);
            }

            soap.createClient(api.wsdl, function(err, client) {
                if (err) {
                    return reject(err);
                }

                cachedClient = client;
                resolve(cachedClient);
            });
        });
    }

    /**
     * Starts magento api session
     *
     * @return string cachedSession
     */
    function getSession() {
        return Q.Promise(function (resolve, reject) {
            if (cachedSession != null) {
                return resolve(cachedSession);
            }

            getClient().then(function(client) {
                client.login({username: api.user, apiKey: api.key}, function(err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    cachedSession = result.loginReturn.$value;
                    resolve(cachedSession);
                });
            })
        });
    }

    /**
     * Creates new client session
     *
     * @return string cachedClient
     */
    function getClientSession() {
        return Q.Promise(function (resolve, reject) {
            return getSession().then(function(session) {
                cachedClient.session = session;
                resolve(cachedClient);
            });
        });
    }

    return {
        getSession: getSession,
        getClient: getClient,
        getClientSession: getClientSession
    };

};
