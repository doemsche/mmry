/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine          = require('famous/core/Engine');
    var Modifier        = require('famous/core/Modifier');
    var Easing          = require('famous/transitions/Easing');


    var GridView        = require('views/GridView');

    var modifier = new Modifier({
        align: [0,0],
        origin: [0,0]
    });

    var mainContext = Engine.createContext();
    // default perspective is 1000; 500 for smaller devices
    // var perspective = (window.innerWidth < 600 || window.innerHeight < 600) ? 500 : 1000;
    // mainContext.setPerspective(perspective);

    // instantiates game
    var gridView = new GridView();
    gridView.animateGrid();
    mainContext.add(modifier).add(gridView);

});
