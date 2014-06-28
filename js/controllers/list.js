define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('ListCtrl', function ($scope, $rootScope, $location, $filter, $http, $routeParams, ngTableParams, $q) {


    // redirect, of not logedin
    if(!$rootScope.user) {
      $location.path('/dashboard');
    }




    // define context
    $scope.context = {
      resource:   $routeParams.resource,
      id:         null,
      controller: 'ListCtrl'
    };


    // set this resource active
    $rootScope.markResource($scope.resource);


    $scope.showFilter = false;
    $scope.data = [];

    // load data
    $http({
      method: 'GET',
      url: window.Shipyard.endpoint + '/' + $scope.context.resource
    }).

    // on success
    success(function(data, status, headers, config) {

      // hook-function to preprocess data
      if(angular.isFunction(window.Shipyard.hook_preprocess_data)) {
        window.Shipyard.hook_preprocess_data(data, $scope.context, function(mdata){

          // get data
          $scope.data = mdata;

          // reload table
          $scope.tableParams.reload();
        });
      } else {

        // get data
        $scope.data = data;

        // reload table
        $scope.tableParams.reload();
      }

    }).

    // on error
    error(function(data, status, headers, config) {
      console.log(data);
    });


    // load data into ng-table
    $scope.tableParams = new ngTableParams(

    // general settings
    {
      page: 1,
      count: 1000

    // data settings
    }, {
      counts: [],
      total: $scope.data.length,
      getData: function($defer, params){
        // use build-in angular filter

        console.log(params.filter());
        var orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;
        orderedData = params.filter() ? $filter('filter')(orderedData, params.filter()) : orderedData;

        params.total(orderedData);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });



    $scope.filter_data_boolean = function(l_true, l_false) {

      var def = $q.defer();
      def.resolve([
        {id: true, title: l_true},
        {id: false, title: l_false}
      ]);

      return def;
    };

  });
});
