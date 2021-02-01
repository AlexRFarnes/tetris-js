const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

const ROW  = 20; // height of the board
const COL = 10; // width of the board
const SQ = squareSize = 20; // size of every square
const VACANT = 'white'; // color of an empty square

// draw a square

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle = 'BLACK';
    ctx.strokeRect (x*SQ,y*SQ,SQ,SQ);
}

// create the board
let board = [];
for(let r = 0; r < ROW; r++ ) {
    board[r] = [];
    for(let c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

function drawBoard() {
    for(let r = 0; r < ROW; r++ ) {
        for(let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

// The pieces and their colors
const PIECES = [
    [Z, 'blue'],
    [S, 'green'],
    [T, 'red'],
    [O, 'orange'],
    [L, 'purple'],
    [I, 'cyan'],
    [J, 'yellow'],
];

// Initiate a piece

let piece = new Piece(PIECES[0][0], PIECES[0][1]);


// Object pieces

function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; // Start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // Control the pieces
    this.x = 3;
    this.y = 0;

}

// Fill function
Piece.prototype.fill = function(color) {
    for(let r = 0; r < this.activeTetromino.length; r++ ) {
        for(let c = 0; c < this.activeTetromino.length; c++) {
            // Draw only the occupied square
            if(this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

// Draw the piece
Piece.prototype.draw = function() {
    this.fill(this.color);
}

// Undraw the piece
Piece.prototype.unDraw = function() {
    this.fill(VACANT);
}


// Move Right the piece
Piece.prototype.moveRight = function() {
    this.unDraw();
    this.x++;
    this.draw();
}

// Move Right the piece
Piece.prototype.moveLeft = function() {
    this.unDraw();
    this.x--;
    this.draw();
}

// Move down the piece

Piece.prototype.moveDown = function() {
    this.unDraw();
    this.y++;
    this.draw();
}

// Rotate the piece

Piece.prototype.rotate = function() {
    this.unDraw();
    this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.draw();
}

// Control the piece
document.addEventListener('keydown', CONTROL);

function CONTROL(event) {
    if(event.keyCode === 37) {
        piece.moveLeft();
        dropStart = Date.now();
    } else if(event.keyCode === 38) {
        piece.rotate();
        dropStart = Date.now();
    } else if(event.keyCode === 39) {
        piece.moveRight();
        dropStart = Date.now();
    } else if(event.keyCode === 40) {
        piece.moveDown();
        dropStart = Date.now();
    }
}


// Drop the piece every second
let dropStart = Date.now();

function drop() {
    let now = Date.now()
    let delta = now - dropStart;
    if(delta > 1000) {
        piece.moveDown();
        dropStart = Date.now();
    }
    requestAnimationFrame(drop);
}

drop();