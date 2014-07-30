define(['./module'], function (services) {
  'use strict';

  services.value('AuthenticationService')
    .factory('AuthenticationService', function(hook_login, hook_logout){
      return function(){

        /**
         * AuthenticationService object
         */
        var Authentication = {

          expire: 4000000,
          token: false,

          /**
           * init function
           * return instance of AuthenticationService
           */
          init: function(){

            // try to get the token from  localStorage
            if(localStorage.getItem("Shipyard.token_expire") >= (new Date().getTime())) {
              this.token = localStorage.getItem("Shipyard.token");
            } else {
              localStorage.setItem("Shipyard.token", false);
            }

            return this;
          },

          login: function(user){

            var t = this;

            hook_login(user, function(success, token){
              if(success) {
                t.saveToken(token);
              }
            });
          },

          logout: function() {

            var t = this;

            hook_logout(function(success){
              t.deleteToken();
            });
          },

          loggedin: function() {
            return this.token !== false;
          },

          saveToken: function(token) {
            this.token = token;

            var expire = (new Date().getTime()) + this.expire;

            localStorage.setItem("Shipyard.token", token);
            localStorage.setItem("Shipyard.token_expire", expire);
          },

          deleteToken: function() {
            this.token = false;
            localStorage.removeItem("Shipyard.token");
            localStorage.removeItem("Shipyard.token_expire");
          },
        };

        // return new instance.
        return Authentication.init();
      }
    });
});
