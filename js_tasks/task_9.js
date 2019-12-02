Function.prototype.myBind = function (context) {
	return (arguments) => {
		return this.apply(context, arguments);
	};
};