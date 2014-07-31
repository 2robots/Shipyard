define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('ListCtrl', function ($scope, $rootScope, $location, $filter, $http, $routeParams, ngTableParams, $q, endpoint, hook_get_data) {

    // define context
    $scope.context = {
      resource:   $routeParams.resource,
      id:         null,
      controller: 'ListCtrl'
    };


    // set this entity active
    $rootScope.entity.setCurrent($scope.context.resource);


    $scope.showFilter = false;
    $scope.data = [];
    $scope.filter = [];

    // add loading
    $rootScope.loading = true;

    // load data
    $http({
      method: 'GET',
      url: endpoint + '/' + $scope.context.resource
    }).

    // on success
    success(function(data, status, headers, config) {

      // get data
      $scope.data = hook_get_data(data);

      // reload table
      $scope.tableParams.reload();

      // remove loading
      $rootScope.loading = false;
    }).

    // on error
    error(function(data, status, headers, config) {
      console.log(data);

      // remove loading
      $rootScope.loading = false;
    });

    // load data into ng-table
    $scope.tableParams = new ngTableParams(

    // general settings
    {
      page: 1,
      count: 1000,
      filter: $scope.filter

    // data settings
    }, {
      counts: [],
      total: $scope.data.length,
      getData: function($defer, params){
        // use build-in angular filter

        var orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;
        orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;

        params.total(orderedData);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });

  });
});
