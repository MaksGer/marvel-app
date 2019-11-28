function sumOfNumeral(number) {
    let array = [],
        stringOfNumber = number + ' ';

    for (let i = 0; i < stringOfNumber.length - 1; i++){
        array.push(parseInt(stringOfNumber[i]));
    }

    return array.reduce((sum, current) => {
        return sum + current;
    }, 0);
}