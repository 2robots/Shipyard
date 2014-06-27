define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('MainCtrl', function ($scope, $rootScope, $location, snapRemote) {

      $rootScope.snapper = null;

      // manage snap.js options
      snapRemote.getSnapper().then(function(snapper){
        $rootScope.snapper = snapper;
        $rootScope.snapper.settings({
          disable: 'right',
          dragger: 'none',
          minPosition: -250,
          maxPosition: 250
        });

        $rootScope.snapper.on('open', function(){
          $rootScope.snapperOpen = true;
        });

        $rootScope.snapper.on('close', function(){
          $rootScope.snapperOpen = false;
        });
      });

      $rootScope.snapperOpen = false;

      $rootScope.resources = window.Shipyard.resources;
      $rootScope.user = {
        id: -1,
        username: '',
        password: '',
        loggedin: true
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

      $rootScope.logout = function() {
        $rootScope.user.loggedin = false;
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

          // close navigation on navigate
          if($rootScope.snapper != null) {
            $rootScope.snapper.close();
          }

        }
      };

    });
});
