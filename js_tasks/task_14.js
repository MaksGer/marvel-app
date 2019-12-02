function countVowels(str) {
	let counter = 0;
	let vowels = ['a', 'e', 'i', 'o', 'u'];

	for (let i = 0; i < str.length; i++) {
		for (let item = 0; item <= vowels.length; item++) {
			if (str[i] === vowels[item]) {
				counter++;
			}
		}
	}

	return counter;
}