(function (){
	var demoApp = angular.module('getStuffDone',['ngRoute']);
	
	demoApp.config(function($routeProvider){
		$routeProvider
			.when("/",
				{
					controller:"control",
					templateUrl:"/views/view1.html"
				})
			.when("/view2",
				{
					controller:"control",
					templateUrl:"/views/view2.html"
				})
			.otherwise(
				{
					redirectTo:"/"
				});
	});
	
	demoApp.controller('control', function($scope){
		$scope.customers = [
			{name:"manny"},
			{name:"John"},
			{name:"Skyler"},
			{name:"Walt"},
			{name:"Jessie"}
		];
	});
}());
