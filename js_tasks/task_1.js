function range (min, max) {
    let array = [];

    for (let i = min; i <= max; i++) {
        array.push(i);
    }

    return array;
}

function sum(array) {
    return array.reduce((sum, current) => {
        return sum + current;
    }, 0);
}