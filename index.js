const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]

]

// let create the function to initialise the game

function intiGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    // Ui columns do empyt 
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;

    });


    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
intiGame();

function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player ${currentPlayer}`;
}

function chekcGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" | gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else {
                answer = "O";
            }

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

    });

    // it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner player ${answer}`;
        newGamebtn.classList.add("active");
        return;
    }

    // we know <no winner found , let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    })

    // board is filled, game is tie
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGamebtn.classList.add("active");
    }

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //swap the player turn
        swapTurn();
        // check if game is over or not and who is win the game
        chekcGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
})

newGamebtn.addEventListener('click', intiGame);