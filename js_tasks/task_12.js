function sumArguments (arg1, arg2) {
        if (arg2) {
            return arg1 + arg2;

        } else {
            return function (nextArgument) {
                return arg1 + nextArgument;
            };
        }
}