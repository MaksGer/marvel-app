function createArrayOfObjectFromArray (array) {
    let newArray = [];

    array.map(function (item) {
        let newElement = {};
        newElement.value = item;
        newArray.push(newElement)
    });

    return newArray;
}