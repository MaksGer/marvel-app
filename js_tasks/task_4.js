function chess() {
    let string = ' ',
        evenLine = false;

    for (let i = 0; i <= 8; i++) {
        if (evenLine) {
            for (let i = 0; i <= 8; i++) {
                string = i % 2 === 0 ? string += 'X' : string += ' ';
            }

            console.log(string);
            evenLine = false;
            string = " "
        } else {
            for (let i = 0; i <= 8; i++) {
                string = i % 2 === 1 ? string += 'X' : string += ' ';
            }

            console.log(string);
            evenLine = true;
            string = ' '
        }
    }
}