function drawChess() {
    let str = '';
    let isLineEven = false;

    for (let i = 1; i <= 8; i++) {
        let item = 1;

        isLineEven = !!(i % 2);
        for (; item <= 8; item++) {
            str += (isLineEven) ? ((item % 2) ? ' ' : 'X') : ((item % 2) ? 'X' : ' ');
            if (item === 8) {
                console.log(str);
                str = '';
            }
        }
    }
}

drawChess();