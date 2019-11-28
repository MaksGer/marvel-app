function countExcessSpaces(str) {
    let counter = 0,
        item = 0,
        itemLast = str.length - 1;

    //Loop for count spaces in the beginning string
    for (; item <= str.length - 1; item++){
        if (str[item] === ' ') {
            counter++;
        } else {
            break;
        }
    }

    //Loop for count spaces in the start string
    while(itemLast) {
        if(str[itemLast] === ' ') {
            counter++;
            itemLast--;
        } else {
            break
        }
    }

    //Loop for count spaces between words
    for (; item <= itemLast; item++) {
        if (str[item] === str[item-1] && str[item] === ' ') {
            counter += 1;
        }
    }

    return counter;
}
