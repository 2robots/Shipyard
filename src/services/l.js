define(['./module'], function (services) {
  'use strict';

  services.value('L')
    .factory('L', function(messages){

      return function(key){

        /**
         * L object
         */
        var L = {

          /**
           * init function
           * returns string
           */
          init: function(key){

            if(messages[key]) {
              return messages[key];
            } else {
              return key;
            }
          }
        };

        // return new instance.
        return L.init(key);
      }
    });
});
