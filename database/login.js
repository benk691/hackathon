(function(){
var conn = require('./db').conn
var loginUtils = require('login-utils')
loginUtils.setBcryptNumberOfRounds(15);

loginUtils.findUserByUserName(username, function(http, user){
    if(err){
        console.log("An error occurred while trying to find user by user name %s", err);
    }
});

loginUtils.loginCheck(username, password, function(err, response){
    if(err) {
        console.login("An error occurred when authenticatin user %s", err);
    }
    else if(!response.user){
        console.log(response.message);
    }
    else{
        var user = response.user;
        console.log("Successfully authenticated user:%s", user.email);
    }
});

$scope.loginUser(username, password, function(err, user){
    $scope.username = username;
    $scope.password = password;
});

conn.query('SELECT username FROM GSD_User WHERE username=?', [username]).on('row', function(err, res) {
    if(err) return console.error(err)
    res.rows.
});

});
