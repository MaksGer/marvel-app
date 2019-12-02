function createArrayOfObjectFromArray (array) {
    let newArray = [];

    array.map((item) => {
        newArray.push({value: item});
    });

    return newArray;
}