function createArrayOfObjectFromArray (array) {
    let newArray = [];

    array.forEach(function (item) {
        let newElement = {};
        newElement.value = item;
        newArray.push(newElement)
    });

    return newArray;
}