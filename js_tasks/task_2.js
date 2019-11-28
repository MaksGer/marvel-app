function isUpperCase(str, character) {
    if (character > str.length - 1) {
        return false
    };

    let letter = str.charAt(character),
        capitalLetter = letter.trim().toUpperCase();
    return letter === capitalLetter;
}

// isUpperCase('I neeD a brake', 5);