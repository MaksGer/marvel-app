function sumArguments (arg1, arg2) {
        if (arguments[1]) {
            return arg1 + arg2;

        } else {
            return function f2(argument) {
                return sumArguments(arg1, argument);
            };
        }
}