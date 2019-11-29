function drawChess() {
    for (let i = 0; i <= 8; i++) {
        console.log((i % 2 ? ' X' : 'X ').repeat(4));
    }
}

drawChess();