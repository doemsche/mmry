define(function(require, exports, module) {
  var View           = require('famous/core/View');
  var EventHandler = require('famous/core/EventHandler');



  function GameLogic() {
    View.apply(this, arguments);
    _setEventHandler.call(this);
  }


  GameLogic.prototype = Object.create(View.prototype);
  GameLogic.prototype.constructor = GameLogic;

  GameLogic.prototype.isMatch = function(cards){
    if(cards[0].properties.type === cards[1].properties.type){
      cards[0].setProperties({backgroundColor: '#5cb85c'});
      cards[0].setProperties({color: '#fff'});
      cards[0].setProperties({borderColor: '#4cae4c'});
      cards[1].setProperties({borderColor: '#4cae4c'});
      cards[1].setProperties({backgroundColor: '#5cb85c'});
      cards[1].setProperties({color: '#fff'});

      this.gameLogicHandler.emit('match');

    } else {

      this.gameLogicHandler.emit('no match');
      
    }
  };

  function _setEventHandler(){
    this.gameLogicHandler = new EventHandler();
  }

  module.exports = GameLogic;
});
