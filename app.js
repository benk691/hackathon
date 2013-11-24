//var conString = "pg://
var http = require('http')

var express = require('express'),
    app = express(),
    path = require('path'),
    reload = require('reload'),
    server = require('http').createServer(app),
    io = require('./sockets.js').listen(server),
    //client = require('./database/database.js').client,
    conn = require('./database/db.js').conn,
    anyDB = require('any-db'),
    util = require('util');

app.post('/login', function(req, res) {
    var post = req.div;
    util.log(post.username)
    util.log(post.password)
});

app.get(function(req, res) {
    util.log('req = ' + req)
    util.log('res = ' + res)
});

reload(server, app)

var port = process.env.PORT || 8080;
server.listen(port, function (){
    util.log('Server started on port ' + port);
});

app.use(express.static(__dirname + '/static'));

