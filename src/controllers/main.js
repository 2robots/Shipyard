define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('MainCtrl', function ($scope, $rootScope,
      MenuService, NavigationService, AuthenticationService, EntityService, NotifyService) {

      /**
       * Init side menu and snapper.
       */
      $rootScope.menu = MenuService();

      /**
       * Init navigation manager.
       */
      $rootScope.nav = NavigationService();

      /**
       * Init authentication manager.
       */
      $rootScope.auth = AuthenticationService();

      /**
       * Init the Entity Manager.
       */
      $rootScope.entity = EntityService();

      /**
       * Init the Notification Manager.
       */
      $rootScope.notify = NotifyService();
    });
});
