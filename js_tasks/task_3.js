function sumOfNumeral(number) {
    let array = [],
        stringOfNumber = number.toString();

    for (let i = 0; i < stringOfNumber.length; i++){
        array.push(parseInt(stringOfNumber[i]));
        console.log(array);
    }

    return array.reduce((sum, current) => {
        return sum + current;
    }, 0);
}