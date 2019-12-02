function drawChess() {
	let str = '';
	let isLineEven = false;

	for (let i = 1; i <= 8; i++) {
		isLineEven = !!(i % 2);

		for (let item = 1; item <= 8; item++) {
			str += isLineEven ? (item % 2 ? ' ' : 'X') : (item % 2 ? 'X' : ' ');
		}

		console.log(str);
		str = '';
	}
}

drawChess();