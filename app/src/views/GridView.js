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
  var EventHandler = require('famous/core/EventHandler');


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
    this.cardMap = [];
    
    var rootModifier = new Modifier({
      size: []
    });

    this.node = this.add(rootModifier);
    var cards = ['fa-bug','fa-coffee','fa-car','fa-glass', 'fa-anchor']
    _createGrid.call(this, cards);
    _setEventHandling.call(this);
    _createShuffleButton.call(this);
  }


  GridView.prototype = Object.create(View.prototype);
  GridView.prototype.constructor = GridView;
  GridView.prototype.animateGrid = function(){
      var transition = this.options.transition;
      var delay = 40;
      var stripOffset = 70;
      var topOffset = 50;
      var yOffset = 0;
      var xOffset = 0;
      //reset modifiers
      for (var i = 0; i < this.gridItemModifiers.length; i++) {
        this.gridItemModifiers[i].setTransform(
            Transform.translate(-50,-50 ,0)
        )
      }

      _shuffle(this.gridItemModifiers);

      for (var i = 0; i < this.gridItemModifiers.length; i++) {
          Timer.setTimeout( function(i){
              // console.log(i % this.options.rows);
              if(i % this.options.rows == 0){
                
                yOffset += 70;
                xOffset = 50;

              } else if(i%this.options.rows == 1) {
                 xOffset = 50 +70;
              } else if(i%this.options.rows == 2){
                xOffset = 50+70*2;
              } else if(i%this.options.rows == 3){
                xOffset = 50 + 70 *3;
              } else {
                xOffset = 50+70*4;
              }
              this.gridItemModifiers[i].setTransform(
                  Transform.translate(xOffset, yOffset, 0), transition);
              }.bind(this, i), i* delay);
        }
  };

  GridView.prototype.checkGameLogic = function(options){
    
      if(this.cardMap[0] === undefined){
          this.cardMap[0] = options.type;
      } else if(this.cardMap[1] === undefined) {
        this.cardMap[1] = options.type;
        this.checkIfMatch();
      } 
  }


  GridView.prototype.checkIfMatch = function(){
    if(this.cardMap[0] === this.cardMap[1]){
      console.log('this is a match');
      this.cardMap = [];
    } else {
      console.log('try again');
      this.cardMap = [];
    
    }
  }


  function _createGrid(cards){
    var self = this;
    var index = 1;

    this.gridItemModifiers = [];
    this.surfaces = [];
    for (var i=0; i<this.options.columns; i++){

       for (var j=0; j < this.options.rows; j++){

        var gridItemModifier = new Modifier({
          transform: Transform.translate(-50,-50 ,0)
        });

        
        var item = cards[Math.floor(Math.random()*cards.length)];

        var surface = new Surface({
          size: [50,50],
          // classes: [item],
          content: '<i  class="fa '+item+'"></i>',
          properties: {
            backgroundColor: '#444',
            margin: 'auto',
            border: '1px solid white',
            color: '#444',
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: '3px',
            paddingTop: '15px',
            type: item,
            index: index
          }
        });

        this.surfaces.push(surface);
        this.gridItemModifiers.push(gridItemModifier);

        surface.on('click', function(){
          this.setProperties({color:'white'});
          var options = {type: this.properties.type, index: this.properties.index}
          self.cardTouchEventHandler.emit('touch card', options)
        });

        this.node.add(gridItemModifier).add(surface);
        index ++;
       }
    }
  };

  function _createShuffleButton(){
    var button = new Surface({
      align: [0.5, 0.5],
      size: [10,10],
      origin: [0,0],
      content: '<button type="button" class="btn btn-success">Shuffle</button>',
    });
    var buttonMod = new Modifier({
      transform: Transform.translate(50,10 ,0)
    });

    button.on('click', function() {
      this.animateGrid();
    }.bind(this));

    this.node.add(buttonMod).add(button);
  }

  function _setEventHandling(){
      var self = this;
      this.cardTouchEventHandler = new EventHandler();
      this.cardTouchEventHandler.on('touch card', function(options) {
        this.checkGameLogic(options)
      }.bind(self));
  }

  function _shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }


  module.exports = GridView;
});
