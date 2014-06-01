/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-route',
    'jquery',
    './controllers/index',
    './services/index'
], function (angular) {
    'use strict';

    return angular.module('shipyard', [
        'shipyard.controllers',
        'shipyard.services',
        'ngRoute'
    ]);
});
