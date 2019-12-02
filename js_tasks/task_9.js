Function.prototype.myBind = function(context) {
    return (arguments) => {
        return this.call(context, arguments);
    };
};