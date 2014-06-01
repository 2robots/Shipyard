define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('MainCtrl', function ($scope, $rootScope, $location) {

      $rootScope.resources = window.Shipyard.resources;
      $rootScope.user = {
        username: '',
        password: '',
        loggedin: false
      };

      $rootScope.findResource = function(id, cb){
        angular.forEach($rootScope.resources, function(resource, r_id){
          if(resource.id == id) {
            cb(resource, r_id);
          }
        });
      };

      $rootScope.markResource = function(id) {
        angular.forEach($rootScope.resources, function(resource, r_id){
          if(resource.id == id) {
            $rootScope.resources[r_id].active = true;
          } else {
            $rootScope.resources[r_id].active = false;
          }
        });
      };

      $rootScope.login = function() {
        $rootScope.user.loggedin = true;
      };

      $rootScope.navigate = function(method, resource, id){

        if($rootScope.user) {
          var path = '/manage/';
          var kid = resource;

          if(typeof(resource) == 'object') {
            kid = resource.id;
          }

          if(method == 'GET') {
            path = path + kid;
          }

          if(method == 'POST') {
            path = path + kid + "/create";
          }

          if(method == 'PUT') {
            path = path + kid + "/" + id + "/edit";
          }
          $location.path(path);
        }
      };

    });
});
