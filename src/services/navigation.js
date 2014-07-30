define(['./module'], function (services) {
  'use strict';

  services.value('NavigationService', [])
    .factory('NavigationService', function($location, $rootScope){
      return function(){

        /**
         * Navigation object, manage all navigations.
         */
        var Navigation = {

          current: {
            method: null,
            entity: null,
            id: null
          },

          /**
           * init function
           * @return new NavigationService object
           */
          init: function(){
            return this;
          },

          /**
           *  Navigate to a controller.
           * @param  {[type]} method   HTTP Method
           * @param  {[type]} entity   entity-name
           * @param  {[type]} id       entity-identifier
           */
          go: function(method, entity, id) {

            // @TODO: authorization

            var path = '/manage/';
            var kid = entity;

            if(typeof(entity) == 'object') {
              kid = entity.id;
            }

            if(method == 'GET') {
              path = path + kid;
            }

            if(method == 'POST') {
              path = path + kid + "/create";
            }

            if(method == 'PUT') {
              path = path + kid + "/" + id + "/edit";
            }

            this.current.method = method;
            this.current.entity = entity;
            this.current.id = id;

            // change path
            $location.path(path);

            // close menu on navigate
            $rootScope.$broadcast('Shipyard.menu.close');
          }
        };

        // return initialized object
        return Navigation.init();
      }
    });
});
