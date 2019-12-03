function countVowels(str) {
	let vowels = new RegExp(/[aeiou]/gi);

	return str.match(vowels).length;
}