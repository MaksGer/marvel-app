function sumArguments(arg1, arg2) {
	if (arg2) {
		return arg1 + arg2;
	} else {
		return function (arg2) {
			return arg1 + arg2;
		};
	}
}