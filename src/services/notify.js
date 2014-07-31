define(['./module'], function (services) {
  'use strict';

  services.value('NotifyService', [])
    .factory('NotifyService', function($rootScope){
      return function(){

        /**
         * Menu object, holds notify.
         */
        var Notify = {

          timeout: 1000,
          notifications: [],

          /**
           * init function
           * @return new NotifyService object
           */
          init: function(){
            var t = this;

            // listen to rootScope broadCasts
            $rootScope.$on('Shipyard.notify.addSuccess', function(event, args){ t.addMessage('success', args.message); });
            $rootScope.$on('Shipyard.notify.addInfo', function(event, args){ t.addMessage('info', args.message); });
            $rootScope.$on('Shipyard.notify.addError', function(event, args){ t.addMessage('error', args.message); });
            $rootScope.$on('Shipyard.notify.clear', function(){ t.clearMessages(); });

            return this;
          },

          /**
           * add a message to the queue
           * @param string level, e.g. 'error', 'success', 'info'
           * @param string message
           */
          addMessage: function(level, message){

            // current time
            var time = new Date().getTime();
            var t = this;

            // clear out old messages
            t.clearMessages();

            // add new notification
            t.notifications.push({
              level: level,
              message: message,
              created: time
            });
          },

          /**
           * clear all old messages
           */
          clearMessages: function() {

            var time = new Date().getTime();
            var t = this;

            angular.forEach(t.notifications, function(notification, index){
              if(notification.created + t.timeout < time) {
                t.notifications.splice(index, 1);
              }
            });
          },

          /**
           * Dismiss one notification
           * @param  index of notification
           */
          dismiss: function(index) {
            this.notifications.splice(index, 1);
          }
        };

        // return initialized object
        return Notify.init();
      }
    });
});
