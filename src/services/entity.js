define(['./module'], function (services) {
  'use strict';

  services.value('EntityService', [])
    .factory('EntityService', function(entities){
      return function(){

        /**
         * Entity object, manage all entities.
         */
        var Entity = {

          current: null,
          entities: [],
          indexes: {},

          /**
           * init function
           * @return new EntityService object
           */
          init: function(){

            var t = this;

            angular.forEach(entities, function(entity, index){
              t.entities[index] = entity;
              t.indexes[entity.id] = index;
            });

            return this;
          },

          setCurrent: function(entity) {
            this.current = entity;
          },

          getCurrent: function() {
            return this.current;
          },

          findById: function(id) {
            t.entities[t.indexes[id]];
          }
        };

        // return initialized object
        return Entity.init();
      }
    });
});
