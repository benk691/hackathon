var loginApp = angular.module('loginApp', [])

var client = require('./database/database.js').client,

function LoginUser($scope, $http) {
  $http.get('/GSD/posts').
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
    });
}
