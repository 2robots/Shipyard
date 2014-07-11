/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-route',
    'angular-animate',
    'angular-snap',
    'ng-table',
    'jquery',
    'wysihtml5',
    './controllers/index',
    './services/index'
], function (angular) {
    'use strict';

    return angular.module('shipyard', [
        'shipyard.controllers',
        'shipyard.services',
        'ngRoute',
        'ngAnimate',
        'snap',
        'ngTable'
    ]);
});
