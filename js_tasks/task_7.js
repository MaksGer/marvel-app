function countExcessSpaces(str) {
    let counter = 0;

    if (str[0] === ' '){
        counter++;
    }

    if (str[str.length - 1] === ' '){
        counter++;
    }

    for (let i = 0; i <= str.length - 1; i++) {
        if (str[i] === str[i - 1] && str[i] === ' ') {
            counter ++;
        }
    }

    return counter;
}