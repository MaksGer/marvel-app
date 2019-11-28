function range (min, max) {
    let array = [];
    for (let i = min; i <= max; i++) {
        array.push(i);
    };
    return array;
};

// range(15, 23);

function sum(array) {
    let result = array.reduce((sum, current) => {
        return sum + current;
    }, 0);
    return result;
}
// sum(range(15, 23));