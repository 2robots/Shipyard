define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('EditCtrl', function ($scope, $rootScope, $location, $http, $routeParams, endpoint) {

      // define context
      $scope.context = {
        resource:     $routeParams.resource,
        id:         $routeParams.id,
        controller: 'ListCtrl'
      };

      $scope.data = null;
      $scope.error = null;
      $scope.success = null;

      $rootScope.entity.setCurrent($scope.context.resource);

      // add loading
      $scope.loading = true;

      var context = {
        resource:   $scope.context.resource,
        id:         $scope.context.id,
        controller: 'EditCtrl'
      };

      $http({
        method: 'GET',
        url: endpoint + '/' + $scope.context.resource + '/' + $scope.context.id
      }).

      success(function(data, status, headers, config) {

        // remove loading
        $scope.loading = false;

        $scope.data = data;

      }).

      error(function(data, status, headers, config) {
        console.log(data);

        // remove loading
        $scope.loading = false;
      });

      $scope.save = function(){

        // add loading
        $rootScope.loading = true;
        $scope.error = null;
        $scope.success = null;

        // try to save content to server
        $http({
          method: 'PUT',
          url: window.Shipyard.endpoint + '/' + $scope.context.resource + '/' + $scope.context.id,
          data: $scope.data
        }).

        success(function(data, status, headers, config) {

          // remove loading
          $rootScope.loading = false;

          // set success-message
          $scope.success = true;

          setTimeout(function(){
            $rootScope.navigate('GET', $scope.context.resource);
          }, 3000);
        }).

        error(function(data, status, headers, config) {
          console.log(data);

          // remove loading
          $rootScope.loading = false;

          // set error-message
          $scope.error = data.detail;
        });
      }

    });
});
