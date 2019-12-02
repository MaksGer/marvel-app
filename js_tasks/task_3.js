function gerSumOfNumeral(number) {
	let stringOfNumber = number.toString();
	let result = 0;

	for (let i = 0; i < stringOfNumber.length; i++) {
		result += parseInt(stringOfNumber[i]);
	}

	return result;
}