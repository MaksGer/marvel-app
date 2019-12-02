function createArrayOfObjectFromArray(array) {
	return array.map((item) => {
		return {value: item};
	});
}