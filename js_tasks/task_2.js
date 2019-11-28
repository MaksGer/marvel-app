function isUpperCase(str, character) {
    if (character > str.length - 1) {
        return false;
    }

    let letter = str.charAt(character);

    return letter === letter.trim().toUpperCase();
}