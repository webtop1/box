'use strict';
var app=angular.module('myApp', []);
/*config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);*/


app.controller('MyController',function($scope){
  $scope.defaultname="hi";
  $scope.username = 'World';
  $scope.sayHello = function() {
    $scope.greeting = 'Hello ' + $scope.username + '!';
  };
});


