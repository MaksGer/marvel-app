function createArr(n) {
	let array = [];

	for (let i = 1; i <= n; i++) {
		if (i % 3 === 0 && i % 5 === 0) {
			array.push('fizzbuzz');
			continue;
		}

		if (i % 3 === 0 && !i % 5 === 0) {
			array.push('fizz');
			continue;
		}

		(!i % 3 === 0 && i % 5 === 0) ? array.push('buzz') : array.push(i);
	}

	console.log(array);
}