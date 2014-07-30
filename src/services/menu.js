define(['./module'], function (services) {
  'use strict';

  services.value('MenuService', [])
    .factory('MenuService', function(snapRemote, $rootScope){
      return function(){

        /**
         * Menu object, holds snapper.
         */
        var Menu = {

          width: 250,
          snapper: null,
          open: false,

          /**
           * init function
           * @return new MenuService object
           */
          init: function(){
            var t = this;

            t.initSnapper();

            // listen to rootScope broadCasts
            $rootScope.$on('Shipyard.menu.close', function(){ t.close(); });
            $rootScope.$on('Shipyard.menu.open', function(){ t.open(); });

            return this;
          },

          /**
           * init snapper object.
           */
          initSnapper: function() {

            var t = this;
            snapRemote.getSnapper().then(function(snapper){
              t.snapper = snapper;

              t.snapper.settings({
                disable: 'right',
                dragger: 'none',
                minPosition: -t.width,
                maxPosition: t.width
              });

              t.snapper.on('open', function(){
                t.open = true;
              });

              t.snapper.on('close', function(){
                t.open = false;
              });
            });
          },

          /**
           * Open side menu.
           */
          openit: function() {
            this.snapper.open();
            return this;
          },

          /**
           * Close side menu.
           */
          close: function() {
            this.snapper.close();
            return this;
          }

        };

        // return initialized object
        return Menu.init();
      }
    });
});
