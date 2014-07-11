/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'angular':              '../lib/angular/angular',
        'angular-route':        '../lib/angular-route/angular-route',
        'angular-animate':      '../lib/angular-animate/angular-animate',
        'angular-snap':         '../lib/angular-snap/angular-snap',
        'ng-table':             '../lib/ng-table/ng-table',
        'domReady':             '../lib/requirejs-domready/domReady',
        'jquery':               '../lib/jquery/dist/jquery',
        'snap':                 '../lib/snapjs/snap',
        'wysihtml5':            '../lib/wysihtml5/dist/wysihtml5-0.3.0_rc2'
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
        'wysihtml5': {}
    },

    deps: [
        // kick start application... see bootstrap.js
        './bootstrapShipyard'
    ]
});
