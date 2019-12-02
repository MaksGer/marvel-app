function mergeTwoArray(array1, array2) {
    let maxLength = (array1.length > array2.length) ? array1.length : array2.length;
    let newArray = [];

    for (let i = 0; i < maxLength; i++ ) {
        if (array1[i]) {
            newArray.push(array1[i]);
        }

        if (array2[i]) {
            newArray.push(array2[i]);
        }
    }

    return newArray;
}