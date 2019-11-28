function countAverageValue(array) {
     return  array.reduce((sum, current) => {
        return sum + current;
    }, 0) / array.length
}
