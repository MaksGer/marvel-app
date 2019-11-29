function isUpperCase(str, character) {
    if (character > str.length - 1) {
        return false;
    }

    return str.charAt(character) === str.charAt(character).toUpperCase();
}