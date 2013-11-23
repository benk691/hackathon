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

/*
// Drop tables that exist
client.query("DROP TABLE IF EXISTS GSD_User CASCADE", function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
});

client.query("DROP TABLE IF EXISTS GSD_Room CASCADE;", function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
});


// Create the tables
user_query = client.query("CREATE TABLE GSD_User(firstname varchar(50) NOT NULL, lastname varchar(50) NOT NULL, username varchar(50) PRIMARY KEY, password varchar(50) NOT NULL", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });

room_query = client.query("CREATE TABLE GSD_Room(room_id bigserial PRIMARY KEY)", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });

group_query = client.query("CREATE TABLE GSD_Group(room_id bigserial FOREIGN KEY REFERENCES Room(room_id) NOT NULL, username varchar(50) FOREIGN KEY REFERENCES User(username) NOT NULL)", function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
  });
*/

client.query("INSERT INTO GSD_User(firstname, lastname, username, password) VALUES($1, $2, $3, $4);", ["Ben", "K", "bkell001", "1234"], function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
});
/*
sel_user_query = client.query("SELECT * FROM GSD_User", function(err, result) {
    if(err) {
        return console.error('error running query', err);
    }
    
});;

util.log(sel_user_query);
*/
});

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
