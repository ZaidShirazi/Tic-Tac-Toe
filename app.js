const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
let turnOfO = true;
let count = 0;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

resetBtn.addEventListener("click", resetGame);

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    decideTurn(box);
    count++;
    checkWinner();
  });
});

/* Functions Definitions */

function resetGame() {
  const msgContainer = document.querySelector(".msg-container");

  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }

  count = 0;
  turnOfO = true;
  msgContainer.classList.add("hide");
}

const decideTurn = (box) => {
  if (turnOfO) {
    box.textContent = "O";
    turnOfO = false;
    box.disabled = true;
  } else {
    box.textContent = "X";
    turnOfO = true;
    box.disabled = true;
  }
};

function checkWinner() {
  let isWinnerFound = false;

  for (let pattern of winningPatterns) {
    let pos1 = pattern[0];
    let pos2 = pattern[1];
    let pos3 = pattern[2];

    let box1Value = boxes[pos1].innerText.trim();
    let box2Value = boxes[pos2].innerText.trim();
    let box3Value = boxes[pos3].innerText.trim();

    if (box1Value !== "" && box2Value !== "" && box3Value !== "") {
      if (box1Value === box2Value && box2Value === box3Value) {
        isWinnerFound = true;
        showWinner(box1Value);
        disableBoxes();
        return;
      }
    }
  }
  if (count === 9 && !isWinnerFound) {
    showDrawMsg();
  }
}

const showWinner = (box1Value) => {
  const msgContainer = document.querySelector(".msg-container");

  msgContainer.innerText = `Congratulations! Winner is ${box1Value}`;
  msgContainer.classList.remove("hide");
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showDrawMsg = () => {
  const msgContainer = document.querySelector(".msg-container");

  msgContainer.innerText = "Game Draw, Try again";
  msgContainer.classList.remove("hide");
};
