define(function(require, exports, module) {
  var View           = require('famous/core/View');
  var Transform      = require('famous/core/Transform');
  var Modifier       = require('famous/core/Modifier');
  var Timer          = require('famous/utilities/Timer');
  var RenderNode     = require('famous/core/RenderNode');
  var Surface       = require('famous/core/Surface');
  var Timer         = require('famous/utilities/Timer');
  var Transitionable = require('famous/transitions/Transitionable');
  var SnapTransition = require("famous/transitions/SnapTransition");
  var Easing = require('famous/transitions/Easing');


  GridView.DEFAULT_OPTIONS = {
      topOffset: 37,
      stripOffset: 58,
      staggerDelay: 35,
      featureOffset: 280,
      columns: 5,
      rows: 5,
      transition: {
          duration: 400,
          curve: 'easeOut'
      }
  };



  Transitionable.registerMethod('snap', SnapTransition);
  // var transition = {
  //     method: "snap",
  //     period: 1000,
  //     dampingRatio: .3,
  //     velocity: 0
  // };

  function GridView() {
    View.apply(this, arguments);
    this.views = {};

    var rootModifier = new Modifier({
      size: [undefined, undefined]
    });

    this.node = this.add(rootModifier);

    _createGrid.call(this);
  }


  GridView.prototype = Object.create(View.prototype);
  GridView.prototype.constructor = GridView;

  function _createGrid(){

    var index = 1;

    this.gridItemModifiers = [];

    for (var i=0; i<this.options.columns*this.options.rows; i++){

       // for (var j=0; j < this.options.rows; j++){

        var gridItemModifier = new Modifier({
          transform: Transform.translate(0, 0 ,0)
        });

        this.gridItemModifiers.push(gridItemModifier);

        // gridItemModifier.setTransform(
        //   Transform.translate(i*50, /*j*/50, 0),
        //   transition
        // );

        var surface = new Surface({
          size: [50,50],
          content: index,
          properties: {
            backgroundColor: '#444',
            margin: 'auto',
            border: '1px solid white',
            color: 'white',
            textAlign: 'center',
            cursor: 'pointer'
          }
        });

        this.node.add(gridItemModifier).add(surface);
        index ++;
       // }
    }
  };

  GridView.prototype.animateGrid = function(){
      // var transition = this.options.transition;
      // var delay = this.options.staggerDelay;
      // var stripOffset = this.options.stripOffset;
      // var topOffset = this.options.topOffset;

      var transition = this.options.transition;
      var delay = 40;
      var stripOffset = 70;
      var topOffset = 50;

      for (var i = 0; i < this.gridItemModifiers.length; i++) {
        if(i % this.options.rows > 1){
          
        }
        // for(var j = 0; j < this.options.rows; j++){
          Timer.setTimeout( function(i){
              var xOffset = topOffset + stripOffset * i;

              this.gridItemModifiers[i].setTransform(
                  Transform.translate(xOffset, 89, 0), transition);
              }.bind(this, i), i* delay);
          // } 
        }


  };

  module.exports = GridView;
});
