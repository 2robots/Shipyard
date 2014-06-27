
// define all Shipyard resources
window.Shipyard = {
  endpoint: 'http://dev.shinystreets.com',
  templates: 'templates',

  resources: [
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
  ]
};

window.Shipyard.hook_preprocess_data = function(data, context, callback){

  if(context.controller == 'ListCtrl') {
    return callback(data.results);
  }

  return callback(data);
};
