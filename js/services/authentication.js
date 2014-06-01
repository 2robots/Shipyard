define(['./module'], function (services) {
  'use strict';

  services.value('AuthenticationService', function($provide){
    $provide.factory('AuthenticationService', function(){
      return function(){

        var Authentication = {
          init: function(){
            return this;
          }
        };

        return Authentication.init();
      }
    });
  });
});
