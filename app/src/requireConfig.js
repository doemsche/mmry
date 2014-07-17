/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        fontawesome: '../lib/fontawesome/fonts/*',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap'
    },
    packages: [

    ]
});
require(['main']);
