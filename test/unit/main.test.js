'use strict';

define(['src/controllers/main'], function(shipyard){

  /**
   * Shipyard base test.
   */
  describe('MainCtrl', function(){

    // test if Angular is avaiable
    it('angular should exist', function(){
      expect(angular).toBeDefined();
    });
  });
});
