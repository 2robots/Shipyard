
/**
 * Require shipyard application and add configuration to the framework.
 * @param an angular application object
 */
define(['src/shipyard'], function (shipyard) {
  'use strict';

  /**
   * Define the API endpoint and the folder for your template files.
   */
  shipyard.constant('endpoint', 'http://dev.shinystreets.com');
  shipyard.constant('templates', 'templates');

  /**
   * Define all resources for your admin interface.
   */
  shipyard.constant('entities', [
    {
      id:       "user",
      name:     "User",
      icon:     "ion-ios7-people-outline"

    }, {
      id:       "areas",
      name:     "Area",
      icon:     "ion-ios7-location-outline"

    }, {
      id:      "issues",
      name:     "Issues",
      icon:     "ion-ios7-albums-outline"

    }, {
      id:      "media",
      name:     "Media",
      icon:     "ion-ios7-camera-outline"
    }
  ]);

  /**
   * Define Strings
   */
  shipyard.constant('messages', {
    login_success: 'Du hast dich erfolgreich angemeldet.',
    login_error: 'Du hast dich erfolgreich abgemeldet.'
  });

  /**
   * You can define hooks, to change the way, shipyard is communicatiing with
   * your API.
   */
  shipyard.value('hook_get_data', function(data) { return data.results; });

  return shipyard;
});
