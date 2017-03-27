var fs = require('fs');

var userSettings = fs.existsSync(__dirname + '/settings.user.js')
    ? require('./settings.user')
    : { };

var mysql      = require('mysql');

var connection = mysql.createConnection({
    host     : userSettings.dbHost || 'localhost',
    user     : userSettings.dbUser || 'root',
    password : (userSettings.dbPass == null) ? 'root' : userSettings.dbPass,
    database : 'smyth'
});

module.exports = connection;