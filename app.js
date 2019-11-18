Array.prototype.inject = function (index, item) {
    this.splice(index, 1, item);
};

let squares = document.querySelectorAll('.square');
let turn = 1;
let board = [];

function startGame() {
    squares.forEach(function(square){
        square.addEventListener('click', playTurn);
    });
}

startGame();


function playTurn(e){
    let clickedSquare = e.target;
    
    if (clickedSquare.textContent !== '') {
        alert('This square is not empty. Choose an empty square.');
    } else {
        markMove(clickedSquare);
    }
    
    
    turn++;
}

function markMove(square){
    square.textContent = (turn % 2 !== 0) ? 'X' : 'O';
    updateBoardArray();
    
    if( turn > 4 ){
        processMove(board);
    }
}

function processMove(board){
    for(i = 0; i < winningCombinations.length; i++){
        let potentialWinningMove = [];
        
        for(k = 0; k<winningCombinations[i].length; k++){
            let index = winningCombinations[i][k];

            if( board[index] === '' ){
                break;
            } else {
                potentialWinningMove.push(board[index]);
            }
        }

        if(potentialWinningMove.length === 3){
            allValuesEqual(potentialWinningMove);

            if(  allValuesEqual(potentialWinningMove) ){
                displayGameResult( potentialWinningMove[0] );
            }else{
                (turn === 9) ? displayGameResult() : null;
            }

        }

    }
}

function updateBoardArray(){
    squares.forEach( (square, index) => {
        board.inject(index, square.textContent);
    });
}

function allValuesEqual(arr){
    return arr.every(value => value === arr[0]) && arr[0] !== '';
}

let winningCombinations = [ 
    [0,1,2],
    [3,4,5], 
    [6,7,8], 
    [0,3,6], 
    [1,4,7], 
    [2,6,8], 
    [0,4,8], 
    [2,4,6] 
]

function displayGameResult(winner){
    if(!winner){
        alert('The game was a draw. No one wins, but no one loses.');
        resetGame();
    }else{
        alert(`${winner} wins!`);
        resetGame();
    }

}

function resetGame(){
    squares.forEach(function(square){
        square.textContent = '';
    })
    turn = 0;
}