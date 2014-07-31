define(function(require, exports, module) {

	function Guid(){
		this.id = _createId.apply(this);
	}

	Guid.prototype.constructor = Guid;

	_createId = function(){
		var guid = (function() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
				}
				return function() {
				return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
			};
		})();
		return guid();
	}

	module.exports = Guid;
});