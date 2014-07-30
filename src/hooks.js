
/**
 * All hooks are defined as value, so config can override them.
 * @param an angular application object
 */
define(['src/shipyard'], function (shipyard) {
  'use strict';

  shipyard.value('hook_get_data', function(data){ return data; });
  shipyard.value('hook_login', function(user, cb){ cb(true, 'NOTOKEN'); });
  shipyard.value('hook_logout', function(cb){ cb(true); });

  return shipyard;
});
