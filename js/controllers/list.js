define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('ListCtrl', function ($scope, $rootScope, $location, $http, $routeParams) {

      if(!$rootScope.user) {
        $location.path('/dashboard');
      }

      $scope.resource = $routeParams.resource;
      $scope.data = null;

      $rootScope.markResource($scope.resource);
      $rootScope.findResource($scope.resource, function(resource){
        $scope.color = resource.color;
      });

      var context = {
        resource:   $scope.resource,
        id:         null,
        controller: 'ListCtrl'
      };

      $http({
        method: 'GET',
        url: window.Shipyard.endpoint + '/' + $scope.resource
      }).

      success(function(data, status, headers, config) {

        if(angular.isFunction(window.Shipyard.hook_preprocess_data)) {
          window.Shipyard.hook_preprocess_data(data, context, function(mdata){
            $scope.data = mdata;
          });
        } else {
          $scope.data = data;
        }

      }).

      error(function(data, status, headers, config) {
        console.log(data);
      });
    });
});
