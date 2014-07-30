/**
* bootstraps angular onto the window.document node
* NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
*/
define([
  'require',
  'angular',
  'src/hooks',
  'config',
  'src/shipyard',
  'src/routes'
], function (require, ng, shipyard) {
  'use strict';

  require(['domReady!'], function (document) {
    ng.bootstrap(document, ['shipyard']);
  });
});
