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

// Drop tables that exist
client.query("DROP TABLE IF EXISTS User;");
client.query("DROP TABLE IF EXISTS Room;");

// Create the tables
user_query = client.query("CREATE TABLE User(firstname varchar(50) NOT NULL, lastname varchar(50) NOT NULL, username varchar(50) PRIMARY KEY, password varchar(50) NOT NULL, room_id bigserial FOREIGN KEY REFERENCES Room(room_id);");

room_query = client.query("CREATE TABLE Room(room_id bigserial PRIMARY KEY, username varchar(50) FOREIGN KEY REFERENCES User(username) NOT NULL);");

client.query("INSERT INTO User VALUES('Ben', 'Kellogg', 'bkell001', '1234', 1);");

user_query = client.query("SELECT * FROM User;");

util.log(user_query);

/*
user_query.on("row", function (row, result) {
    result.addRow(row);
});
*/

/*
user_query.on("end", function(result) {
    console.log(JSON.stringify(result.rows, null, "   "));
    client.end();
});
*/

/*****************************************************/

var port = process.env.PORT || 8080;
server.listen(port, function (){
    util.log('Server started on port ' + port);
});

app.use(express.static(__dirname + '/static'));
