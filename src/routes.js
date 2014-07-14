/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['src/shipyard'], function (app) {
    'use strict';
    return app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.

        when('/dashboard', {
            controller: 'DashboardCtrl',
            template: function(routeParams) {
                return '';
            }
        }).

        when('/manage/:resource', {
            controller: 'ListCtrl',
            templateUrl: function(routeParams) {
                return window.Shipyard.templates + "/GET_" + routeParams.resource + ".tpl";
            }
        }).

        when('/manage/:resource/create', {
            controller: 'CreateCtrl',
            templateUrl: function(routeParams) {
                return window.Shipyard.templates + "/POST_" + routeParams.resource + ".tpl";
            }
        }).

        when('/manage/:resource/:id/edit', {
            controller: 'EditCtrl',
            templateUrl: function(routeParams) {
                return window.Shipyard.templates + "/PUT_" + routeParams.resource + ".tpl";
            }
        }).

        otherwise({
            redirectTo: '/dashboard'
        });
    }]);
});
