function countFigureParam() {
	const figure = prompt('Enter type of figure: circle, square, rectangle or triangle');
	let area = 0;
	let perimeter = 0;

	switch (figure) {
		case 'circle':
			const radius = prompt('Enter radius of your circle');

			area = (Math.PI * (radius ** 2)).toFixed(2);
			perimeter = (2 * Math.PI * radius).toFixed(2);

			break;

		case 'square':
			const side = prompt('Enter side of your square');

			area = (side ** 2).toFixed(2);
			perimeter = (side * 4).toFixed(2);

			break;

		case 'rectangle':
			const sideA = parseInt(prompt('Enter side A of your rectangle'));
			const sideB = parseInt(prompt('Enter side B of your rectangle'));

			area = (sideA * sideB).toFixed(2);
			perimeter = ((sideA + sideB) * 2).toFixed(2);

			break;

		case 'triangle':
			const firstSide = parseInt(prompt('Enter  first side of your triangle'));
			const secondSide = parseInt(prompt('Enter second side of your triangle'));
			const thirdSide = parseInt(prompt('Enter third side of your triangle'));
			const height = parseInt(prompt('Enter height of your triangle'));

			perimeter = (firstSide + secondSide + thirdSide).toFixed(2);
			area = ((height * firstSide) / 2).toFixed(2);

			break;

		default:
			alert('Try again');
	}

	alert(
		'Area of your figure: ' + area + '\n' +
		'Perimeter of your figure: ' + perimeter
	);

}