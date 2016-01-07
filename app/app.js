'use strict';

var fileApp = angular.module('fileApp', ['ngRoute']);

fileApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/files', {
          templateUrl: '../app/templates/file-main.html',
          controller: 'filelistController'
        }).
        when('/share', {
          templateUrl: '../app/templates/share.html',
          controller: 'shareController'
        }).
        when('/files/self', {
          templateUrl: '../app/templates/file-self.html',
          controller: 'shareController'
        }).
        otherwise({
          redirectTo: '/files'
        });
  }]);
