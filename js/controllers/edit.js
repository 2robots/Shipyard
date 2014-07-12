define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('EditCtrl', function ($scope, $rootScope, $location, $http, $routeParams) {

      if(!$rootScope.user) {
        $location.path('/dashboard');
      }

      // define context
      $scope.context = {
        resource:   $routeParams.resource,
        id:         $routeParams.id,
        controller: 'ListCtrl'
      };

      $scope.data = null;

      $rootScope.markResource($scope.context.resource);
      $rootScope.findResource($scope.context.resource, function(resource){
        $scope.color = resource.color;
      });

      // add loading
      $rootScope.loading = true;

      var context = {
        resource:   $scope.context.resource,
        id:         $scope.context.id,
        controller: 'EditCtrl'
      };

      $http({
        method: 'GET',
        url: window.Shipyard.endpoint + '/' + $scope.context.resource + '/' + $scope.context.id
      }).

      success(function(data, status, headers, config) {

        // remove loading
        $rootScope.loading = false;

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

        // remove loading
        $rootScope.loading = false;
      });

      $scope.save = function(){
        alert("SPEICHERN");
        $rootScope.navigate('GET', $scope.context.resource);
      }

    });
});
