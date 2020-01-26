/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = [] // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

/* not sure why this doesn't work
function makeBoard() {
let row = []
  for (let i = 0; i<WIDTH; i++){
    row.push(null);
  }
  for (let i = 0; i<HEIGHT; i++) {
    board.push(row);
  }
}
*/
function makeBoard() {
  let row
    for (let i = 0; i<HEIGHT; i++){
      row =[];
      board.push(row);
      for (let j = 0; j<WIDTH; j++) {
          row.push(null);
      }
    }
  }




function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board')

  // create top row for clicking
  let top = document.createElement("tr");
      top.setAttribute("id", "column-top");
      top.addEventListener("click", handleClick);
  // add cells
  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create rows for the board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
  // create cells for each row
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
 for (let i = HEIGHT-1; i >= 0; i--){
    if (board[i][x] === null) { 
      return i;
    }
  } 
  return null;
}


/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  const piece = document.createElement("div")
        piece.classList.add("piece")
            if (currPlayer === 1) {
                piece.classList.add("player1");
            }
            else {
                piece.classList.add("player2")
            }
                document.getElementById(`${y}-${x}`).append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  board[y][x] = currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (checkIfBoardIsFull()){
    endGame("Game is a Tie");
  }

  // switch players
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}

function checkIfBoardIsFull(){
return board[0].every( val => val !== null)
}
 

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

   // all four values in each array must match the current player to return true
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }


/* creates a multi-dimensional array with four values, each value 
contains coordinates to be used to check the board array in the _win function. It always starts
from position [0,0].
*/
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // creates an array to check for horizontal matches
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //creates an array to check for vertical matches
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //creates an array to check for diagonal matches to the right
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      // creates an array to check for diagonal matches to the left
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();