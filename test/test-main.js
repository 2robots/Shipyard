var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {

  // if file is in /test & matches REGEXP
  if (file.substring(0,11) == '/base/test/' && TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

console.log(require.config());

require.config({

  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  paths: {
    'angular':              'lib/angular/angular',
    'angular-route':        'lib/angular-route/angular-route',
    'angular-animate':      'lib/angular-animate/angular-animate',
    'angular-snap':         'lib/angular-snap/angular-snap',
    'ng-table':             'lib/ng-table/ng-table',
    'domReady':             'lib/requirejs-domready/domReady',
    'jquery':               'lib/jquery/dist/jquery',
    'snap':                 'lib/snapjs/snap',
    'textAngular':          'lib/textAngular/dist/textAngular.min',
    'textAngularSanitize':  'lib/textAngular/dist/textAngular-sanitize.min'
  },

  /**
   * for libs that either do not support AMD out of the box, or
   * require some fine tuning to dependency mgt'
   */
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'angular-animate': {
      deps: ['angular']
    },
    'angular-snap': {
      deps: ['angular', 'snap']
    },
    'ng-table': {
      deps: ['angular']
    },
    'textAngular': {
      deps: ['textAngularSanitize']
    },
    'textAngularSanitize': {
     deps: ['angular']
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
