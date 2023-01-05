const gridContainer = document.querySelector(".grid-container");

const gameBoard = (() => {
  let array = ["", "", "", "", "", "", "", "", ""];
  const getArray = () => array;
  const setArray = (index, side) => {
    if (array[index] == "") {
      array[index] = side;
    } else {
      console.log("not empty string");
    }
  };
  const displayGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      let gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridItem.setAttribute("data-index", `${i}`);
      gridItem.textContent = array[i];
      gridItem.addEventListener("click", gameController.playRound);
      gridContainer.appendChild(gridItem);
    }
  };
  const clearGameBoard = () => {
    for (let i = 0; i < 9; i++) {
      array[i] = "";
    }
  };
  const resetGameBoard = () => {
    gridContainer.innerHTML = "";
  };
  return {
    getArray,
    setArray,
    displayGameBoard,
    clearGameBoard,
    resetGameBoard,
  };
})();

const Player = (name, side, playing) => {
  let isTurn = playing;
  const getName = () => name;
  const getSide = () => side;
  const getPlaying = () => isTurn;

  const play = (e) => {
    let index = e.target.dataset.index;
    gameBoard.setArray(index, side);
  };
  const endTurn = () => {
    isTurn = !isTurn;
  };
  return { play, endTurn, getName, getSide, getPlaying };
};
const player1 = Player("player1", "X", true);
const player2 = Player("player2", "O", false);

const gameController = (() => {
  function playRound(e) {
    if (!checkWinner(gameBoard.getArray())) {
      if (player1.getPlaying()) {
        player1.play(e);
        gameBoard.resetGameBoard();
        gameBoard.displayGameBoard();
        let isWinner = checkWinner(gameBoard.getArray());
        if (isWinner != false) {
          displayWinner(isWinner);
        }
        player1.endTurn();
        player2.endTurn();
      } else {
        player2.play(e);
        gameBoard.resetGameBoard();
        gameBoard.displayGameBoard();
        let isWinner = checkWinner(gameBoard.getArray());
        if (isWinner != false) {
          displayWinner(isWinner);
        }
        player1.endTurn();
        player2.endTurn();
      }
    } else {
      console.log("bob");
    }
  }
  const displayWinner = (winner) => {
    if (winner == "DRAW") {
      console.log("draw");
    } else if (winner == "X") {
      console.log("X wins");
    } else {
      console.log("O wins");
    }
  };
  const checkWinner = (array) => {
    // checks rows
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = i * 3; j < i * 3 + 3; j++) {
        row.push(array[j]);
      }
      if (
        row.every((field) => field == "X") ||
        row.every((field) => field == "O")
      ) {
        return row[0];
      }
    }
    //checks columns
    for (let i = 0; i < 3; i++) {
      let column = [];
      for (let j = 0; j < 3; j++) {
        column.push(array[i + 3 * j]);
      }
      if (
        column.every((field) => field == "X") ||
        column.every((field) => field == "O")
      ) {
        return column[0];
      }
    }
    //checks diagnals
    if (array[0] != "" && array[0] == array[4] && array[4] == array[8]) {
      return array[0];
    }
    if (array[2] != "" && array[2] == array[4] && array[4] == array[6]) {
      return array[0];
    }
    //checks draw
    if (array.every((field) => field != "")) {
      return "DRAW";
    }
    return false;
  };
  return {playRound};
})();
window.onload = () => {
  gameBoard.displayGameBoard();
};
