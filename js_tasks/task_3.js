function sumOfNumeral(number) {
    let array = [];

    while (number){
        array.unshift(number % 10);
        number = (number - number % 10) / 10
    }

    return array.reduce((sum, current) => {
        return sum + current;
    }, 0);
}
