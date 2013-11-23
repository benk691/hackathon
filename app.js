//var conString = "pg://

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('./sockets.js').listen(server),
    util = require('util');

/************** POSTGRES DATABASE STUFF **************/

// Require posgres
var pg = require('pg').native; 
// Require the credentials for connetcting to postgres
var credentials = require('./database/credentials.js').data;

// Client
var client = new pg.Client(credentials);

// Connect to the server and report any error
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  // Query time of connect
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
  });
});

/*
user_query = client.query("SELECT * FROM User");

user_query.on("row", function (row, result) {
    result.addRow(row);
});

user_query.on("end", function(result) {
    console.log(JSON.stringify(result.rows, null, "   "));
    client.end();
}
*/

/*****************************************************/

var port = process.env.PORT || 8080;
server.listen(port, function (){
    util.log('Server started on port ' + port);
});

app.use(express.static(__dirname + '/static'));
