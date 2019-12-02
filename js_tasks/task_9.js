Function.prototype.myBind = function(context) {
    return (...arguments) => {
        return this.apply(context, ...arguments);
    };
};

// Function.prototype.myBind = function(context, ...args) {
//     return ((...arguments) => {
//         return this.call(context, args.concat(arguments));
//     });
// };