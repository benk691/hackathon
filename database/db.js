// Namespace
(funtion() {

require('any-db-postgres').forceJS = true
var credentials = require('./credentials').data
require('any-db').createConnection('pg' + '://' + credentials.user + ':' + credentials.password + '@' + credentials.host + ':' + credentials.port + '/' + credentials.database, [callback])

conn.begin(function (err, conn) {

    if(err) return console.error(err);
});

});


