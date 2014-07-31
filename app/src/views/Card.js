define(function(require, exports, module) {
	var View           = require('famous/core/View');
	

	Catd.DEFAULT_OPTIONS = {
		
	};

	function Card() {
    	View.apply(this, arguments);
    }


    Card.prototype = Object.create(View.prototype);
  	Card.prototype.constructor = Card;


  	module.exports = Card;
});