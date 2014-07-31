define(function(require, exports, module) {
	var View           = require('famous/core/View');
	var Surface       = require('famous/core/Surface');
	var Modifier       = require('famous/core/Modifier');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Easing = require('famous/transitions/Easing');
	var Transform           = require("famous/core/Transform");
	var EventHandler = require('famous/core/EventHandler');
	
	Card.DEFAULT_OPTIONS = {
		size: [50,50],
		content: null,
		properties: {
			backgroundColor: '#222',
			margin: 'auto',
			border: '1px solid white',
			color: '#444',
			textAlign: 'center',
			cursor: 'pointer',
			borderRadius: '3px',
			paddingTop: '15px'
		}
	};

	function Card(options) {
    	View.apply(this, arguments);

		var rootModifier = new Modifier({
			size: []
		});

    	this.node = this.add(rootModifier);
    	this.id = options.id;
    	this.isActive = false;

    	_createCard.apply(this);
    	_setEventHandler.apply(this);
    }

    Card.prototype = Object.create(View.prototype);
  	Card.prototype.constructor = Card;
  	Card.prototype.getType = function(){
  		return this.type;
  	};

  	Card.prototype.shiver = function(){
  		var transition = {duration:100,curve:'easeInOut'};
  		this.surface.stateModifier.setTransform( Transform.scale(1.2,1.2), transition);
  	}

  	Card.prototype.unshiver = function(){
  		var transition = {duration:100,curve:Easing.inOutQuad};
  		this.surface.stateModifier.setTransform( Transform.scale(1.0,1.0), transition);
  	}

  	Card.prototype.setType = function(type){
  		this.type = type;
  	};

  	_createCard = function(){
		this.surface = new Surface({
			size: this.options.size,
			properties: this.options.properties
		});
		this.surface.stateModifier = new StateModifier();
		this.surface.setContent(_applyRandomType.apply(this));
		this.surface.on('click', function(){
		
          // var transition = {duration:1000,curve:Easing.inOutQuad};
          // // console.log(this.properties.index)
          if(!this.isActive){
          	this.shiver();
          }
          else{
          	this.unshiver()
          }
          this.surface.setProperties({color:'white'});
          this.isActive = !this.isActive;
          this.eventHandler.emit('touch card', this);
        }.bind(this));

        this.node.add(this.surface.stateModifier).add(this.surface);
  	}

  	_applyRandomType = function(){
  		var types = ['fa-bug','fa-coffee','fa-car','fa-glass', 'fa-anchor'];
  		var type = types[Math.floor(Math.random()*types.length)];
  		this.setType(type);
  		// console.log('<i class="fa '+type+'></i>');
  		return '<i class="fa '+type+'"></i>';
  	}

  	_setEventHandler = function(){
  		this.eventHandler = new EventHandler();
  	}

  	module.exports = Card;
});