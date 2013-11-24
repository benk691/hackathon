//var conString = "pg://
"use strict"; // NO IDEA WHAT THIS IS

var gsdApp =  angular.module('gsdApp', []).
    config(function($routeProvider) {
        $routeProvider
            .when('/',
            {
                controller: 'LoginController'
                templateUrl: 'login.html'
            })
            .otherwise({ redirectTo: '/' });
    });

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('./sockets.js').listen(server),
    client = require('./database/database.js').client,
    util = require('util');

var port = process.env.PORT || 8080;
server.listen(port, function (){
    util.log('Server started on port ' + port);
});

app.use(express.static(__dirname + '/static'));

